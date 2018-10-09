function storeUniqueSequences(inputArr) {
    let sequences = inputArr.map(row =>
        row.split(/[,\s\[\]]/)
            .filter(e => e !== '')
            .map(num => +num)
            .sort((a, b) => b - a));

    return [...new Set(sequences.map(row => JSON.stringify(row)))]
        .map(row => JSON.parse(row))
        .sort((a1, a2) => a1.length - a2.length)
        .map(row => {
            return `[${row.join(', ')}]`
        })
        .join('\n');
}

console.log(storeUniqueSequences([
    "[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"
]));
console.log('*'.repeat(30));
console.log(storeUniqueSequences([
    "[7.14, 7.180, 7.339, 80.099]",
    "[7.339, 80.0990, 7.140000, 7.18]",
    "[7.339, 7.180, 7.14, 80.099]"
]));


function storeUniqueSequences2(inputArr) {

    return [...new Set(inputArr.map(row =>
        row.split(/[,\s\[\]]/)
            .filter(e => e !== '')
            .map(num => +num)
            .sort((a, b) => b - a))
        .map(row => JSON.stringify(row)))]
        .map(row => JSON.parse(row))
        .sort((a1, a2) => a1.length - a2.length)
        .map(row => {
            return `[${row.join(', ')}]`
        })
        .join('\n');
}