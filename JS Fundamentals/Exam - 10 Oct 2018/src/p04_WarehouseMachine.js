function warehouseMachine(inputArr) {
    const commandDispatcher = {
        'in': (tokens) => insert(tokens), //you need to add coffee products
        'out': (tokens) => getOut(tokens), //you need to unload coffee products
        'report': (tokens) => getReport(), //print all the products in the warehouse as they were passed in the input
        'inspection': (tokens) => letInspect() //print all the products SORTED
    };

    let warehouse = {};
    inputArr.forEach(line => {
        let command = line.split(', ')[0].toLowerCase();
        commandDispatcher[command](line);
    });

    function letInspect() {
        console.log(`>>>>> INSPECTION! <<<<<`);
        Object.keys(warehouse)
            .sort((a, b) => a.localeCompare(b))
            .forEach(brand => {
                console.log(`Brand: ${brand}:`);

                Object.entries(warehouse[brand])
                    .sort((a, b) => b[1].quantity - a[1].quantity)
                    .forEach(coffee => {
                        console.log(`-> ${coffee[0]} -> ${coffee[1].expireDate} -> ${coffee[1].quantity}.`);
                    })
            })
    }

    function getReport() {
        console.log(`>>>>> REPORT! <<<<<`);
        Object.keys(warehouse)
            .forEach(nameOfBrand => {
                console.log(`Brand: ${nameOfBrand}:`);

                Object.keys(warehouse[nameOfBrand])
                    .forEach(coffeeName => {
                        let expireDate = warehouse[nameOfBrand][coffeeName].expireDate;
                        let quantity = warehouse[nameOfBrand][coffeeName].quantity;
                        console.log(`-> ${coffeeName} -> ${expireDate} -> ${quantity}.`);
                    })
            })
    }

    function getOut(line) {
        let [brand, coffeeName, expireDate, quantity] = line.split(', ').splice(1);
        if (warehouse[brand] && warehouse[brand][coffeeName]) {
            if (warehouse[brand][coffeeName].expireDate > expireDate) {
                if (warehouse[brand][coffeeName].quantity >= +quantity) {
                    warehouse[brand][coffeeName].quantity -= +quantity
                }
            }
        }
    }

    function insert(line) {
        let [brand, coffeeName, expireDate, quantity] = line.split(', ').splice(1);
        if (!warehouse[brand]) {
            warehouse[brand] = {};
        }
        if (!warehouse[brand][coffeeName]) {
            warehouse[brand][coffeeName] = {};
            warehouse[brand][coffeeName].expireDate = expireDate;
            warehouse[brand][coffeeName].quantity = +quantity;
        } else {
            if (expireDate > warehouse[brand][coffeeName].expireDate) {
                warehouse[brand][coffeeName].expireDate = expireDate;
                warehouse[brand][coffeeName].quantity = +quantity;
            } else if (expireDate === warehouse[brand][coffeeName].expireDate) {
                warehouse[brand][coffeeName].quantity += +quantity;
            }
        }

    }
}

warehouseMachine([
        "IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
        "IN, Folgers, Black Silk, 2023-03-01, 14",
        "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
        "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
        "IN, Folgers, Black Silk, 2022-01-01, 10",
        "IN, Lavazza, Intenso, 2022-07-19, 20",
        "OUT, Dallmayr, Espresso, 2022-07-19, 5",
        "OUT, Dallmayr, Crema, 2022-07-19, 5",
        "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
        "REPORT",
        "INSPECTION",
    ]
);