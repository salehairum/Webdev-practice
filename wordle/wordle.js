let letters = document.querySelectorAll(".box");

let i = 0;
let lettersPerRow = 5;
let rows = 1;

document.addEventListener("keydown", function (e) {
    if (/^[a-zA-Z]$/.test(e.key)/*(e.key >= 'a' && e.key <= 'z') /*|| (e.key >= 'A' && e.key <= 'Z')*/) {
        letters[i].textContent = e.key.toUpperCase();
        i++;
        if (i >= lettersPerRow)
            i = lettersPerRow - 1;
    }
    if (e.key === 'Enter') {
        // Logic to generate a new row
        generateNewRow();
        i = 0; // Reset i for the new row
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