function reverseAndConcat(inputArr) {
    return inputArr
        .reverse()
        .map(str => str.split('').reverse().join(''))
        .join('');
}

console.log(reverseAndConcat(['I', 'am', 'student']));
console.log(reverseAndConcat(['race', 'car']));


function reverseConcatenated(inputArr) {
    return Array
        .from(inputArr.join(''))
        .reverse()
        .join('');
}

console.log(reverseConcatenated(['I', 'am', 'student']));
console.log(reverseConcatenated(['race', 'car']));
