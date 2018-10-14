function solve(input) {
    let atm = [];
    input.forEach(row => {
        let rowLength = row.length;
        if (rowLength > 2) {
            insert(row);
        } else if (rowLength === 2) {
            //If the command array length is 2 -
            // Withdraw money from the ATM.
            withdrawMoney(row);
        } else if (rowLength === 1) {
            //If the command array length is 1 -
            // Report the count of a given banknote in the ATM:
            serviceReport(row[0]);
        }

    });

    function serviceReport(value) {
        let banknoteCount = atm.filter(b => b === value).length;

        console.log(`Service Report: Banknotes from ${value}$: ${banknoteCount}.`);
    }

    function withdrawMoney(tokens) {
        let currentAccBalance = tokens[0];
        let moneyToWithdraw = tokens[1];
        let atmMoney = atm.length > 0 ? atm.reduce((a, b) => a + b) : 0;

        if (currentAccBalance < moneyToWithdraw) {
            console.log(`Not enough money in your account. Account balance: ${currentAccBalance}$.`);
        } else if (atmMoney < moneyToWithdraw) {
            console.log(`ATM machine is out of order!`);
        } else {
            atm.sort((a,b) => { return b - a});
            let totalSum = moneyToWithdraw;
            while (totalSum !== 0) {
                let index = 0;
                for (let i = 0; i < atm.length; i++) {
                    if (atm[i] <= totalSum) {
                        totalSum -= atm[i];
                        index = i;
                        break;
                    }
                }
                atm.splice(index, 1);
            }

            console.log(`You get ${moneyToWithdraw}$. Account balance: ${currentAccBalance - moneyToWithdraw}$. Thank you!`);
        }
    }

    function insert(banknotesArr) {
        banknotesArr.forEach(banknote => atm.push(banknote));

        let insertedCash = banknotesArr.reduce((a, b) => a + b);
        let totalCashInATM = atm.reduce((a, b) => a + b);

        console.log(`Service Report: ${insertedCash}$ inserted. Current balance: ${totalCashInATM}$.`);
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