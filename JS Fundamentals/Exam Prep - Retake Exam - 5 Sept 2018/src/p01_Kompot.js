function solve(inputArr) {
    const fruitWeightInGr = {
        peach: 140,
        plum: 20,
        cherry: 9
    };
    const numberOfFruitsForOneKompot = {
        peach: 2.5,
        plum: 10,
        cherry: 25
    };

    let fruitsForCompot = inputArr.reduce((acc, cur) => {
        let fruitName = cur.split(/\s+/)[0];
        let fruitWeightInKg = +cur.split(/\s+/)[1];

        if (numberOfFruitsForOneKompot[fruitName]) {
            if (!acc[fruitName]) {
                acc[fruitName] = 0;
            }
            acc[fruitName] += fruitWeightInKg;
        } else {
            if (!acc['rakiya']) {
                acc['rakiya'] = 0;
            }
            acc.rakiya += fruitWeightInKg;
        }

        return acc;
    }, {});

    let production = {
        "peach": 0,
        "plum": 0,
        "cherry": 0,
        "rakiya": 0
    };
    for (let key of Object.keys(fruitsForCompot)) {
        if (key === 'rakiya') {
            production.rakiya += fruitsForCompot[key] * 0.2;
        } else {
            let fruitInKg = fruitsForCompot[key] * 1000;
            let count = fruitInKg / fruitWeightInGr[key];
            production[key] = Math.floor(count / numberOfFruitsForOneKompot[key]);
        }
    }

    console.log(`Cherry kompots: ${production.cherry}`);
    console.log(`Peach kompots: ${production.peach}`);
    console.log(`Plum kompots: ${production.plum}`);
    console.log(`Rakiya liters: ${production.rakiya.toFixed(2)}`);
}

solve([
    'cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0' ,
    'papaya 20'
]);
console.log('*'.repeat(30));
solve([
    'apple 6',
    'peach 25.158',
    'strawberry 0.200',
    'peach 0.1',
    'banana 1.55',
    'cherry 20.5',
    'banana 16.8',
    'grapes 205.65',
    'watermelon 20.54'
]);