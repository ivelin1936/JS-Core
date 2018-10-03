function extractInfo(inputArr) {
    let towns =[];
    let distance = 0;
    let regex = new RegExp(`[\\|]([a-zA-Z ]+)[\\|]([0-9 ]+)`);

    for (let obj of inputArr) {
        if (regex.test(obj)) {
            let town = regex.exec(obj)[1].trim();
            let dist = +regex.exec(obj)[2].trim();
            towns.push(town);
            distance += dist;
        }
    }

    console.log(towns.join(', '));
    console.log(distance);
}

extractInfo([
    '| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);


function extractInfo2(inputArr) {
    let delimiter = '|';
    let towns = [];
    let sum = 0;

    for (let i = 0; i < inputArr.length; i++) {
        let startIndex = inputArr[i].indexOf(delimiter) + 1;
        let endIndex = inputArr[i].lastIndexOf(delimiter);

        let town = inputArr[i].substring(startIndex, endIndex).trim();
        let income = Number(inputArr[i].substring(endIndex + 1).trim());

        towns.push(town);
        sum += income;
    }

    console.log(towns.join(', '));
    console.log(sum);
}

extractInfo2([
    '| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);