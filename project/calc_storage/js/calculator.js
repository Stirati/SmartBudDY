import { loadConfig } from '../js/config.js';
import { initializeChatbot } from '../js/chatbot.js';

// State management
const state = {
    currentStep: 1,
    selectedPlan: null,
    selectedTerm: null,
    storageSize: 10,
    config: null
};

// DOM Elements
const elements = {
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    steps: document.querySelectorAll('.step'),
    stepContents: document.querySelectorAll('.step-content'),
    planCards: document.querySelectorAll('.plan-card'),
    termCards: document.querySelectorAll('.term-card'),
    storageSizeInput: document.getElementById('storage-size'),
    basePriceEl: document.getElementById('base-price'),
    planDiscountEl: document.getElementById('plan-discount'),
    termSavingsEl: document.getElementById('term-savings'),
    finalPriceEl: document.getElementById('final-price')
};

// Navigation functions
function updateStepIndicators() {
    elements.steps.forEach((step, index) => {
        if (index + 1 === state.currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function updateStepContent() {
    elements.stepContents.forEach((content, index) => {
        if (index + 1 === state.currentStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    elements.prevBtn.disabled = state.currentStep === 1;
    elements.nextBtn.textContent = state.currentStep === 3 ? 'Calculate' : 'Next';
}

function goToStep(step) {
    state.currentStep = step;
    updateStepIndicators();
    updateStepContent();
    updateNavigationButtons();
}

// Plan selection
function selectPlan(planType) {
    elements.planCards.forEach(card => {
        if (card.dataset.plan === planType) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    state.selectedPlan = planType;
    updatePricing();
}

// Term selection
function selectTerm(term) {
    elements.termCards.forEach(card => {
        if (card.dataset.term === term) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    state.selectedTerm = term;
    updatePricing();
}

// Pricing calculations
function calculatePrice() {
    if (!state.config || !state.selectedPlan) {
        return {
            basePrice: 0,
            planDiscount: 0,
            termDiscount: 0,
            total: 0
        };
    }

    const plan = state.config.plans[state.selectedPlan];
    const term = state.selectedTerm ? state.config.terms[state.selectedTerm] : { discount: 0 };
    const storage = Math.max(state.storageSize, plan.minStorage);
    
    const basePrice = plan.hourlyRate * storage * 730; // 730 hours in a month
    const planDiscount = basePrice * (plan.discount / 100);
    const termDiscount = basePrice * (term.discount / 100);
    
    return {
        basePrice,
        planDiscount,
        termDiscount,
        total: basePrice - planDiscount - termDiscount
    };
}

function updatePricing() {
    const pricing = calculatePrice();
    
    elements.basePriceEl.textContent = `€${pricing.basePrice.toFixed(2)}`;
    elements.planDiscountEl.textContent = `-€${pricing.planDiscount.toFixed(2)}`;
    elements.termSavingsEl.textContent = `-€${pricing.termDiscount.toFixed(2)}`;
    elements.finalPriceEl.textContent = `€${pricing.total.toFixed(2)}`;
}

// Event listeners
function setupEventListeners() {
    elements.prevBtn.addEventListener('click', () => {
        if (state.currentStep > 1) {
            goToStep(state.currentStep - 1);
        }
    });

    elements.nextBtn.addEventListener('click', () => {
        if (state.currentStep < 3) {
            if (state.currentStep === 1 && !state.selectedPlan) {
                alert('Please select a plan to continue');
                return;
            }
            if (state.currentStep === 2 && !state.selectedTerm) {
                alert('Please select a term to continue');
                return;
            }
            goToStep(state.currentStep + 1);
        }
    });

    elements.planCards.forEach(card => {
        card.addEventListener('click', () => {
            selectPlan(card.dataset.plan);
        });
    });

    elements.termCards.forEach(card => {
        card.addEventListener('click', () => {
            selectTerm(card.dataset.term);
        });
    });

    elements.storageSizeInput.addEventListener('input', (e) => {
        state.storageSize = parseInt(e.target.value) || 0;
        updatePricing();
    });
}

// Initialize
async function init() {
    state.config = await loadConfig();
    if (!state.config) {
        console.error('Failed to initialize calculator');
        return;
    }
    setupEventListeners();
    goToStep(1);
    updatePricing();
    initializeChatbot(state, calculatePrice);
}

init();