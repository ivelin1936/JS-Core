function createRegister(inputArr) {
    let result = [];

    for (let i = 0; i < inputArr.length; i++) {
        let currentHeroData = inputArr[i].split(' / ');
        result.push({
            "name": currentHeroData[0],
            "level": +currentHeroData[1],
            "items": currentHeroData.length > 2 ? currentHeroData[2].split(', ') : []
        })
    }

    return JSON.stringify(result);
}

console.log(createRegister([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
));
console.log();
console.log(createRegister(['Jake / 1000 / Gauss, HolidayGrenade']));


function createRegister2(inputArr) {
    let result = inputArr.map(e => e.split(' / '))
        .map(e => {
            return {
                name: e[0],
                level: +(e[1]),
                items: !e[2] ? [] : e[2].split(', ')
            }
        });

    return JSON.stringify(result);
}

console.log(createRegister2([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
));
console.log();
console.log(createRegister2(['Jake / 1000 / Gauss, HolidayGrenade']));