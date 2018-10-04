function capitalizesWord(inputStr) {
    return inputStr
        .split(' ')
        .map(word => word.toLowerCase())
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(' ');
}

console.log(capitalizesWord('Capitalize these words'));
console.log(capitalizesWord('Was that Easy? tRY thIs onE for SiZe!'));