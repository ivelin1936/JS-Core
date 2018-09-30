function getBiggestElementFromMatrix(matrix) {
    let biggestNum = Number.NEGATIVE_INFINITY;
    matrix.forEach(
        row => row.forEach(
            col => biggestNum = Math.max(biggestNum, col)
        )
    );

    return biggestNum;
}

console.log(getBiggestElementFromMatrix([
        [20, 50, 10],
        [8, 33, 145]
    ]
));

console.log(getBiggestElementFromMatrix([
        [3, 5, 7, 12],
        [-1, 4, 33, 2],
        [8, 3, 0, 4]
    ]
));


function biggestNumber(matrix) {
    return Math.max
        .apply(null, matrix.reduce((a, b) => a.concat(b)));
}

console.log(biggestNumber([
    [20, 50, 10],
    [8, 33, 145]
    ]
));

console.log(biggestNumber([
    [3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]
    ]
));