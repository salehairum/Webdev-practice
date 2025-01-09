let i = 0;   //maintains the letter being filled currently in a particular row
let lettersPerRow = 5;
let filledLetters = 0;
let currentRow = 1;
let answers = [];
let validGuesses = [];
let actualWord = "";

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

function assignInput(value) {

    if (letters[i]) {
        letters[i].classList.remove("animateInputWord");

        // Trigger a reflow, to allow for css animation to reload
        void letters[i].offsetWidth;
        letters[i].classList.add("animateInput");
        letters[i].addEventListener("animationend", () => {
            letters[i].classList.remove("animateInput");
        });

        letters[i].setAttribute("data-taken", "true");

        letters[i].querySelector('span').textContent = value;

        i++;
        if (i > lettersPerRow) {
            //if all letters are entered, then no more letters entered unless user goes back and modifies
            i = lettersPerRow - 1;
        }
        if (filledLetters < lettersPerRow)
            filledLetters++;

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

    if (currentRow > 6) {
        showGameEnd();
    }

}

function validWord(currentRowLetters, currentWord, userWord) {
    for (let j = 0; j < lettersPerRow; j++) {
        setTimeout(() => {
            currentRowLetters[j].classList.remove("animateEnterWord");

            // Trigger a reflow, to allow for css animation to reload
            void currentRowLetters[j].offsetWidth;
            currentRowLetters[j].classList.add("animateEnterWord");
            currentRowLetters[j].addEventListener("animationend", () => {
                currentRowLetters[j].classList.remove("animateEnterWord");
            });

            let currentLetter = userWord[j];

            let letterOnKeyboard = document.getElementById(`${currentLetter}`);

            if (currentLetter === actualWord[j]) {
                currentRowLetters[j].classList.add("correctLetter");
                letterOnKeyboard.classList.add("correctLetter");
            }
            else if (actualWord.includes(currentLetter)) {
                currentRowLetters[j].classList.add("letterExists");
                letterOnKeyboard.classList.add("letterExists");
            }
            else {
                currentRowLetters[j].classList.add("incorrectLetter");
                letterOnKeyboard.classList.add("incorrectLetterKeyboard");
            }

            if (currentWord === actualWord) {
                showWinner();
            }
        }, j * 300); // Delay each animation by 200ms (adjust as needed)

    }
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
    letters[i].querySelector('span').textContent = ' ';

    letters[i].classList.remove("animateBackSpace");

    // Trigger a reflow, to allow for css animation to reload
    void letters[i].offsetWidth;
    letters[i].classList.add("animateBackSpace");
    letters[i].addEventListener("animationend", () => {
        letters[i].classList.remove("animateBackSpace");
    });

    letters[i].removeAttribute("data-taken");
}

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)) {
        //for managing animations
        assignInput(e.key.toUpperCase());
    }

    if (e.key === "Enter" && filledLetters == lettersPerRow) {
        //this needs to have a lot more implementation 
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
    gameResult.style.display = "block";
    // winner.classList.add("animateWinner");
    // winner.addEventListener("animationend", () => {
    //     winner.classList.remove("animateWinner");
    // });

    //startGame();
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
});
