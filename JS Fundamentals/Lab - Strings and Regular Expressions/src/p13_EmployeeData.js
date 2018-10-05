function parseData(inputArr) {
    let employeeDataPattern = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*([.,]?[0-9]*)) - ([A-Za-z0-9- ]+)$/;

    let result = '';
    for (let i = 0; i < inputArr.length; i++) {
        let match = inputArr[i].match(employeeDataPattern);
        if (match) {
            result += `Name: ${match[1]}\n` +
                `Position: ${match[4]}\n` +
                `Salary: ${match[2]}\n`;
        }
    }
    return result.trim();
}

console.log(parseData([
    'Isacc - 1000 - CEO',
    'Ivan - 500 - Employee',
    'Peter - 500 - Employee'
]));
console.log('*'.repeat(50));
console.log(parseData([
    'Jonathan - 2000 - Manager',
    'Peter- 1000- Chuck',
    'George - 1000 - Team Leader']
));