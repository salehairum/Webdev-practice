const rows = 20;
const cols = 20;

initGame();

function initGame() {
    createBoard();
}

function createBoard() {
    let k = 0;
    const board = document.querySelector('.game-container');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < cols; j++, k++) {
            const box = document.createElement('div');
            if (k % 2 === 0)
                box.classList.add('boxLight');
            else
                box.classList.add('boxDark');
            row.appendChild(box);
        }
        k++;
        board.appendChild(row);
    }
}
