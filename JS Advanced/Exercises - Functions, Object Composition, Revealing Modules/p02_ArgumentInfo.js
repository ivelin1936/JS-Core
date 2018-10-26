//With object
function solve(...arg) {
    let types = {};

    for (let i = 0; i < arg.length; i++) {
        const elementType = typeof arg[i];

        console.log(elementType + ': ' + arg[i]);

        if (!types[elementType]) {
            types[elementType] = 1;
        } else {
            types[elementType] += 1
        }
    }

    Object.keys(types)
        .sort((a, b) => types[b] - types[a])
        .map(k => `${k} = ${types[k]}`)
        .forEach(e => console.log(e));
}

solve('cat', 42, function () { console.log('Hello world!'); });

//With Map();
function argumentsInfo() {
    let metaData = new Map();

    for (const arg of arguments) {
        let currentType = typeof arg;
        console.log(`${currentType}: ${arg}`);

        let test = metaData.get(currentType)
        if (metaData.get(currentType)) {
            metaData.set(currentType, metaData.get(currentType) + 1);
        } else {
            metaData.set(currentType, 1);
        }
    }

    [...metaData]
        .sort((a, b) => b[1] - a[1])
        .forEach(md => {
            console.log(`${md[0]} = ${md[1]}`);
        });
}

argumentsInfo('cat', 42, function () { console.log('Hello world!'); });