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
    if (e.key === 'Enter' && filledLetters === lettersPerRow) {
        // Logic to generate a new row
        generateNewRow();
        i = 0; // Reset variables for the new row
        filledLetters = 0;
    }
})

for (let letter of letters) {
    letter.addEventListener("click", function () {
        i = Array.from(letters).indexOf(letter);
    })
}

function generateNewRow() {
    const newRow = document.createElement('div'); // Create a new div for the row
    newRow.classList.add('row'); // Add the 'row' class

    // Create boxes for the new row
    for (let j = 0; j < lettersPerRow; j++) {
        const newBox = document.createElement('div');
        newBox.classList.add('box'); // Add the 'box' class
        newBox.innerHTML = '<p>-</p>'; // Initialize with a placeholder
        newRow.appendChild(newBox); // Add the box to the new row
    }

    // Append the new row to the game container
    const main = document.querySelector('main');
    main.appendChild(newRow);
}