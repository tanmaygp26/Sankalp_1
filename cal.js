
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const historyListElement = document.getElementById('history-list');

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand || '0';
    if (operation != null) {
        let opSymbol = operation;
        if (opSymbol === '*') opSymbol = '×';
        if (opSymbol === '/') opSymbol = '÷';
        if (opSymbol === '-') opSymbol = '−';
        previousOperandTextElement.innerText = `${previousOperand} ${opSymbol}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate(false);
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate(addToHistoryFlag = true) {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': 
            computation = current === 0 ? 'Error' : prev / current; 
            break;
        case '%': computation = prev % current; break;
        default: return;
    }

    let opSymbol = operation;
    if (opSymbol === '*') opSymbol = '×';
    if (opSymbol === '/') opSymbol = '÷';
    if (opSymbol === '-') opSymbol = '−';

    const expression = `${prev} ${opSymbol} ${current}`;if (addToHistoryFlag) {
        addToHistory(expression, computation);
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function addToHistory(expression, result) {

    const li = document.createElement('li');
    li.classList.add('history-item');
    li.innerHTML = `
        <div class="history-expr">${expression} =</div>
        <div class="history-result">${result}</div>
    `;
    historyListElement.prepend(li);
}

function clearHistory() {
    historyListElement.innerHTML = '';
}

// Keyboard Controls
document.addEventListener('keydown', (event) => {
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '=' || event.key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    if (event.key === 'Backspace') {
        deleteNumber();
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
    if (['+', '-', '*', '/', '%'].includes(event.key)) {
        appendOperator(event.key);
    }
});