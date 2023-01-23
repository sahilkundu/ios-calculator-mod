const calDisplay = document.querySelector('h1');
const button = document.querySelectorAll('button');
const clear = document.getElementById('clear');
const plusMinus = document.getElementById('plus-minus');
const decimalBtn = document.getElementById('decimal');
const updatingValue = document.getElementById('updating-value');
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '%': (firstNumber, secondNumber) => (firstNumber * secondNumber) / 100,
    '=': (firstNumber, secondNumber) => firstNumber,
};
function resetValues() {
    calDisplay.textContent = 0;
    clear.textContent = "AC";
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    updatingValue.textContent = "";
}
function time2() {
    updatingValue.textContent = ""
}
function signChange() {
    updatingValue.textContent = "Sorry! I am not working currently."
    setTimeout(time2, 1500);
}
function addDecimal() {
    if (awaitingNextValue) {
        return;
    }
    if (!calDisplay.textContent.includes('.')) {
        calDisplay.textContent = `${calDisplay.textContent}.`
    }
}
function operatorFun(operator) {
    const constValue = Number(calDisplay.textContent);
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = constValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, constValue);
        if (firstValue === calculation) {
            updatingValue.textContent = calculation;
        } else {
            updatingValue.textContent = firstValue + operatorValue + constValue;
        }
        firstValue = calculation;
        calDisplay.textContent = calculation;

    }
    awaitingNextValue = true;
    operatorValue = operator;
    console.log(operator);
}
function sendNumbertoDisplay(number) {
    if (awaitingNextValue) {
        calDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const newValue = calDisplay.textContent
        if (calDisplay.textContent === 0) {
            calDisplay.textContent = number;
        } else {
            calDisplay.textContent = newValue + number;
            clear.textContent = "C";
        }
    }

}
button.forEach((clickBtn) => {
    if (clickBtn.classList.contains('num-color')) {
        clickBtn.addEventListener('click', () => sendNumbertoDisplay(clickBtn.value));
    } else if (clickBtn.classList.contains('operator')) {
        clickBtn.addEventListener('click', () => operatorFun(clickBtn.value));
    } else if (clickBtn.classList.contains('decimal')) {
        clickBtn.addEventListener('click', () => addDecimal());
    }
})
clear.addEventListener('click', resetValues);
plusMinus.addEventListener('click', signChange);
