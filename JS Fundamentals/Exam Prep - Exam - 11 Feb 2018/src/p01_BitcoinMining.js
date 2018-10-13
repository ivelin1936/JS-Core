function mining(inputArr) {
    const consts = {
        lvPerOneBitcoin: 11949.16,
        lvPerOneGrGold: 67.51,
        thirdDayStealing: 0.7
    };

    let worker = {
        boughtBitcoins: 0,
        firstPurchasedDay: 0,
        leftMoney: 0
    };

    inputArr.map(Number)
        .forEach((minedGold, dayIndex) => {
            let miningDay = dayIndex + 1;
            if (miningDay % 3 === 0) {
                minedGold *= consts.thirdDayStealing;
            }

            worker.leftMoney += minedGold * consts.lvPerOneGrGold;

            if (worker.leftMoney >= consts.lvPerOneBitcoin) {
                buyBitcoins();
                if (!worker.firstPurchasedDay) {
                    worker.firstPurchasedDay = dayIndex + 1;
                }
            }
        });

    function buyBitcoins() {
        let bitcoinCount = parseInt(worker.leftMoney / consts.lvPerOneBitcoin);
        let bill = bitcoinCount * consts.lvPerOneBitcoin;

        worker.boughtBitcoins += bitcoinCount;
        worker.leftMoney -= bill;
    }

    console.log(`Bought bitcoins: ${worker.boughtBitcoins}`);
    if (worker.firstPurchasedDay) {
        console.log(`Day of the first purchased bitcoin: ${worker.firstPurchasedDay}`);
    }
    console.log(`Left money: ${worker.leftMoney.toFixed(2)} lv.`)
}

mining(['100', '200', '300']);
console.log('*'.repeat(40));
mining(['50', '100']);
console.log('*'.repeat(40));
mining(['3124.15', '504.212', '2511.124']);