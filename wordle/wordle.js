let i = 0;   //maintains the letter being filled currently in a particular row
let lettersPerRow = 5;
let filledLetters = 0;
let currentRow = 1;
let nRows = 6;
let answers = [];
let validGuesses = [];
let actualWord = "";
let gameWon = false;

let letters = document.querySelectorAll(`.row${currentRow} .box`);
let keyboard = document.querySelectorAll(`.keyboardRow .box`);  //all letter keys
// backspace is not "text content", rather an img, so thats why i have to do this
const backSpaceKey = document.querySelector(".fa-delete-left").parentElement;
//enter box is styled differently, its a different class
const enterKey = document.querySelector(".enterBox").parentElement;

//word selection logic
fetch('./words.json')
    .then(response => response.json())
    .then(data => {
        answers = data.answers;
        answers = answers.map(word => word.toUpperCase());

        validGuesses = data.validGuesses;
        validGuesses = validGuesses.map(word => word.toUpperCase());

        //generate a random word for this game
        let randomIndex = Math.floor(Math.random() * answers.length);
        actualWord = answers[randomIndex];
    })
    .catch(error => console.error('Error loading JSON:', error));

function startGame() {
    i = 0;
    filledLetters = 0;
    let randomIndex = Math.floor(Math.random() * answers.length);
    actualWord = answers[randomIndex];
    gameWon = false;

    for (let row = 1; row <= nRows; row++) {
        (function (rowNum) {
            letters = document.querySelectorAll(`.row${rowNum} .box`);

            for (let j = 0; j < lettersPerRow; j++) {
                (function (index) {
                    letters[index].setAttribute("data-taken", "false");
                    letters[index].querySelector(".letter1").textContent = "";
                    letters[index].querySelector(".letter2").textContent = "";
                    letters[index].classList.remove("correctLetter");
                    letters[index].classList.remove("incorrectLetter");
                    letters[index].classList.remove("letterExists");
                    letters[index].classList.remove("animateEnterWord");
                    letters[index].classList.remove("animateBackSpace");
                })(j);
            }
        })(row);
    }



    for (let key of keyboard) {
        key.classList.remove("correctLetter");
        key.classList.remove("incorrectLetterKeyboard");
        key.classList.remove("letterExists");
    }

    currentRow = 1;
    letters = document.querySelectorAll(`.row${currentRow} .box`);
}

function assignInput(value) {

    if (letters[i]) {
        (function (index) {
            letters[index].classList.remove("animateInput");
            // letters[index].classList.remove("resetGame");

            // Trigger a reflow, to allow for css animation to reload
            void letters[index].offsetWidth;
            letters[index].classList.add("animateInput");

            letters[index].addEventListener("animationend", () => {
                letters[index].classList.remove("animateInput");
            });

            letters[index].setAttribute("data-taken", "true");

            letters[index].querySelector(".letter1").textContent = value;
            letters[index].querySelector(".letter2").textContent = value;

            i++;
            if (i > lettersPerRow) {
                //if all letters are entered, then no more letters entered unless user goes back and modifies
                i = lettersPerRow - 1;
            }
            if (filledLetters < lettersPerRow)
                filledLetters++;


        })(i);
    }
    else {
        console.log(`letter ${i} not defined in row ${currentRow}`);
    }
}
function waitForAnimationEnd(element) {
    return new Promise((resolve) => {
        element.addEventListener("animationend", resolve, { once: true });
    });
}

// async function enterWord() {
//     const currentRowLetters = [...letters];
//     const animationPromises = [];

//     for (let j = 0; j < lettersPerRow; j++) {
//         setTimeout(() => {
//             currentRowLetters[j].classList.remove("animateEnterWord");

//             // Trigger a reflow, to allow for css animation to reload
//             void currentRowLetters[j].offsetWidth;
//             currentRowLetters[j].classList.add("animateEnterWord");

//             animationPromises.push(waitForAnimationEnd(currentRowLetters[j]));

//             let currentLetter = currentRowLetters[j].querySelector('span').textContent;
//             let letterOnKeyboard = document.getElementById(`${currentLetter}`);

//             if (currentLetter === actualWord[j]) {
//                 currentRowLetters[j].classList.add("correctLetter");
//             } else if (actualWord.includes(currentLetter)) {
//                 currentRowLetters[j].classList.add("letterExists");
//             } else {
//                 currentRowLetters[j].classList.add("incorrectLetter");
//             }
//         }, j * 300);

//     }

//     // Wait for all animations to complete
//     await Promise.all(animationPromises);

//     // Modify letterOnKeyboard class after all animations are done
//     for (let j = 0; j < lettersPerRow; j++) {
//         let currentLetter = currentRowLetters[j].querySelector('span').textContent;
//         let letterOnKeyboard = document.getElementById(`${currentLetter}`);

//         if (currentLetter === actualWord[j]) {
//             letterOnKeyboard.classList.add("correctLetter");
//         } else if (actualWord.includes(currentLetter)) {
//             letterOnKeyboard.classList.add("letterExists");
//         } else {
//             letterOnKeyboard.classList.add("incorrectLetter");
//         }
//     }

//     filledLetters = 0;
//     i = 0;
//     currentRow++;

