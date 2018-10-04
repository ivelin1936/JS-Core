function hideData(inputArr, replacement = '|') {

    let hideOptions = {
        name: (str) =>
            str.replace(/\*[A-Z][A-Za-z]*(?=\t| |$)/gm, (match) => replacement.repeat(match.length)),
        phone: (str) =>
            str.replace(/\+[0-9-]{10}(?=\t| |$)/gm, (match) => replacement.repeat(match.length)),
        id: (str) =>
            str.replace(/![a-zA-Z0-9]+(?=\t| |$)/gm, (match) => replacement.repeat(match.length)),
        secretBase: (str) =>
            str.replace(/_[a-zA-Z0-9]+(?=\t| |$)/gm, (match) => replacement.repeat(match.length))
    };

    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i] = hideOptions.name(inputArr[i]);
        inputArr[i] = hideOptions.phone(inputArr[i]);
        inputArr[i] = hideOptions.id(inputArr[i]);
        inputArr[i] = hideOptions.secretBase(inputArr[i]);
    }

    return inputArr.join('\n');
}

console.log(hideData([
    'Agent *Ivankov was in the room when it all happened.',
    'The person in the room was heavily armed.',
    'Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number. ',
    'I think it was +555-49-796',
    "I can't really remember...",
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    "I really don't know what happened there.",
    'This is all I saw, that night.',
    'I cannot explain it myself...'
]));


function hideData2(inputArr, replacement = '|') {

    let nameRegex = /\*[A-Z][A-Za-z]*(?=\t| |$)/gm;
    let phoneRegex = /\+[0-9-]{10}(?=\t| |$)/gm;
    let idRegex = /![a-zA-Z0-9]+(?=\t| |$)/gm;
    let secretBaseRegex = /_[a-zA-Z0-9]+(?=\t| |$)/gm;

    let actionWithMatch = (str, regex) => {
        let match = str.match(regex);
        if (match !== null) {
            for (let i = 0; i < match.length; i++) {
                str = str.replace(match[i], replacement.repeat(match[i].length))
            }
        }
        return str;
    };

    let actionWithExec = (str, regex) => {
        let match = regex.exec(str);
        while (match) {
            str = str.replace(match[0], replacement.repeat(match[0].length));
            match = regex.exec(str);
        }
        return str;
    };

    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i] = actionWithExec(inputArr[i], nameRegex);
        inputArr[i] = actionWithExec(inputArr[i], phoneRegex);
        inputArr[i] = actionWithExec(inputArr[i], idRegex);
        inputArr[i] = actionWithExec(inputArr[i], secretBaseRegex);
    }
    return inputArr.join('\n');
}

console.log(hideData2([
    'Agent *Ivankov was in the room when it all happened.',
    'The person in the room was heavily armed.',
    'Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number. ',
    'I think it was +555-49-796',
    "I can't really remember...",
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    "I really don't know what happened there.",
    'This is all I saw, that night.',
    'I cannot explain it myself...'
]));