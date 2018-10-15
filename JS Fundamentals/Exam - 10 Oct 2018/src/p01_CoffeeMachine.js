function solve(inputArr) {
    const coffeeMachine = {
        coffee: {
            caffeine: 0.80,
            decaf: 0.90
        },
        tea: 0.80,
        drinkTypeCoffee: 'coffee',
        drinkTypeTea: 'Tea',
        milkPrice: (drinkPrice) => {
            return +(drinkPrice * 0.1).toFixed(1)
        },
        sugarPrice: (quantity) => {
            return quantity > 0 ? 0.10 : 0
        }
    };
    let totalIncome = 0;

    inputArr.forEach(order => {
        let tokens = order.split(', ');
        let coinsInserted = +tokens[0];
        let drink = tokens[1];

        let totalPrice = 0;
        switch (drink) {
            case coffeeMachine.drinkTypeCoffee:
                let coffeeType = tokens[2];
                tokens.length === 5 ?
                    totalPrice += coffeeMachine[drink][coffeeType]
                         + coffeeMachine.milkPrice(coffeeMachine[drink][coffeeType])
                    : totalPrice = coffeeMachine[drink][coffeeType];
                break;
            case coffeeMachine.drinkTypeTea:
                tokens.length === 4 ?
                    totalPrice += coffeeMachine[drink] + coffeeMachine.milkPrice(coffeeMachine[drink])
                    : totalPrice = coffeeMachine[drink];
                break;
        }
        let sugarQuantity = +tokens[tokens.length - 1];
        totalPrice += coffeeMachine.sugarPrice(sugarQuantity);

        console.log(createDrink(drink, coinsInserted, totalPrice));
    });

    function createDrink(type, coinsInserted, totalPrice) {
        if (coinsInserted >= totalPrice) {
            totalIncome += totalPrice;
            return `You ordered ${type}. Price: ${totalPrice.toFixed(2)}$ Change: ${Math.abs(+(totalPrice - coinsInserted)).toFixed(2)}$`;
        } else {
            return `Not enough money for ${type}. Need ${(totalPrice - coinsInserted).toFixed(2)}$ more.`;
        }
    }

    console.log(`Income Report: ${totalIncome.toFixed(2)}$`);
}

solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);
console.log('*'.repeat(40));
solve(['8.00, coffee, decaf, 4', '1.00, tea, 2']);