function orderDatabase(inputRegister) {
    const prefix = '|||';
    let database = new Map();

    inputRegister.forEach(row => fillDatabase(row));

    let sortSystems = (a, b) =>
        (b[1].size - a[1].size !== 0) ? b[1].size - a[1].size // By components count -> x[1].size
            : a[0] < b[0] ? -1 // By Name -> x[0]
            : a[0] > b[0] ? 1
                : 0;

    return [...database]
        .sort((a, b) => sortSysByCompCountDescThenByName(a, b))
        .map(system => system[0]
            + "\n"
            + [...system[1]]
                .sort((a, b) => sortCompBySubcompCountDesc(a, b))
                .map(c => prefix + c[0] + '\n' + prefix.repeat(2) + c[1].join('\n' + prefix.repeat(2)))
                .join('\n')
        ).join('\n');

    function fillDatabase(row) {
        let [systemName, componentName, subcomponentName] = row.split(' | ');

        if (!database.has(systemName)) {
            database.set(systemName, new Map());
        }
        if (!database.get(systemName).has(componentName)) {
            database.get(systemName).set(componentName, []);
        }
        database.get(systemName).get(componentName).push(subcomponentName);
    }

    function sortCompBySubcompCountDesc(a, b) {
        let aSubCompCount = a[1].length;
        let bSubCompCount = b[1].length;

        return bSubCompCount - aSubCompCount;
    }

    function sortSysByCompCountDescThenByName(a, b) {
        // Map<Systems, Map<Components, SubComponents>>
        let aName = a[0];
        let bName = b[0];
        let aComponentsCount = a[1].size;
        let bComponentsCount = b[1].size;

        let comparingByCountDesc = bComponentsCount - aComponentsCount;

        if (comparingByCountDesc !== 0) {
            return comparingByCountDesc;
        } else {
            return compareNamesAlphabeticalOrder(aName, bName);
        }
    }

    function compareNamesAlphabeticalOrder(aName, bName) {
        if (aName < bName) {
            return -1;
        } else if (bName > aName) {
            return 1;
        }
        return 0;
    }
}

console.log(orderDatabase([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]));