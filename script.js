document.addEventListener('DOMContentLoaded', function () {
    const outputPrevious = document.querySelector('[data-previous-operand]')
    const outputCurrent = document.querySelector('[data-current-operand]')
    const clearButton = document.querySelector('[data-all-clear]')
    const deleteButton = document.querySelector('[data-delete]')
    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')

    let currentOperand = ''
    let previousOperand = ''
    let operation = ''

    // Atnaujinti atvaizdavimą
    function updateDisplay() {
        outputCurrent.textContent = currentOperand
        outputPrevious.textContent = previousOperand
    }

    // Pridėti skaitmenį arba kablelį
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '.' && currentOperand.includes('.')) return
            currentOperand += button.textContent
            updateDisplay()
        })
    })

    // Pasirinkti operaciją
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentOperand === '' && previousOperand !== '') {
                // Jei paspaudžiama operacija po atliktų skaičiavimų, tada atnaujiname tik operaciją
                operation = button.textContent
                previousOperand = previousOperand.slice(0, -1) + operation
                updateDisplay()
            } else if (currentOperand !== '') {
                // Jei yra naujas skaitmuo, atnaujiname viską
                if (previousOperand !== '') {
                    compute()
                }
                operation = button.textContent
                previousOperand = currentOperand + operation
                currentOperand = ''
                updateDisplay()
            }
        })
    })
    // Atnaujinti ekraną lygybės ženklu
    equalsButton.addEventListener('click', () => {
        if (currentOperand === '' || previousOperand === '') return
        compute()
        updateDisplay()
    })

    // Ištrinti vieną simbolį
    deleteButton.addEventListener('click', () => {
        currentOperand = currentOperand.toString().slice(0, -1);
        updateDisplay()
    });

    // Išvalyti viską
    clearButton.addEventListener('click', () => {
        currentOperand = ''
        previousOperand = ''
        operation = ''
        updateDisplay()
    });

    // Atlikti skaičiavimus
    function compute() {
        let computation
        const prev = parseFloat(previousOperand)
        const current = parseFloat(currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        currentOperand = computation
        previousOperand = ''
        operation = ''
    }
})