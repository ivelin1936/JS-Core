function modifyAVG(number) {
    const avg = 5;
    let stringNumber = number.toString();

    let sumOfDigits = function (strNum) {
        let sum = 0;
        for (let i = 0; i < strNum.length; i++) {
            sum += +strNum.split('')[i];
        }
        return sum;
    };

    let appender = (patt = '9') => { stringNumber += patt; };
    let getAverage = (sumOfDigits) => { return sumOfDigits / stringNumber.length; };

    while (getAverage(sumOfDigits(stringNumber)) <= avg) {
        appender();
    }

    console.log(stringNumber);
}

modifyAVG(101);
modifyAVG(5835);


function printModifiedAverage(number) {
    let avg = getAvg(number);
    if (avg > 5) {
        console.log(number);
    } else {
        number += '9';
        printModifiedAverage(number);
    }

    function getAvg(number) {
        number = number.toString();

        let sum = 0;
        let i = 0;
        while(i < number.length) {
            sum += +number[i++];
        }

        return sum / i;
    }
}

printModifiedAverage(101);
printModifiedAverage(5835);