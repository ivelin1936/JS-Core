function extractText(text) {
    let open = '(';
    let close = ')';

    let openIndexes = [];
    let extractedContent = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === open) {
            openIndexes.push(i);
        } else if (text[i] === close && openIndexes.length > 0) {
            let startIndex = openIndexes.shift() + 1;
            let parenthesesContent = text.substring(startIndex, i);
            extractedContent.push(parenthesesContent);
        }
    }

    return extractedContent.join(', ');
}

console.log(extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)'));


function extractText2(text) {
    let open = '(';
    let close = ')';
    let result = [];

    let startIndex = text.indexOf(open);
    let endIndex = text.indexOf(close, startIndex);
    while (startIndex > -1 && endIndex > -1) {
        let snippet = text.substring(startIndex + 1, endIndex);
        result.push(snippet);

        startIndex = text.indexOf(open, endIndex);
        endIndex = text.indexOf(close, startIndex);
    }

    return result.join(', ');
}

console.log(extractText2('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)'));