function createCatalog(inputArr) {
    return [...new Set(inputArr)]
        .sort((username1, username2) =>
            username1.length - username2.length //by username length ASC, as first criteria
            || username1.localeCompare(username2)) //by alphabetical order as second criteria
        .join('\n');
}

console.log(createCatalog([
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston'
]));
console.log('*'.repeat(50));
console.log(createCatalog([
    'Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'
]));

function createCatalog2(inputArr) {
    let catalog = new Set();
    inputArr.forEach(token => catalog.add(token));

    let sortByNameLengthASC = (firstName, secondName) =>
        firstName.length - secondName.length;

    let sortByNameAlphabetical = (firstName, secondName) =>
        firstName.localeCompare(secondName);

    let resultCatalog = Array.from(catalog)
        .sort((username1, username2) =>
        sortByNameLengthASC(username1, username2)
            || sortByNameAlphabetical(username1, username2))
        .join('\n');

    return resultCatalog;
}

console.log(createCatalog2([
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston'
]));
console.log('*'.repeat(50));
console.log(createCatalog2([
    'Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'
]));