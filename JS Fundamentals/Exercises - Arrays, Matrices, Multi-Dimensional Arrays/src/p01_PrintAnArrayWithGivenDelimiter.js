function printArr(inputArr) {
    let delimiter = inputArr.pop();

    return inputArr.join(delimiter);
}

console.log(printArr(['One', 'Two', 'Three', 'Four', 'Five', '-']));
console.log(printArr(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']));