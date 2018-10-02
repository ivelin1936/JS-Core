function sortArr(inputArr) {
    return inputArr
        .sort((e1, e2) => e1.length - e2.length || e1.localeCompare(e2))
        .join('\n');
}

console.log(sortArr(['alpha', 'beta', 'gamma']));
console.log();
console.log(sortArr(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']));
console.log();
console.log(sortArr(['test', 'Deny', 'omen', 'Default']));


function sortArrBy2Criteria(inputArr) {

    let compare = (a, b) => {
        if (a.length > b.length) {
            return 1;
        } else if (a.length < b.length) {
            return -1;
        } else {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            }
        }
        return 0;
    };

    return inputArr
        .sort((e1, e2) => compare(e1, e2))
        .join('\n');
}

console.log(sortArr(['alpha', 'beta', 'gamma']));
console.log();
console.log(sortArr(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']));
console.log();
console.log(sortArr(['test', 'Deny', 'omen', 'Default']));