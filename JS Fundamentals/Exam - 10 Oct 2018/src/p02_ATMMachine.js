function solve(input) {
    let atm = [];
    input.forEach(row => {
        if (row.length > 2) {
            console.log(insertMoneyInToATM(row));
        } else if (row.length === 2) {
            console.log(withdrawMoneyFromATM(row));
        } else if (row.length === 1) {
            console.log(serviceReport(row[0]));
        }
    });

    function serviceReport(valueType) {
        let banknoteCount = atm.filter(b => b === valueType).length;
        return `Service Report: Banknotes from ${valueType}$: ${banknoteCount}.`;
    }

    function withdrawMoneyFromATM(tokens) {
        let [currentAccBalance, SumForWithdraw] = tokens;
        let atmMoney = atm.length > 0 ? atm.reduce((a, b) => a + b) : 0;

        if (currentAccBalance < SumForWithdraw) {
            return `Not enough money in your account. Account balance: ${currentAccBalance}$.`;
        } else if (atmMoney < SumForWithdraw) {
            return `ATM machine is out of order!`;
        } else {
            withdraw(+SumForWithdraw);
            return `You get ${SumForWithdraw}$. Account balance: ${currentAccBalance - SumForWithdraw}$. Thank you!`;
        }
    }

    function withdraw(moneyToWithdraw) {
        atm.sort((a,b) => { return b - a });
        while (moneyToWithdraw !== 0) {
            let index = 0;
            for (let i = 0; i < atm.length; i++) {
                if (atm[i] <= moneyToWithdraw) {
                    moneyToWithdraw -= atm[i];
                    index = i;
                    break;
                }
            }
            atm.splice(index, 1);
        }
    }

    function insertMoneyInToATM(incomeMoney) {
        atm.push(...incomeMoney);
        let insertedCash = incomeMoney.reduce((a, b) => a + b, 0);
        let totalCashInATM = atm.reduce((a, b) => a + b, 0);
        return `Service Report: ${insertedCash}$ inserted. Current balance: ${totalCashInATM}$.`;
    }
}

solve([
    [20, 5, 100, 20, 1],
    [457, 25],
    [1],
    [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
    [20, 85],
    [5000, 4500],
]);