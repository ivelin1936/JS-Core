function solve(inputArr) {
    const prices = {
        coffee: {
            caffeine: 0.80,
            decaf: 0.90
        },
        tea: 0.80
    };

    let totalErnedMoney = 0;

    inputArr.forEach(order => {
        let tokens = order.split(', ');
        let coinsInserted = +tokens[0];
        let type = tokens[1];
        let sugarQuantity = +tokens[tokens.length - 1];

        if (type === 'coffee') {
            let coffeeType = tokens[2];
            if (tokens.length === 5) {
                //TODO -> have milk
                let totalPrice = 0;
                let coffeePrice = prices[type][coffeeType];
                let milkPrice = +(coffeePrice * 0.1).toFixed(1);
                totalPrice += coffeePrice + milkPrice;
                if (sugarQuantity) {
                    totalPrice += 0.10;
                }
                createDrink(type, coinsInserted, totalPrice);
            } else {
                //TODO - coffee without milk
                let totalPrice = prices[type][coffeeType];
                if (sugarQuantity) {
                    totalPrice += 0.10;
                }
                createDrink(type, coinsInserted, totalPrice);
            }
        } else if (type === 'tea') {
            if (tokens.length === 4) {
                //TODO - tea with milk
                let totalPrice = 0;
                let drinkPrice = prices[type];
                let milkPrice = +(drinkPrice * 0.1).toFixed(1);
                totalPrice += drinkPrice + milkPrice;
                if (sugarQuantity) {
                    totalPrice += 0.10;
                }
                createDrink(type, coinsInserted, totalPrice);
            } else {
                //TODO - tea without milk
                let totalPrice = prices[type];
                if (sugarQuantity) {
                    totalPrice += 0.10;
                }
                createDrink(type, coinsInserted, totalPrice);
            }
        }
    });

    function createDrink(type, coinsInserted, totalPrice) {
        if (coinsInserted >= totalPrice) {
            console.log(`You ordered ${type}. Price: ${totalPrice.toFixed(2)}$ Change: ${Math.abs(+(totalPrice - coinsInserted)).toFixed(2)}$`);
            totalErnedMoney += totalPrice;
        } else {
            console.log(`Not enough money for ${type}. Need ${(totalPrice - coinsInserted).toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${totalErnedMoney.toFixed(2)}$`);
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);
console.log('*'.repeat(40));
solve(['8.00, coffee, decaf, 4', '1.00, tea, 2']);