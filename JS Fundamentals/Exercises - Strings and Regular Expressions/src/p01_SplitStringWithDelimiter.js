function splitString(str, delimiter) {
    return str.split(delimiter).join('\n');
}

console.log(splitString('One-Two-Three-Four-Five', '-'));
console.log(splitString('http://platform.softuni.bg', '.'));