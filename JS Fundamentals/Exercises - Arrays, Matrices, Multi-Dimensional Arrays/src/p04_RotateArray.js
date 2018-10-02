function rotateArr(inputArr) {
    let amountOfRotation = +inputArr.pop();

    for (let i = 0; i < amountOfRotation % inputArr.length; i++) {
        inputArr.unshift(inputArr.pop());
    }

    return inputArr.join(' ');
}

console.log(rotateArr(['1',
    '2',
    '3',
    '4',
    '2']
));
console.log();
console.log(rotateArr(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15']
));