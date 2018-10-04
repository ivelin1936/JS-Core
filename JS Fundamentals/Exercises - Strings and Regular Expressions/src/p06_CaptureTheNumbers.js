function findNumbers(inputArr) {
    let pattern = /\d+/g;

    return inputArr
        .join(' ')
        .match(pattern)
        .join(' ');
}

console.log(findNumbers([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'
]));
console.log(findNumbers([
    '123a456',
    '789b987',
    '654c321',
    '0'
]));
console.log(findNumbers([
    'Let’s go11!!!11!',
    'Okey!1!'
]));


function findNumbers2(inputArr) {
    let text = inputArr.join(' ');
    let pattern = /\d+/g;
    let numbers = [];

    let match = pattern.exec(text);
    while (match) {
        numbers.push(match[0]);
        match = pattern.exec(text);
    }

    return numbers.join(' ');
}

console.log(findNumbers2([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'
]));
console.log(findNumbers2([
    '123a456',
    '789b987',
    '654c321',
    '0'
]));
console.log(findNumbers2([
    'Let’s go11!!!11!',
    'Okey!1!'
]));