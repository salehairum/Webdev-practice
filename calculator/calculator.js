// const n1 = document.querySelectorAll('#n1');
// const n2 = document.querySelectorAll('#n2');
// const n3 = document.querySelectorAll('#n3');
// const n4 = document.querySelectorAll('#n4');
// const n5 = document.querySelectorAll('#n5');
// const n6 = document.querySelectorAll('#n6');
// const n7 = document.querySelectorAll('#n7');
// const n8 = document.querySelectorAll('#n8');
// const n9 = document.querySelectorAll('#n9');
// const n0 = document.querySelectorAll('#n0');
// const back = document.querySelectorAll('#back');
// const clear = document.querySelectorAll('#clear');
// const mul = document.querySelectorAll('#mul');
// const div = document.querySelectorAll('#div');
// const add = document.querySelectorAll('#add');
// const sub = document.querySelectorAll('#sub');
// const decimal = document.querySelectorAll('#decimal');
// const exp = document.querySelectorAll('#exp');
// const negate = document.querySelectorAll('#negate');
// const equal = document.querySelectorAll('#equal');

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
        if (button.value == '+' || button.value == '-' || button.value == '*' || button.value == '/' || button.value == '(' || button.value == ')') {
            expr.textContent += button.value;
        }
        if (button.value == '=') {
            let num = 0;
            result.textContent = breakExpr(expr.textContent.toString(), num);
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
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '(' || e.key == ')') {
        expr.textContent += e.key;
    }
})

function breakExpr(expr, num) {
    console.log(num);
    if (expr == '')
        return num;
    if (expr[0] == '(') {
        return breakExpr(slice(expr, 0, expr.indexOf(')') + 1), num);
    }
    if (expr[0] >= 0 && expr[0] <= 9)
    //store the number until an operator is found 
    {
        let val = expr[0];
        let isNum = true;
        let i = 1;
        for (; i < expr.length && isNum; i++) {
            if (expr[i] >= 0 && expr[i] <= 9) {
                val += expr[i];
            }
            else {
                isNum = false;
            }
        }
        val = parseInt(val);
        if (expr[i - 1] == '+') {
            return breakExpr((expr.slice(expr, i, expr.length), num + val));
        }
    }
    return num;
}
/*
POSSIBLE SOLUTIONS TO PARSING

1) mark boolean on what has already been added. like an add or sub etc. at the end search those chars using 

charAt(index): Returns the character at the specified index.

to get the index and parse accordingly

2) indexOf(substring, fromIndex): Returns the index of the first occurrence of a substring, starting from fromIndex.

3) split(separator, limit): Splits a string into an array of substrings using the specified separator.
slice(start, end): Extracts a section of a string and returns it as a new string.

*/