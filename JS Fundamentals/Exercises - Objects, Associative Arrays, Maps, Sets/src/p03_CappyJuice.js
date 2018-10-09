function bottlingJuice(inputArr) {
    const bottleCapacity = 1000;
    let bottles = new Map();
    let juiceCollection = {};

    for (let row of inputArr) {
        let splitedData = row.split(' => ');
        let juiceType = splitedData[0];
        let juiceQuantity = + splitedData[1];

        if (juiceCollection[juiceType]) {
            juiceCollection[juiceType] += juiceQuantity;
        } else {
            juiceCollection[juiceType] = juiceQuantity;
        }

        if (juiceCollection[juiceType] >= bottleCapacity) {
            fillBottle(juiceType);
        }
    }

    function fillBottle(juiceType) {
        let bottlesCount = Math.floor(juiceCollection[juiceType] / bottleCapacity);

        if (bottles.get(juiceType)) {
            bottles.set(juiceType, bottles.get(juiceType) + bottlesCount);
        } else {
            bottles.set(juiceType, bottlesCount);
        }
        juiceCollection[juiceType] = juiceCollection[juiceType] % bottleCapacity;
    }

    return [...bottles]
        .map(e => `${e[0]} => ${e[1]}`)
        .join('\n');
}

console.log(bottlingJuice(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
));
console.log();
console.log(bottlingJuice(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
));