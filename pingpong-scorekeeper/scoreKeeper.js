//adding button functionalities
const p1Button = document.querySelector('#p1');
const p2Button = document.querySelector('#p2');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const maxPoints = document.querySelector('#maxPoints');

let p1Score = 0;
let p2Score = 0;

let winningScore = 3;

p1Button.addEventListener('click', function (e) {
    p1Score += 1;
    p1Display.innerText = p1Score;
    if (p1Score == winningScore) {
        p1Display.style.color = 'green';
        p2Display.style.color = 'red';
        p1Button.disabled = true;
        p2Button.disabled = true;
    }
})

p2Button.addEventListener('click', function (e) {
    p2Score += 1;
    p2Display.innerText = p2Score;
    if (p2Score == winningScore) {
        p2Display.style.color = 'green';
        p1Display.style.color = 'red';
        p1Button.disabled = true;
        p2Button.disabled = true;
    }
})

resetButton.addEventListener('click', function (e) {
    p1Score = 0;
    p2Score = 0;
    p1Display.innerText = p1Score;
    p2Display.innerText = p2Score;
    p1Display.style.color = 'black';
    p2Display.style.color = 'black';
    p1Button.disabled = false;
    p2Button.disabled = false;
})

maxPoints.addEventListener('change', function (e) {
    winningScore = maxPoints.value;
});
