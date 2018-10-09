function createSortedCatalog(inputArr) {
    let catalog = new Map();
    inputArr.map(e => e.split(' : '))
        .forEach(data => {
        let productName = data[0];
        let firstLetter = data[0].charAt(0);
        let productPrice = +data[1];

        if (!catalog.has(firstLetter)) {
            catalog.set(firstLetter, new Map());
        }

        catalog.get(firstLetter).set(productName, productPrice);
        });

    let result = '';

    let sortedMap = new Map([...catalog.entries()].sort());
    for (let key of sortedMap.keys()) {
        result += `${key}\n`;

        let sortedInnerMap = new Map([...sortedMap.get(key).entries()].sort());
        for (let innerKey of sortedInnerMap.keys()) {
            result += `  ${innerKey}: ${sortedMap.get(key).get(innerKey)}\n`;
        }
    }
    return result;
}

console.log(createSortedCatalog([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]));
console.log();
console.log(createSortedCatalog([
    'Banana : 2',
    `Rubic's Cube : 5`,
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10'
]));



function productsTOCatalog(params) {
    let products = params
        .map(e => {
            let tokens = e.split(' : ');
            return { name: tokens[0], price: Number(tokens[1]) }
        })
        .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1
            : a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0);

    if (products.length < 1) {
        return '';
    }

    let lastLetter = products[0].name[0].toUpperCase();
    let catalog = lastLetter + '\n';
    let ident = '  ';

    for (let i = 0; i < products.length; i++) {
        let currentLetter = products[i].name[0].toUpperCase();
        if (currentLetter !== lastLetter) {
            catalog += currentLetter + '\n';
            lastLetter = currentLetter;
        }

        catalog += `${ident}${products[i].name}: ${products[i].price}\n`
    }

    return catalog;
}

console.log(productsTOCatalog([]));
console.log(productsTOCatalog(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
));