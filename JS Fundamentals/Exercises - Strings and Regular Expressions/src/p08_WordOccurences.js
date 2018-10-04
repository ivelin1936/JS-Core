function findOccurrences(text, word) {
    let regex = new RegExp(`\\b${word}\\b`, 'gi');

    return text.match(regex) !== null ? text.match(regex).length : 0;
}

console.log(findOccurrences(
    'The waterfall was so high, that the child couldn’t see its peak.',
    'the'
));
console.log(findOccurrences(
    'How do you plan on achieving that? How? How can you even think of that?',
    'how'
));
console.log(findOccurrences(
    'There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
    'there'
));


function findOccurrences2(text, word) {
    let regex = new RegExp(`\\b${word}\\b`, 'gi');

    let counter = 0;
    let match = regex.exec(text);
    while (match) {
        counter++;
        match = regex.exec(text);
    }
    return counter;
}

console.log(findOccurrences2(
    'The waterfall was so high, that the child couldn’t see its peak.',
    'the'
));
console.log(findOccurrences2(
    'How do you plan on achieving that? How? How can you even think of that?',
    'how'
));
console.log(findOccurrences2(
    'There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
    'there'
));