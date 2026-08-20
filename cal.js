if (addToHistoryFlag) {
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