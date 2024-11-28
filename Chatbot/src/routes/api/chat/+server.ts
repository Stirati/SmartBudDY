import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import type { RequestHandler } from './$types';

const openai = new OpenAI({
    apiKey: "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",
    baseURL: "https://openrouter.ai/api/v1",
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

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { messages } = await request.json();
        
        const stream = await openai.chat.completions.create({
            model: "meta-llama/llama-3.1-70b-instruct:free",
            messages: [{ role: "system", content: systemPrompt }, ...messages],
            stream: true,
        });

        // Create a readable stream
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content || "";
                        if (content) {
                            controller.enqueue(content);
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            }
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });
    } catch (error) {
        console.error('Error in chat completion:', error);
        return json({ error: 'Failed to generate response' }, { status: 500 });
    }
};
