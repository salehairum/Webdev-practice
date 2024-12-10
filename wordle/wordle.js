let i = 0;   //maintains the letter being filled currently in a particular row
let lettersPerRow = 5;
let filledLetters = 0;
let currentRow = 1;

let letters = document.querySelectorAll(`.row${currentRow} .box`);

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)) {
        letters[i].textContent = e.key.toUpperCase();
        i++;
        if (i >= lettersPerRow) {
            i = 0;
        }
        if (filledLetters < lettersPerRow)
            filledLetters++;
    }

    if (e.key === "Enter") {
        //this needs to have a lot more implementation 
        filledLetters = 0;
        i = 0;
        currentRow++;
        letters = document.querySelectorAll(`.row${currentRow} .box`);
    }
})

for (let letter of letters) {
    letter.addEventListener("click", function () {
        i = Array.from(letters).indexOf(letter);
    })
}