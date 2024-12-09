let letters = document.querySelectorAll(".box");

let i = 0;   //maintains the letter being filled currently
let lettersPerRow = 5;
let filledLetters = 0;
let rows = 1;

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)) {
        letters[i].textContent = e.key.toUpperCase();
        i++;
        if (i >= lettersPerRow)
            i = lettersPerRow - 1;
        if (filledLetters < lettersPerRow)
            filledLetters++;
    }
})

for (let letter of letters) {
    letter.addEventListener("click", function () {
        i = Array.from(letters).indexOf(letter);
    })
}