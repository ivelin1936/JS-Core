function printArrElementsOnGivenStep(inputArr) {
    let step = +inputArr.pop();

    return inputArr
        .filter((e, i) => i % step === 0)
        .join('\n');
}

console.log(printArrElementsOnGivenStep(['5',
    '20',
    '31',
    '4',
    '20',
    '2']
));
console.log();
console.log(printArrElementsOnGivenStep(['dsa',
    'asd',
    'test',
    'tset',
    '2']
));
console.log();
console.log(printArrElementsOnGivenStep(['1',
    '2',
    '3',
    '4',
    '5',
    '6']
));