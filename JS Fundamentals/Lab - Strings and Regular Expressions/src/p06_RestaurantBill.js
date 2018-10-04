function getBill(inputArr) {
    let products = inputArr
        .filter((p, i) => i % 2 === 0);
    let totalSum = inputArr
        .filter((p, i) => i % 2 !== 0)
        .map(num => +num.trim())
        .reduce((p1, p2) => p1 + p2);

    return `You purchased ${products.join(', ')} for a total sum of ${totalSum}`;
}

console.log(getBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80', 'Lasagna', '5.69']));
console.log(getBill(['Cola', '1.35', 'Pancakes', '2.88']));


function printBillSummary(inputArr) {
    let products = [];
    let totalSum = 0;

    for (let i = 0; i < inputArr.length; i++) {
        let prod = inputArr[i++];
        let price = Number(inputArr[i]);

        products.push(prod);
        totalSum += price;
    }

    console.log(`You purchased ${products.join(', ')} for a total sum of ${totalSum}`);
}

printBillSummary(['Beer Zagorka', '2.65', 'Tripe soup', '7.80', 'Lasagna', '5.69']);
printBillSummary(['Cola', '1.35', 'Pancakes', '2.88']);