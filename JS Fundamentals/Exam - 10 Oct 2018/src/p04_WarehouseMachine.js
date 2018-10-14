function solve(inputArr) {
    const consts = {
        in: 'IN', //you need to add coffee products
        out: 'OUT', //you need to unload coffee products
        report: 'REPORT', //print all the products in the warehouse as they were passed in the input
        inspection: 'INSPECTION' //print all the products SORTED
    };

    let warehouse = {};
    for (let i = 0; i < inputArr.length; i++) {
        let tokens = inputArr[i].split(', ');
        let command = tokens[0];

        switch (command) {
            case consts.in:
                insert(tokens);
                break;
            case consts.out:
                getOut(tokens);
                break;
            case consts.report:
                getReport();
                break;
            case consts.inspection:
                letInspect();
                break;
        }
    }

    function letInspect() {
        console.log(`>>>>> INSPECTION! <<<<<`);
        let sortedBrands = Object.keys(warehouse).sort((a, b) => a.localeCompare(b));
        for (let brand of sortedBrands) {
                        console.log(`Brand: ${brand}:`);

                        Object.entries(warehouse[brand])
                        .sort((a, b) => b[1].quantity - a[1].quantity)
                        .forEach(pair => {
                        let coffeeName = pair[0];
                        let expireDate = pair[1].expireDate;
                        let quantity = pair[1].quantity;
                        console.log(`-> ${coffeeName} -> ${expireDate} -> ${quantity}.`);
                })
        }
    }

    function getReport() {
        console.log(`>>>>> REPORT! <<<<<`);
        Object.keys(warehouse).forEach(nameOfBrand => {
            console.log(`Brand: ${nameOfBrand}:`);

            Object.keys(warehouse[nameOfBrand]).forEach(coffeeName => {
                let expireDate = warehouse[nameOfBrand][coffeeName].expireDate;
                let quantity = warehouse[nameOfBrand][coffeeName].quantity;
                console.log(`-> ${coffeeName} -> ${expireDate} -> ${quantity}.`);
            })
        })
    }

    function getOut(tokens) {
        let brand = tokens[1];
        let coffeeName = tokens[2];
        let expireDate = tokens[3];
        let quantity = +tokens[4];

        if (warehouse[brand] && warehouse[brand][coffeeName]) {
            //TODO - check comparing Dates
            if (warehouse[brand][coffeeName].expireDate > expireDate) {
                if (warehouse[brand][coffeeName].quantity >= quantity) {
                    warehouse[brand][coffeeName].quantity -= quantity
                }
            }
        }
    }

    function insert(tokens) {
        let brand = tokens[1];
        let coffeeName = tokens[2];
        let expireDate = tokens[3];
        let quantity = +tokens[4];

        if (!warehouse[brand]) {
            warehouse[brand] = {};
        }
        if (!warehouse[brand][coffeeName]) {
            warehouse[brand][coffeeName] = {};
            warehouse[brand][coffeeName].expireDate = expireDate;
            warehouse[brand][coffeeName].quantity = quantity;
        } else {
            //TODO - check comparing Dates
            if (expireDate > warehouse[brand][coffeeName].expireDate) {
                warehouse[brand][coffeeName].expireDate = expireDate;
                warehouse[brand][coffeeName].quantity = quantity;
            } else if (expireDate === warehouse[brand][coffeeName].expireDate) {
                warehouse[brand][coffeeName].quantity += quantity;
            }
        }

    }
}

solve([
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