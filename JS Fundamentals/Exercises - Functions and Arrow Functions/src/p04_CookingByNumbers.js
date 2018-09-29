function cookingByNumbers(inputArr) {

    let chop = (num) => { return num / 2 };
    let dice = (num) => { return Math.sqrt(num) };
    let spice = (num) => { return ++num };
    let bake = (num) => { return num * 3 };
    let fillet = (num) => { return num - num * 0.2; };

    let number = +inputArr[0];

    let action = function (operation) {
        switch (operation.toLowerCase()) {
            case 'chop':
                number = chop(number);
                break;
            case 'dice':
                number = dice(number);
                break;
            case 'spice':
                number = spice(number);
                break;
            case 'bake':
                number = bake(number);
                break;
            case 'fillet':
                number = fillet(number);
                break;
        }
    };

    for (let i = 1; i < inputArr.length; i++) {
        action(inputArr[i]);
        console.log(number);
    }
}

cookingByNumbers(['32', 'chop', 'chop', 'chop', 'chop', 'chop']);
cookingByNumbers(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);