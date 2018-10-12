function solve(portionsOfMeals, seriesOfCommands) {
    let eatenCount = 0;
    const consts = {
        serve: "Serve",
        add: "Add",
        shift: "Shift",
        eat: "Eat",
        consume: "Consume",
        finishServing: "End",
        foodGone: 'The food is gone',
        burp: 'Burp!'
    };

    for (let i = 0; i < seriesOfCommands.length; i++) {
        if (seriesOfCommands[i] === consts.finishServing) {
            break;
        }
        let commandTokens = seriesOfCommands[i].split(/\s+/);
        commandExecutor(commandTokens);
    }

    console.log(
        portionsOfMeals.length === 0 ?
            consts.foodGone :
            `Meals left: ${portionsOfMeals.join(', ')}`
    );
    console.log(`Meals eaten: ${eatenCount}`);

    function commandExecutor(commandTokens) {
        let letServe = () => {
            let lastPortion = portionsOfMeals.pop();
            if (lastPortion) {
                console.log(`${lastPortion} served!`);
            }
        };
        let letEat = () => {
            let firstPortion = portionsOfMeals.shift();
            if (firstPortion) {
                eatenCount++;
                console.log(`${firstPortion} eaten`);
            }
        };
        let addPortion = (portion) => {
            portionsOfMeals.unshift(portion);
        };
        let letConsume = (startIndex, endIndex) => {
            let elementsCount = endIndex - startIndex + 1;
            portionsOfMeals.splice(startIndex, elementsCount);
            eatenCount += elementsCount;
            console.log(consts.burp);
        };
        let letSwap = (firstIndex, secondIndex) => {
            let temp = portionsOfMeals[firstIndex];
            portionsOfMeals[firstIndex] = portionsOfMeals[secondIndex];
            portionsOfMeals[secondIndex] = temp;
        };

        let event = commandTokens.shift();
        switch (event) {
            case consts.serve:
                letServe();
                break;
            case consts.add:
                let portion = commandTokens[0];
                if (portion) {
                    addPortion(portion);
                }
                break;
            case consts.consume:
                if (commandTokens.length === 2) {
                    let startIndex = +commandTokens[0];
                    let endIndex = +commandTokens[1];
                    if (!isNaN(startIndex) && !isNaN(endIndex)) {
                        if (isValidIndex(startIndex) && isValidIndex(endIndex)) {
                            letConsume(startIndex, endIndex);
                        }
                    }
                }
                break;
            case consts.eat:
                letEat();
                break;
            case  consts.shift:
                if (commandTokens.length === 2) {
                    let firstIndex = +commandTokens[0];
                    let secondIndex = +commandTokens[1];
                    if (!isNaN(firstIndex) && !isNaN(secondIndex)) {
                        if (isValidIndex(firstIndex) && isValidIndex(secondIndex)) {
                            letSwap(firstIndex, secondIndex);
                        }
                    }
                }
                break;
        }
    }

    function isValidIndex(index) {
        return index >= 0 && index <= portionsOfMeals.length - 1;
    }
}

solve(
    ['chicken', 'steak', 'eggs'],
    ['Serve', 'Eat', 'End', 'Consume 0 1']);
console.log("*".repeat(40));
solve(
    ['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
    ['Add spaghetti', 'Shift 0 1', 'Consume 1 4', 'End']);
console.log("*".repeat(40));
solve(
    ['carrots', 'apple', 'beet'],
    ['Consume 0 2', 'End',]);