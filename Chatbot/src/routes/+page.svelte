<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from "marked";

    interface Message {
        role: "user" | "assistant" | "system";
        content: string;
    }

    let messages: Message[] = [];
    let userInput = "";
    let isLoading = false;
    let currentStreamingMessage = "";

    // Configure marked options
    marked.setOptions({
        breaks: true, // Enable line breaks
        gfm: true, // Enable GitHub Flavored Markdown
    });

    const systemPrompt = `Sei un esperto consulente di infrastrutture cloud. Il tuo compito è analizzare i requisiti delle applicazioni e fornire raccomandazioni dettagliate sulle risorse computazionali necessarie.

Per ogni richiesta, devi specificare una di queste due opzioni:
1. Requisiti di computing per una macchina singola
- Numero di CPU necessarie
- Quantità di RAM
- Spazio di storage richiesto
- Sistema operativo consigliato (Linux o Windows)
2. Requisiti di computing per un ambiente distribuito con Kubernetes
- Se, in alternativa alla macchina singola, è consigliabile un ambiente distribuito con Kubernetes, specificare:
  * Necessità del master node (Il master node non ha requisiti)
  * Requisiti dei worker nodes
  * Numero di worker nodes consigliati
- Eventuali necessità di ElasticIP per l'affidabilità
- Altre considerazioni specifiche per il caso d'uso

Ad ogni richiesta devi fornire o i requisiti di computing di una macchina singola oppure i requisiti di un ambiente distribuito con Kubernetes, non entrambi, 
a meno che non sia diversamente specificato dall'utente.

Rispondi sempre in italiano e in modo professionale ma amichevole. Usa il Markdown per formattare la risposta in modo chiaro e leggibile.`;

    async function attemptLLMCall(displayMessages: Message[], retryCount = 0): Promise<void> {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [{ role: "system", content: systemPrompt }, ...displayMessages] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No reader available');
            }

            currentStreamingMessage = "";
            messages = [...messages, { role: "assistant", content: "" }];

            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const text = decoder.decode(value);
                currentStreamingMessage += text;
                messages = messages.map((msg, index) => 
                    index === messages.length - 1 
                        ? { ...msg, content: currentStreamingMessage }
                        : msg
                );
            }
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return attemptLLMCall(displayMessages, retryCount + 1);
        }
    }

    async function sendMessage() {
        if (!userInput.trim()) return;

        const userMessage: Message = {
            role: "user",
            content: userInput,
        };

        messages = [...messages, userMessage];
        const displayMessages = [...messages];
        userInput = "";
        isLoading = true;

        try {
            await attemptLLMCall(displayMessages);
        } catch (error) {
            console.error("Critical error in message handling:", error);
            messages = [
                ...messages,
                {
                    role: "assistant",
                    content: "Mi dispiace, si è verificato un errore nella comunicazione. Il sistema continuerà a riprovare automaticamente.",
                },
            ];
        } finally {
            isLoading = false;
            currentStreamingMessage = "";
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }
</script>

<svelte:head>
    <style>
        .markdown-content h1 {
            @apply text-2xl font-bold mb-4;
        }
        .markdown-content h2 {
            @apply text-xl font-bold mb-3;
        }
        .markdown-content h3 {
            @apply text-lg font-bold mb-2;
        }
        .markdown-content p {
            @apply mb-4;
        }
        .markdown-content ul {
            @apply list-disc ml-6 mb-4;
        }
        .markdown-content ol {
            @apply list-decimal ml-6 mb-4;
        }
        .markdown-content li {
            @apply mb-1;
        }
        .markdown-content code {
            @apply bg-gray-100 px-1 rounded;
        }
        .markdown-content pre {
            @apply bg-gray-100 p-3 rounded mb-4 overflow-x-auto;
        }
        .markdown-content blockquote {
            @apply border-l-4 border-gray-300 pl-4 italic my-4;
        }
        .markdown-content table {
            @apply w-full border-collapse mb-4;
        }
        .markdown-content th,
        .markdown-content td {
            @apply border border-gray-300 p-2;
        }
        .markdown-content a {
            @apply text-blue-500 hover:underline;
        }
    </style>
</svelte:head>

<div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Consulente Requisiti Cloud</h1>
        <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
            <div class="h-[500px] overflow-y-auto mb-4">
                {#if messages.length === 0}
                    <p class="text-gray-500 text-center italic">
                        Ciao! Sono il tuo consulente per i requisiti cloud. Descrivimi l'applicazione che vuoi deployare
                        (es. chat istantanea, server Minecraft, sito web) e ti aiuterò a capire le risorse necessarie.
                    </p>
                {/if}
                {#each messages as message}
                    <div class="mb-4 {message.role === 'user' ? 'text-right' : ''}">
                        <div
                            class="inline-block p-3 rounded-lg {message.role === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'}"
                        >
                            {#if message.role === "assistant"}
                                <div class="markdown-content prose prose-sm" style="color: inherit;">
                                    {@html marked(message.content)}
                                </div>
                            {:else}
                                {message.content}
                            {/if}
                        </div>
                    </div>
                {/each}
                {#if isLoading}
                    <div class="text-center text-gray-500">Sto elaborando la risposta...</div>
                {/if}
            </div>
            <div class="flex gap-2">
                <textarea
                    bind:value={userInput}
                    on:keydown={handleKeydown}
                    placeholder="Descrivi la tua applicazione..."
                    class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                ></textarea>
                <button
                    on:click={sendMessage}
                    disabled={isLoading}
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    Invia
                </button>
            </div>
        </div>
    </div>
</div>
