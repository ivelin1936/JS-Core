function solve(lostFightsCount, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let trashedEquipment = {
        "helmet": 0,
        "sword": 0,
        "shield": 0,
        "armor": 0,
        "expenses": 0
    };

    trashedEquipment.helmet = parseInt(lostFightsCount / 2);
    trashedEquipment.sword = parseInt(lostFightsCount / 3);
    trashedEquipment.shield = parseInt(lostFightsCount / 6);
    trashedEquipment.armor = parseInt(trashedEquipment.shield / 2);

    trashedEquipment.expenses =
        trashedEquipment.armor * armorPrice
        + trashedEquipment.shield * shieldPrice
        + trashedEquipment.sword * swordPrice
        + trashedEquipment.helmet * helmetPrice;

    console.log(`Gladiator expenses: ${trashedEquipment.expenses.toFixed(2)} aureus`);
}

solve(7, 2, 3, 4, 5);
console.log('*'.repeat(30));
solve(23, 12.50, 21.50, 40, 200);