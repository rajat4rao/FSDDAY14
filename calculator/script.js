document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('buttons-container');
    
    const buttons = [
        { text: '⏱', class: 'function', id: 'history-btn' },
        { text: '', class: 'function' },
        { text: '', class: 'function' },
        { text: '', class: 'function' },
        { text: 'AC', class: 'function', id: 'clear' },
        { text: '⌫', class: 'function' },
        { text: '+/-', class: 'function' },
        { text: '÷', class: 'operator' },
        { text: '7', id: '7' }, { text: '8', id: '8' }, { text: '9', id: '9' },
        { text: '×', class: 'operator' },
        { text: '4', id: '4' }, { text: '5', id: '5' }, { text: '6', id: '6' },
        { text: '-', class: 'operator', id: 'subtract' },
        { text: '1', id: '1' }, { text: '2', id: '2' }, { text: '3', id: '3' },
        { text: '+', class: 'operator', id: 'add' },
        { text: '%', class: 'operator' },
        { text: '0', class: 'zero', id: '0' },
        { text: '.' },
        { text: '=', class: 'equals', id: 'equal' }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        if (btn.class) button.className = btn.class;
        if (btn.id) button.id = btn.id;
        button.addEventListener('click', () => handleButtonClick(btn.text));
        container.appendChild(button);
    });

    document.addEventListener('keydown', handleKeyPress);

    const historyBtn = document.getElementById('history-btn');
    const historyModal = document.getElementById('history-modal');
    historyBtn.onclick = () => {
        historyModal.style.display = "block";
        updateHistoryDisplay();
    };

    window.onclick = (event) => {
        if (event.target == historyModal) {
            historyModal.style.display = "none";
        }
    };
});

let currentExpression = '';
let history = [];


function handleButtonClick(value) {
    const result = document.getElementById('result');
    
    switch(value) {
        case 'AC':
            currentExpression = '';
            break;
        case '=':
            try {
                const expressionResult = eval(currentExpression.replace('×', '*').replace('÷', '/'));
                history.push(`${currentExpression} = ${expressionResult}`);
                currentExpression = expressionResult.toString();
            } catch (error) {
                currentExpression = 'Error';
            }
            break;
        case '⌫':
            currentExpression = currentExpression.slice(0, -1);
            break;
        case '+/-':
            if (currentExpression.startsWith('-')) {
                currentExpression = currentExpression.slice(1);
            } else {
                currentExpression = '-' + currentExpression;
            }
            break;
        case '⏱':
            break;
        default:
            currentExpression += value;
    }
    
    result.value = currentExpression;
}

function handleKeyPress(event) {
    if (event.key >= '0' && event.key <= '9' || '÷×-+.%'.includes(event.key)) {
        handleButtonClick(event.key);
    } else if (event.key === '*') {
        handleButtonClick('×');
    } else if (event.key === '/') {
        handleButtonClick('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        handleButtonClick('=');
    } else if (event.key === 'Escape') {
        handleButtonClick('AC');
    } else if (event.key === 'Backspace') {
        handleButtonClick('⌫');
    } else {
        alert("Only numbers and basic operators are allowed");
        event.preventDefault();
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history.map(item => `<p>${item}</p>`).join('');
}

