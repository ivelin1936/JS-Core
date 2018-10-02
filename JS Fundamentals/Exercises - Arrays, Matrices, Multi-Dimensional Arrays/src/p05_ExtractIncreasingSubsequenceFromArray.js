function extract(inputArr) {
    return inputArr
        .filter((element, index) =>
            element >= Math.max.apply(null, inputArr.slice(0, index)))
        .join('\n');
}

console.log(extract([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log();
console.log(extract([1, 2, 3, 4]));
console.log();
console.log(extract([20, 3, 2, 15, 6, 1]));
