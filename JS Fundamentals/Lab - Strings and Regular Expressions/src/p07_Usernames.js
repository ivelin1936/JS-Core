function getUserNames(inputArr) {
    let userNames = [];

    for (let i = 0; i < inputArr.length; i++) {
        let suffix = inputArr[i].split('@')[1]
            .split('.')
            .map(str => str[0])
            .join('');
        let name = inputArr[i].split('@')[0] + '.' + suffix;
        userNames.push(name);
    }

    return userNames.join(', ');
}

console.log(getUserNames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']));


function printUserNames(arr) {
    return arr.map(e => {
        let atSeparated = e.split('@');

        return atSeparated[0] + '.' + atSeparated[1]
            .split('.')
            .map(a => a[0])
            .join('')
    })
        .join(', ');
}


printUserNames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);