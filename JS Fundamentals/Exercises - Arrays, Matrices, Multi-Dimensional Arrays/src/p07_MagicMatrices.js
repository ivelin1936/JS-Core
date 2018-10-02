function isMatrixMagical(matrix) {
    let targetSum = matrix[0].reduce((a, b) => a + b);

    let sumRow = (row) =>
        matrix[row].reduce((a, b) => a + b);

    let sumCol = (col) =>
        matrix.map(row => row[col]).reduce((a, b) => a + b);

    for (let row = 0; row < matrix.length; row++) {
        if (sumRow(row) !== targetSum) {
            return false;
        }
    }
    for (let col = 0; col < matrix[0].length; col++) {
        if (sumCol(col) !== targetSum) {
            return false;
        }
    }
    return true;
}

console.log(isMatrixMagical([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]));
console.log(isMatrixMagical([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));
console.log(isMatrixMagical([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
]));