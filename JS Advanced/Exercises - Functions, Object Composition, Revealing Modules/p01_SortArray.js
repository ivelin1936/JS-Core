function sortArray(inputArr, order) {
    let sortingStrategies = {
        asc: (a, b) => a - b,
        desc: (a, b) => b - a
    };

    let comparator = sortingStrategies[order];

    return inputArr.sort(comparator);
}

console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([14, 7, 17, 6, 8], 'desc'));