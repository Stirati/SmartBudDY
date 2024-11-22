// Chatbot functionality
export function initializeChatbot(calculatorState, calculatePrice) {
    const chatbotHTML = `
        <div class="chatbot">
            <button class="chatbot-toggle" id="chatbotToggle">
                <span class="chatbot-toggle-icon">💬</span>
            </button>
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <h3>Storage Assistant</h3>
                    <button class="chatbot-close" id="chatbotClose">×</button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages"></div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Ask about storage plans..." id="chatbotInput">
                    <button class="chatbot-send" id="chatbotSend">Send</button>
                </div>
            </div>
        </div>
    `;

    // Insert chatbot HTML
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Get DOM elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Handle messages
    function addMessage(message, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleUserMessage(message) {
        addMessage(message, false);
        
        // Simple response logic based on keywords
        const lowerMessage = message.toLowerCase();
        let response = '';

        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            const pricing = calculatePrice();
            response = `The current total price would be €${pricing.total.toFixed(2)} per month.`;
        } else if (lowerMessage.includes('plan')) {
            response = 'We offer Base, Partner, and Premium plans. Each plan comes with different storage minimums and discount rates.';
        } else if (lowerMessage.includes('term')) {
            response = 'You can choose between hourly (pay-as-you-go), monthly (5% off), yearly (10% off), or 3-year terms (20% off).';
        } else if (lowerMessage.includes('storage')) {
            response = 'Our storage options start from 10GB and can scale based on your needs. The minimum storage depends on your selected plan.';
        } else {
            response = 'How can I help you with our storage plans? You can ask about prices, plans, terms, or storage options.';
        }

        addMessage(response, true);
    }

    // Send message on button click or Enter key
    chatbotSend.addEventListener('click', () => {
        const message = chatbotInput.value.trim();
        if (message) {
            handleUserMessage(message);
            chatbotInput.value = '';
        }
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatbotInput.value = '';
            }
        }
    });

    // Add welcome message
    addMessage('Hello! How can I help you with our storage plans?', true);
}