//     letters = document.querySelectorAll(`.row${currentRow} .box`);
// }
function enterWord() {
    const currentRowLetters = [...letters];
    let userWord = new Array(lettersPerRow);

    //check if the word is valid or not. first, combine all the letters(these are html) to form a proper string word
    for (let j = 0; j < lettersPerRow; j++) {
        userWord[j] = currentRowLetters[j].querySelector('span').textContent;
    }

    let currentWord = userWord.join("");
    if (!answers.includes(currentWord) && !validGuesses.includes(currentWord)) {
        invalidWord(currentRowLetters);
    }
    else {
        //assign colours to all the letters
        validWord(currentRowLetters, currentWord, userWord);
    }

    setTimeout(() => {
        if (currentRow > nRows && !gameWon) {
            showGameEnd();
        }
    }, lettersPerRow * 300);
}

function validWord(currentRowLetters, currentWord, userWord) {
    for (let j = 0; j < lettersPerRow; j++) {
        (function (index) {
            setTimeout(() => {
                currentRowLetters[index].classList.remove("animateEnterWord");

                // Trigger a reflow, to allow for css animation to reload
                void currentRowLetters[index].offsetWidth;
                currentRowLetters[index].classList.add("animateEnterWord");
                currentRowLetters[index].addEventListener("animationend", () => {
                    currentRowLetters[index].classList.remove("animateEnterWord");
                });

                let currentLetter = userWord[index];
                let bgColor = window.getComputedStyle(currentRowLetters[index]).backgroundColor;
                if (currentLetter === actualWord[index]) {
                    currentRowLetters[index].classList.add("correctLetter");
                }
                else if (actualWord.includes(currentLetter)) {
                    currentRowLetters[index].classList.add("letterExists");
                }
                else {
                    currentRowLetters[index].classList.add("incorrectLetter");
                }

                if (currentWord === actualWord) {
                    gameWon = true;
                    showWinner();
                }
            }, j * 300);
        })(j);
    }

    //keyboard is modified after the row animations are done
    setTimeout(() => {
        for (let j = 0; j < lettersPerRow; j++) {

            let currentLetter = userWord[j];

            let letterOnKeyboard = document.getElementById(`${currentLetter}`);

            if (currentLetter === actualWord[j]) {
                letterOnKeyboard.classList.add("correctLetter");
                currentRowLetters[index].classList.remove("letterExists");
            }
            else if (actualWord.includes(currentLetter)) {
                letterOnKeyboard.classList.add("letterExists");
            }
            else {
                letterOnKeyboard.classList.add("incorrectLetterKeyboard");
            }

        }
    }, lettersPerRow * 300);


    filledLetters = 0;
    i = 0;
    currentRow++;

    letters = document.querySelectorAll(`.row${currentRow} .box`);
}

function invalidWord(currentRowLetters) {
    for (let j = 0; j < lettersPerRow; j++) {
        currentRowLetters[j].classList.remove("animateInvalidWord");

        // Trigger a reflow, to allow for css animation to reload
        void currentRowLetters[j].offsetWidth;
        currentRowLetters[j].classList.add("animateInvalidWord");
        currentRowLetters[j].addEventListener("animationend", () => {
            currentRowLetters[j].classList.remove("animateInvalidWord");
        });
    }
    const popup = document.createElement('div'); // Create a new div for the row
    popup.classList.add('popup'); // Add the 'row' class

    popup.innerHTML = '<p>Invalid word!</p>'; // Initialize with a placeholder

    const main = document.querySelector('.gameContainer');
    main.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('popupRemove');
    }, 750);
    setTimeout(() => {
        popup.remove(); // Remove the popup element
    }, 1000);
}

function backSpaceInput() {
    if (i > 0) {
        filledLetters--;
        i--;
    }
    (function (index) {
        letters[index].querySelector(".letter1").textContent = ' ';
        letters[index].querySelector(".letter2").textContent = ' ';
        letters[index].classList.remove("animateBackSpace");

        // Trigger a reflow, to allow for css animation to reload
        void letters[index].offsetWidth;
        letters[index].classList.add("animateBackSpace");

        letters[index].addEventListener("animationend", () => {
            letters[index].classList.remove("animateBackSpace");
        });

        letters[index].removeAttribute("data-taken");

    })(i);

}

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)) {
        assignInput(e.key.toUpperCase());
    }

    if (e.key === "Enter" && filledLetters == lettersPerRow) {
        enterWord();
    }

    if (e.key === "Backspace") {
        backSpaceInput();
    }
})

for (let key of keyboard) {
    key.addEventListener("click", function () {
        if (key.textContent >= 'A' && key.textContent <= 'Z') {
            assignInput(key.textContent);
        }
        if (key.textContent === "Enter" && filledLetters == lettersPerRow) {
            enterWord();
        }
    })
}

backSpaceKey.addEventListener("click", () => {
    backSpaceInput();
});

enterKey.addEventListener("click", () => {
    if (filledLetters == lettersPerRow) {
        //this needs to have a lot more implementation 
        enterWord();
    }
});

for (let letter of letters) {
    letter.addEventListener("click", function () {
        i = Array.from(letters).indexOf(letter);
    })
}

function showWinner() {
    let gameResult = document.querySelector(".overlay");
    setTimeout(() => {
        gameResult.style.display = "block";
    }, (lettersPerRow + 1) * 300);

}

function showGameEnd() {
    let gameResult = document.querySelector(".overlay");
    gameResult.style.display = "block";
    let gameResultText = document.querySelector(".gameResultText");
    gameResultText.textContent = "Word was: " + actualWord;

}

let closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function () {
    let gameResult = document.querySelector(".overlay");
    gameResult.style.display = "none";
    //and restart the game

    startGame();
});
