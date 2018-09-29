function formatterXML(arr) {
    let tab = '  ';
    let newLine = '\r\n';

    let strXML = `<?xml version="1.0" encoding="UTF-8"?>${newLine}<quiz>${newLine}`;

    let xmlBuilder = function (question, answer) {
        strXML = strXML + `${tab}<question>${newLine}`
            + `${tab.repeat(2)}` + question + `${newLine}`
            + `${tab}</question>${newLine}`
            + `${tab}<answer>${newLine}`
            + `${tab.repeat(2)}` + answer + `${newLine}`
            + `${tab}</answer>${newLine}`;
    };

    for (let i = 0; i < arr.length; i += 2) {
        let question = arr[i];
        let answer = arr[i + 1];
        xmlBuilder(question, answer);
    }

    return strXML + `</quiz>`;
}

console.log(formatterXML(["Who was the forty-second president of the U.S.A.?",
    "William Jefferson Clinton"]));
console.log();
console.log(formatterXML(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
));

function formatAsXml(params) {
    let tab = '  ';
    let newLine = '\r\n';

    let result = `<?xml version="1.0" encoding="UTF-8"?>${newLine}<quiz>${newLine}`;

    for (let i = 0; i < params.length; i++) {
        result += `${tab}<question>${newLine}`;
        result += `${tab.repeat(2)}${params[i++]}${newLine}`;
        result += `${tab}</question>${newLine}`;
        result += `${tab}<answer>${newLine}`;
        result += `${tab.repeat(2)}${params[i]}${newLine}`;
        result += `${tab}</answer>${newLine}`;
    }

    result += '</quiz>';
    return result;
}

let xml =  formatAsXml(['Dry ice is a frozen form of which gas?', 'Carbon Dioxide',
    'What is the brightest star in the night sky?', 'Sirius']);

console.log(xml);