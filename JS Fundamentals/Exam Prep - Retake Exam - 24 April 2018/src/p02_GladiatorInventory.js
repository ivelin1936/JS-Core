function solve(inputArr) {
    let inventory = inputArr.shift().split(/\s+/);

    inputArr.forEach(line => {
        let tokens = line.split(/\s+/);
        if (tokens.length > 1) {
            executeCommand(tokens[0], tokens[1]);
        }
    });

    function executeCommand(command, equipment) {
        if (command === 'Buy') {
            if (!inventory.includes(equipment)) {
                inventory.push(equipment);
            }
        } else if (command === 'Trash') {
            let index = inventory.indexOf(equipment);
            if (index !== -1) {
                inventory.splice(index, 1);
            }
        } else if (command === 'Repair') {
            let index = inventory.indexOf(equipment);
            if (index !== -1) {
                let repaired = inventory.splice(index, 1)[0];
                inventory.push(repaired);
            }
        } else if (command === 'Upgrade') {
            let upgrade = equipment.split('-')[1];
            let item = equipment.split('-')[0];
            let index = inventory.indexOf(item);
            if (index !== -1) {
                inventory.splice(++index, 0, `${item}:${upgrade}`)
            }
        }
    }

    console.log(inventory.join(' '));
}

solve([
    `SWORD Shield Spear`,
    `Buy Bag`,
    `Trash Shield`,
    `Repair Spear`,
    `Upgrade SWORD-Steel`,
    `Fight!`
]);
console.log('*'.repeat(30));
solve([
    `SWORD Shield Spear`,
    `Trash Bow`,
    `Repair Shield`,
    `Upgrade Helmet-V`,
    `Fight!`
]);