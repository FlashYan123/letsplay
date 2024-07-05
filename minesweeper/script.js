document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const resetButton = document.getElementById('reset');
    const size = 10;
    const totalCells = size * size;
    const mineCount = 20;
    const cells = [];
    let mines = [];
    let gameEnded = false;
    let cellsClicked = 0;

    // Function to generate random mines
    const generateMines = (clickedIndex) => {
        const mines = [];
        while (mines.length < mineCount) {
            const rand = Math.floor(Math.random() * totalCells);
            if (rand !== clickedIndex && !mines.includes(rand)) {
                mines.push(rand);
            }
        }
        return mines;
    };

    // Function to create grid
    const createGrid = () => {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            container.appendChild(cell);
            cells.push(cell);

            // Add event listener to handle cell click
            cell.addEventListener('click', () => {
                handleCellClick(cell);
            });
        }
    };

    // Function to handle cell click
    const handleCellClick = (cell) => {
        if (gameEnded) return;
        const index = parseInt(cell.dataset.index);
        if (cell.classList.contains('clicked')) return;
        cell.classList.add('clicked');
        cellsClicked++;

        if (mines.includes(index)) {
            // Game over
            endGame(false);
        } else {
            // Continue game
            const adjacentMines = getAdjacentMines(index);
            if (adjacentMines > 0) {
                cell.textContent = adjacentMines;
            } else {
                // Expand empty area
                expandEmptyArea(index);
            }
            // Check for win
            if (cellsClicked === totalCells - mineCount) {
                endGame(true);
            }
        }
    };

    // Function to get count of adjacent mines
    const getAdjacentMines = (index) => {
        const adjacentIndices = getAdjacentIndices(index);
        return adjacentIndices.filter(i => mines.includes(i)).length;
    };

    // Function to get adjacent cell indices
    const getAdjacentIndices = (index) => {
        const indices = [];
        const row = Math.floor(index / size);
        const col = index % size;
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, size - 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, size - 1); j++) {
                if (!(i === row && j === col)) {
                    indices.push(i * size + j);
                }
            }
        }
        return indices;
    };

    // Function to expand empty area
    const expandEmptyArea = (index) => {
        const queue = [index];
        const visited = new Set();
        while (queue.length > 0) {
            const current = queue.shift();
            const cell = cells[current];
            const adjacentMines = getAdjacentMines(current);
            if (adjacentMines > 0) {
                cell.textContent = adjacentMines;
            } else {
                cell.classList.add('clicked');
                cellsClicked++;
                const adjacentIndices = getAdjacentIndices(current);
                for (const i of adjacentIndices) {
                    if (!visited.has(i) && !queue.includes(i)) {
                        queue.push(i);
                    }
                }
            }
            visited.add(current);
        }
    };

    // Function to end the game
    const endGame = (win) => {
        gameEnded = true;
        if (win) {
            console.log('Congratulations! You won!');
            alert('Congratulations! You won!');
        } else {
            console.log('Game over! You clicked on a mine.');
            revealMines();
            alert('Game over! You clicked on a mine.');
        }
    };

    // Function to reveal mines
    const revealMines = () => {
        mines.forEach(index => cells[index].textContent = '*');
    };

    // Function to reset the game
    const resetGame = () => {
        gameEnded = false;
        cellsClicked = 0;
        mines.forEach(index => cells[index].textContent = '');
        mines = generateMines(-1);
        cells.forEach(cell => {
            cell.classList.remove('clicked');
            cell.textContent = '';
        });
    };

    // Generate mines initially
    mines = generateMines(-1);
    // Create grid
    createGrid();

    // Add event listener to reset button
    resetButton.addEventListener('click', resetGame);
});
