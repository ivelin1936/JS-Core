function censorNewsArticles(text, listOfStr) {
    let dash = '-';
    for (let pattern of listOfStr) {

        let startIndexOfWord = text.indexOf(pattern);
        while (startIndexOfWord > -1) {
            text = text.replace(pattern, dash.repeat(pattern.length));
            startIndexOfWord = text.indexOf(pattern);
        }
    }

    return text;
}

console.log(censorNewsArticles(
    'roses are red, violets are blue',
    [', violets are', 'red']
));
console.log();
console.log(censorNewsArticles(
    'David Ruben Piqtoukun (born 1950) is an Inuit artist from Paulatuk, ' +
    'Northwest Territories. His output includes sculpture and prints; ' +
    'the sculptural work is innovative in its use of mixed media. His ' +
    'materials and imagery bring together modern and traditional Inuit ' +
    'stylistic elements in a personal vision. An example of this is his work ' +
    '"The Passage of Time" (1999), which portrays a shaman in the form of a ' +
    'salmon moving through a hole in a hand. While shamanic imagery is ' +
    'common in much of Inuit art, the hand in this work is sheet metal, not ' +
    'a traditional material such as walrus ivory, caribou antler or soapstone. ' +
    'Ruben\'s brother, Abraham Apakark Anghik Ruben, is also a sculptor. ' +
    'Fellow Inuit artist Floyd Kuptana learned sculpting techniques as an ' +
    'apprentice to David Ruben.',
    ['Inuit'])
);