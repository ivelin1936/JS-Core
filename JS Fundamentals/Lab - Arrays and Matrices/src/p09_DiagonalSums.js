function diagonalsSum(matrix) {
    let mainSum = 0, secondarySum = 0;

    for (let row = 0; row < matrix.length; row++) {
        mainSum += matrix[row][row];
        secondarySum += matrix[row][matrix.length - row - 1];
    }

    return mainSum + ' ' + secondarySum;
}

console.log(diagonalsSum([
    [20, 40],
    [10, 60]
]));
console.log(diagonalsSum([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]));


function getDiagonalsSum(matrix) {
    let diagonalsSum = (matrix) => matrix.map((row, rowIndex) =>
            row.filter((e, colIndex) => rowIndex === colIndex))
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => +a + +b)
        + ' ' +
        matrix.map((row, rowIndex) =>
            row.filter((e, colIndex) => colIndex === row.length - 1 - rowIndex))
            .reduce((a, b) => +a + +b);

    return diagonalsSum(matrix);
}

console.log(getDiagonalsSum([
    [20, 40],
    [10, 60]
]));
console.log(getDiagonalsSum([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]));