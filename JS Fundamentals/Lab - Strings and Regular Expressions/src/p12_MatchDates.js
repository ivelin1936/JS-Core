function matchDates(inputArr) {
    let regex = new RegExp(/\b[0-9]{1,2}-[A-Z][a-z]{2}-[0-9]{4}\b/, 'g');

    let match = inputArr.join(' ').match(regex);
    if (match) {
        for (let i = 0; i < match.length; i++) {
            let day = match[i].split('-')[0];
            let month = match[i].split('-')[1];
            let year = match[i].split('-')[2];

            match[i] += ` (Day: ${day}, Month: ${month}, Year: ${year})`
        }
    }
    return match.join('\n');
}

console.log(matchDates([
    'I am born on 30-Dec-1994.',
    'This is not date: 512-Jan-1996.',
    'My father is born on the 29-Jul-1955.'
]));
/* Right Output:
30-Dec-1994 (Day: 30, Month: Dec, Year: 1994)
29-Jul-1955 (Day: 29, Month: Jul, Year: 1955)
*/
console.log();
console.log(matchDates([
    '1-Jan-1999 is a valid date.',
    'So is 01-July-2000.',
    'I am an awful liar, by the way – Ivo, 28-Sep-2016.'
]));
/* Right Output:
1-Jan-1999 (Day: 1, Month: Jan, Year: 1999)
28-Sep-2016 (Day: 28, Month: Sep, Year: 2016)
*/