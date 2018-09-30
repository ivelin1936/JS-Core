function processes(inputArr) {
    let processedArr = [];

    inputArr.forEach(element => {
        element < 0 ? processedArr.unshift(element) : processedArr.push(element);
    });

    return processedArr.join('\n');
}

console.log(processes([7, -2, 8, 9]));
console.log();
console.log(processes([3, -2, 0, -1]));