function findsAllVariableNames(text) {
    let regexp = new RegExp(/\b_([a-zA-Z0-9]+)\b/, 'g');

    return text.match(regexp)
        .map(variable => variable.substr(1))
        .join(',');
}

console.log(findsAllVariableNames('The _id and _age variables are both integers.'));
console.log(findsAllVariableNames('Calculate the _area of the _perfectRectangle object.'));
console.log(findsAllVariableNames('__invalidVariable _evenMoreInvalidVariable_ _validVariable'));


function findsAllVariableNames2(text) {
    let regexp = new RegExp(/\b_([a-zA-Z0-9]+)\b/, 'g');
    let variables = [];

    let match = regexp.exec(text);
    while (match) {
        variables.push(match[1]);
        match = regexp.exec(text);
    }
    return variables.join(',');
}

console.log(findsAllVariableNames2('The _id and _age variables are both integers.'));
console.log(findsAllVariableNames2('Calculate the _area of the _perfectRectangle object.'));
console.log(findsAllVariableNames2('__invalidVariable _evenMoreInvalidVariable_ _validVariable'));