function operateArr(inputArr) {
    let initialNumber = 0;
    let resultArr = [];

    let commandDispatcher = (command) => {
        switch (command) {
            case 'add':
                resultArr.push(initialNumber);
                break;
            case 'remove':
                resultArr.pop();
                break;
        }
    };

    while (++initialNumber <= inputArr.length ) {
        commandDispatcher(inputArr[initialNumber - 1]);
    }

    return resultArr.length > 0 ?
        resultArr.join('\n') :
        'Empty';
}

console.log(operateArr(['add',
    'add',
    'add',
    'add']
));
console.log();
console.log(operateArr(['add',
    'add',
    'remove',
    'add',
    'add']
));
console.log();
console.log(operateArr(['remove',
    'remove',
    'remove']
));
console.log();


function buildArray(params) {
    let currentValue = 1;
    let result = [];

    for (const command of params) {
        command.toLowerCase() === 'add'
            ? result.push(currentValue++)
            : result.pop(currentValue++);
    }

    return result.length === 0
        ? 'Empty'
        : result.join('\n');
}

console.log(buildArray(['add', 'add', 'remove', 'add', 'add']));