let i = 0;   //maintains the letter being filled currently in a particular row
let lettersPerRow = 5;
let filledLetters = 0;
let currentRow = 1;

let letters = document.querySelectorAll(`.row${currentRow} .box`);
let keyboard = document.querySelectorAll(`.keyboardRow .box`);  //all letter keys
// backspace is not "text content", rather an img, so thats why i have to do this
const backSpaceKey = document.querySelector(".fa-delete-left").parentElement;
//enter box is styled differently, its a different class
const enterKey = document.querySelector(".enterBox").parentElement;

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

function enterWord() {
    for (let j = 0; j < lettersPerRow; j++) {
        console.log(`Animating letter ${j} in row ${currentRow}`);

        letters[j].classList.remove("animateEnterWord");

        // Trigger a reflow, to allow for css animation to reload
        void letters[j].offsetWidth;
        letters[j].classList.add("animateEnterWord");
        letters[j].addEventListener("animationend", () => {
            letters[j].classList.remove("animateEnterWord");
        });
    }

    filledLetters = 0;
    i = 0;
    currentRow++;

    letters = document.querySelectorAll(`.row${currentRow} .box`);

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