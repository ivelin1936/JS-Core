function createRegister(inputArr) {
    let register = new Map();

    inputArr.map(e => e.split(' | '))
        .forEach(element => {
            let carBrand = element[0];
            let carModel = element[1];
            let producedCars = +element[2];

            if (!register.has(carBrand)) {
                register.set(carBrand, new Map())
            }
            if (!register.get(carBrand).has(carModel)) {
                register.get(carBrand).set(carModel, producedCars);
            } else {
                let newValue = register.get(carBrand).get(carModel) + producedCars;
                register.get(carBrand).set(carModel, newValue);
            }
        });

    let result = '';
    for (let [key, value] of register.entries()) {
        result += key + "\n";
        value.forEach((v, k) => {
            result += `###${k} -> ${v}\n`;
        })
    }

    return result;
}

console.log(createRegister([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]));


function printProductionStatistics(inputArr) {
    let stat = new Map();

    for (const row of inputArr) {
        let [brand, model, countAsString] = row.split(' | ');
        let producedCount = +countAsString;

        if (!stat.get(brand)) {
            stat.set(brand, new Map().set(model, producedCount));
        } else if (!stat.get(brand).get(model)) {
            stat.get(brand).set(model, producedCount);
        } else {
            stat.set(brand, stat.get(brand).set(model, stat.get(brand).get(model) + producedCount));
        }
    }

    let result = [...stat].map(b => b[0] + '\n'
        + [...b[1]].map(kvp => `###${kvp[0]} -> ${kvp[1]}`)
            .join('\n'))
        .join('\n');

    console.log(result);
}

printProductionStatistics([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);