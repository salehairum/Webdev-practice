const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');
const expr = document.querySelector('#expr');

for (let button of buttons) {
    button.addEventListener('click', function (e) {
        if (button.value >= 0 && button.value <= 9) {
            if (expr.textContent == 0) {
                expr.textContent = button.value;
            }
            else expr.textContent += button.value;
        }
        if (button.value == 'clear') {
            expr.textContent = 0;
            result.textContent = '-';
        }
        if (button.value == 'back') {
            expr.textContent = expr.textContent.toString().slice(0, -1);
            if (expr.textContent == '') {
                expr.textContent = 0;
                result.textContent = '-';
            }
        }
        if (button.value == '+' || button.value == '-' || button.value == '*' || button.value == '/' || button.value == '(' || button.value == ')' || button.value == '.') {
            expr.textContent += button.value;
        }
        if (button.value == '=') {
            if (!isValidMathExpression(expr.textContent.toString()))
                result.textContent = 'Error';

            else result.textContent = math.evaluate(expr.textContent);
        }
    })
}

document.addEventListener('keydown', function (e) {
    if (e.key >= 0 && e.key <= 9) {
        if (expr.textContent == 0) {
            expr.textContent = e.key;
        }
        else expr.textContent += e.key;;
    }
    if (e.key == 'Backspace') {
        expr.textContent = expr.textContent.toString().slice(0, -1);
        if (expr.textContent == '') {
            expr.textContent = 0;
            result.textContent = '-';
        }
    }
    if (e.key == 'Delete') {
        expr.textContent = 0;
        result.textContent = '-';
    }
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '(' || e.key == ')' || e.key == '.') {
        expr.textContent += e.key;
    }
})

function isValidMathExpression(expr) {
    try {
        math.parse(expr);
        return true;  // The expression is valid
    } catch (error) {
        return false; // The expression is invalid
    }
}