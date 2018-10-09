function convertToHTMLTable(inputData) {
    const tab = '\t';
    const newLine = '\n';

    let htmlTable = `<table>${newLine}`;
    let employees = inputData.map(e => JSON.parse(e))
        .forEach(empl => {
            htmlTable += `${tab}<tr>${newLine}` +
                `${tab.repeat(2)}<td>${empl.name}</td>${newLine}` +
                `${tab.repeat(2)}<td>${empl.position}</td>${newLine}` +
                `${tab.repeat(2)}<td>${empl.salary}</td>${newLine}` +
                `${tab}</tr>${newLine}`;
        });

    return htmlTable += `</table>`;
}

console.log(convertToHTMLTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]));
