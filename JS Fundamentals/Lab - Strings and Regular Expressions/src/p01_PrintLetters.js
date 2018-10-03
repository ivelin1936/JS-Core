function printLetters(input) {
    for (let letterIndex in input) {
        console.log(`str[${letterIndex}] -> ${input[letterIndex]}`);
    }
}

printLetters('Hello, World!');
console.log();
printLetters('SoftUni');


function toLetters(str) {
    return Array.from(str)
        .map((ch, i) => `str[${i}] -> ${ch}`)
        .join('\n');
}

console.log(toLetters('Hello, World!'));