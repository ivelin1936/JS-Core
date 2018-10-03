function letsOrbit([rows, cols, x, y]) {
    let currentValue = 1;
    let matrix = createMatrix(+rows, +cols);

    matrix[x][y] = currentValue;
    setLayers();

    return matrix.map(row => row.join(' ')).join('\n');

    function setLayers() {
        let possibleSteps = calculatePossibleSteps();

        while (possibleSteps-- > 0) {
            let pointX = x - currentValue;
            let pointY = y - currentValue;
            let step = currentValue + ++currentValue;

            letsRoll(pointX, pointY, step, currentValue);
        }
    }

    function letsRoll(row, col, steps, value) {
        for (let i = 1; i <= steps; i++) {
            let currentCol = col;
            for (let j = 1; j <= steps; j++) {
                if (isPointInside(row, currentCol) && isEmptyCell(row, currentCol)) {
                    matrix[row][currentCol] = value;
                }
                currentCol++;
            }
            row++;
        }
    }

    function isEmptyCell(row, col) {
        return matrix[row][col] === undefined;
    }

    function isPointInside(row, col) {
        if (row >= 0 && row <= matrix.length - 1) {
            if (col >= 0 && col <= matrix[0].length - 1) {
                return true;
            }
        }
        return false;
    }

    function createMatrix(rows, cols) {
        let matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix.push(new Array(cols))
        }
        return matrix;
    }

    function calculatePossibleSteps() {
        return Math.max(x, (matrix.length - x - 1))
    }
}

console.log(letsOrbit([4, 4, 0, 0]));
console.log();
console.log(letsOrbit([5, 5, 2, 2]));
console.log();
console.log(letsOrbit([3, 3, 2, 2]));