let i = 0;   //maintains the letter being filled currently in a particular row
let lettersPerRow = 5;
let filledLetters = 0;
let currentRow = 1;

let letters = document.querySelectorAll(`.row${currentRow} .box`);

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)) {
        //for managing animations
        letters[i].classList.remove("animate");

        // Trigger a reflow, to allow for css animation to reload
        void letters[i].offsetWidth;
        letters[i].classList.add("animate");
        letters[i].addEventListener("animationend", () => {
            letters[i].classList.remove("animate");
        });

        letters[i].setAttribute("data-taken", "true");

        letters[i].textContent = e.key.toUpperCase();
        i++;
        if (i > lettersPerRow) {
            //if all letters are entered, then no more letters entered unless user goes back and modifies
            i = lettersPerRow - 1;
        }
        if (filledLetters < lettersPerRow)
            filledLetters++;

    }

    if (e.key === "Enter" && filledLetters == lettersPerRow) {
        //this needs to have a lot more implementation 
        filledLetters = 0;
        i = 0;
        currentRow++;
        letters = document.querySelectorAll(`.row${currentRow} .box`);
    }

    if (e.key === "Backspace") {
        if (i > 0) {
            filledLetters--;
            i--;
        }
        letters[i].textContent = ' ';
        letters[i].removeAttribute("data-taken");
    }
})


for (let letter of letters) {
    letter.addEventListener("click", function () {
        i = Array.from(letters).indexOf(letter);
    })
}