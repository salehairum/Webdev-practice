let turn = 0;
let spans = document.querySelectorAll('#box');
let turnText = document.querySelector('#playerNo');
var modal = document.getElementById("winnerModal");
var winnerMessage = document.getElementById("winnerMessage");
var playAgainBtn = document.getElementById("playAgain");
var closeModal = document.getElementById("closeModal");
let noOfTurns = 0;

let gameWon = 0;    //0 means continuing, 1 means player 1 win, 2 means player 2 wins, 3 means 

for (let span of spans) {
    span.addEventListener('click', function (e) {
        if (span.textContent != 'O' && span.textContent != 'X') {
            if (turn == 0)
                span.textContent = 'O';
            else span.textContent = 'X';
            span.style.color = "#7F5539";
            turn = !turn;
            turnText.textContent = "Player " + (turn + 1);
            noOfTurns++;
            if (noOfTurns >= 5) {
                checkWin();
                if (gameWon == 1) {
                    // turnText.textContent = 1;
                    showWinner();
                }
                else if (gameWon == 2)
                    showWinner();
                // turnText.textContent = 2;
                else if (gameWon == 3)
                    showWinner();
                //turnText.textContent = "Draw";
            }
        }
    })
}

closeModal.addEventListener('click', function (e) {
    //reset game
    let i = 1;
    for (let span of spans) {
        span.textContent = i;
        i++;
        span.style.color = "#d7cabe";
    }
    gameWon = 0;
    modal.style.display = "none";
    turn = 0;
    turnText.textContent = "Player " + (turn + 1);
    noOfTurns = 0;
})

document.addEventListener('keydown', function (e) {
    if (e.key >= 1 && e.key <= 9) {
        if (spans[e.key - 1].textContent != 'O' && spans[e.key - 1].textContent != 'X') {
            if (turn == 0)
                spans[e.key - 1].textContent = 'O';
            else spans[e.key - 1].textContent = 'X';
            spans[e.key - 1].style.color = "#7F5539";
            turn = !turn;
            turnText.textContent = "Player " + (turn + 1);
            noOfTurns++;
            if (noOfTurns >= 5) {
                checkWin();
                if (gameWon == 1)
                    //turnText.textContent = 1;
                    showWinner();
                else if (gameWon == 2)
                    showWinner();
                //turnText.textContent = 2;
                else if (gameWon == 3)
                    showWinner();
                //turnText.textContent = "Draw";
                showWinner();
            }
        }
    }
})

function checkWin() {
    if (noOfTurns == 9) {
        gameWon = 3;
        return;
    }

    //check each row and col
    for (let i = 0; i < 3; i++) {
        if ((spans[i * 3].textContent == 'O' && spans[i * 3 + 1].textContent == 'O' && spans[i * 3 + 2].textContent == 'O') || (spans[i].textContent == 'O' && spans[i + 3].textContent == 'O' && spans[i + 6].textContent == 'O')) {
            gameWon = 1;
            return;
        }
        else if ((spans[i * 3].textContent == 'X' && spans[i * 3 + 1].textContent == 'X' && spans[i * 3 + 2].textContent == 'X') || (spans[i].textContent == 'X' && spans[i + 3].textContent == 'X' && spans[i + 6].textContent == 'X')) {
            gameWon = 2;
            return;
        }
    }

    //check diagonal
    if ((spans[0].textContent == 'O' && spans[4].textContent == 'O' && spans[8].textContent == 'O') || (spans[2].textContent == 'O' && spans[4].textContent == 'O' && spans[6].textContent == 'O')) {
        gameWon = 1;
        return;
    }
    else if ((spans[0].textContent == 'X' && spans[4].textContent == 'X' && spans[8].textContent == 'X') || (spans[2].textContent == 'X' && spans[4].textContent == 'X' && spans[6].textContent == 'X')) {
        gameWon = 2;
        return;
    }
}

function showWinner() {
    winnerMessage.textContent = gameWon + " has won!";
    modal.style.display = "block";
}