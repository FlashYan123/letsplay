document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const width = 4;
    let cells = [];
    let cellPositions = [];

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML = 0;
            gridContainer.appendChild(cell);
            cells.push(cell);
            cellPositions.push({ x: i % width, y: Math.floor(i / width) });
        }
        updateCellPositions();
        generateRandom();
        generateRandom();
    }

    function updateCellPositions() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.transform = `translate(${cellPositions[i].x * 100}px, ${cellPositions[i].y * 100}px)`;
        }
    }

    function generateRandom() {
        let randomNumber = Math.floor(Math.random() * cells.length);
        if (cells[randomNumber].innerHTML == 0) {
            cells[randomNumber].innerHTML = 2;
            cells[randomNumber].style.backgroundColor = "#eee4da";
            checkForGameOver();
        } else generateRandom();
    }

    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = cells[i].innerHTML;
                let totalTwo = cells[i + 1].innerHTML;
                let totalThree = cells[i + 2].innerHTML;
                let totalFour = cells[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                cells[i].innerHTML = newRow[0];
                cells[i + 1].innerHTML = newRow[1];
                cells[i + 2].innerHTML = newRow[2];
                cells[i + 3].innerHTML = newRow[3];
            }
        }
        updateCellPositions();
    }

    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = cells[i].innerHTML;
                let totalTwo = cells[i + 1].innerHTML;
                let totalThree = cells[i + 2].innerHTML;
                let totalFour = cells[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                cells[i].innerHTML = newRow[0];
                cells[i + 1].innerHTML = newRow[1];
                cells[i + 2].innerHTML = newRow[2];
                cells[i + 3].innerHTML = newRow[3];
            }
        }
        updateCellPositions();
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = cells[i].innerHTML;
            let totalTwo = cells[i + width].innerHTML;
            let totalThree = cells[i + (width * 2)].innerHTML;
            let totalFour = cells[i + (width * 3)].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            cells[i].innerHTML = newColumn[0];
            cells[i + width].innerHTML = newColumn[1];
            cells[i + (width * 2)].innerHTML = newColumn[2];
            cells[i + (width * 3)].innerHTML = newColumn[3];
        }
        updateCellPositions();
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = cells[i].innerHTML;
            let totalTwo = cells[i + width].innerHTML;
            let totalThree = cells[i + (width * 2)].innerHTML;
            let totalFour = cells[i + (width * 3)].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            cells[i].innerHTML = newColumn[0];
            cells[i + width].innerHTML = newColumn[1];
            cells[i + (width * 2)].innerHTML = newColumn[2];
            cells[i + (width * 3)].innerHTML = newColumn[3];
        }
        updateCellPositions();
    }

    function combineRow() {
        for (let i = 0; i < (width * width) - 1; i++) {
            if (cells[i].innerHTML === cells[i + 1].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + 1].innerHTML);
                cells[i].innerHTML = combinedTotal;
                cells[i + 1].innerHTML = 0;
                cells[i].style.backgroundColor = "#eee4da";
                cells[i + 1].style.backgroundColor = "#cdc1b4";
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < (width * (width - 1)); i++) {
            if (cells[i].innerHTML === cells[i + width].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + width].innerHTML);
                cells[i].innerHTML = combinedTotal;
                cells[i + width].innerHTML = 0;
                cells[i].style.backgroundColor = "#eee4da";
                cells[i + width].style.backgroundColor = "#cdc1b4";
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generateRandom();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generateRandom();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generateRandom();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generateRandom();
    }

    function checkForWin() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 2048) {
                setTimeout(() => alert('You WIN!'), 100);
                document.removeEventListener('keyup', control);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            setTimeout(() => alert('You LOSE!'), 100);
            document.removeEventListener('keyup', control);
        }
    }

    window.restartGame = function () {
        cells.forEach(cell => {
            cell.innerHTML = 0;
            cell.style.backgroundColor = "#cdc1b4";
        });
        score = 0;
        scoreDisplay.innerHTML = score;
        generateRandom();
        generateRandom();
        document.addEventListener('keyup', control);
    };

    document.getElementById('upButton').addEventListener('click', keyUp);
    document.getElementById('downButton').addEventListener('click', keyDown);
    document.getElementById('leftButton').addEventListener('click', keyLeft);
    document.getElementById('rightButton').addEventListener('click', keyRight);

    createBoard();
});
