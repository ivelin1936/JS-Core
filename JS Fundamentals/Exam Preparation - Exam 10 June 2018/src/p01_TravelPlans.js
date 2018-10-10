function solve(inputArr) {
    const profesions = {
        specialized: ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'],
        average: ['Driving', 'Managing', 'Fishing', 'Gardening'],
        clumsy: ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing']
    };

    const consts = {
        specialized: `specialized`,
        average: `average`,
        clumsy: `clumsy`,
        splitPattern: ' : ',
        neededGoldForNextTask: 1000,
        minGoldForAcceptWork: 200,
        specializedBonus: 200,
        spendingForCandiesPercent: 0.2,
        clumsyEverySecondPercent: 0.05,
        clumsyEveryThirdPercent: 0.1,
        zero: 0,
        indexZero: 0,
        indexOne: 1,
        two: 2,
        three: 3
    };

    let worker = {
        name: 'Mariyka',
        finalSum: 0,
    };

    let counter = {
        specialized: 0,
        clumsy: 0
    };

    for (let i = 0; i < inputArr.length; i++) {
        let tokens = inputArr[i].split(consts.splitPattern);
        let customer = {
            task: tokens[consts.indexZero],
            gold: +tokens[consts.indexOne]
        };

        checkWork(customer);
    }

    function checkWork(customer) {
        Object.keys(profesions).forEach(key => {
            if (profesions[key].some(t => t === customer.task)) {
                switch (key) {
                    case consts.specialized:
                        workingOnSpecialized(customer);
                        break;
                    case consts.average:
                        workingOnAverage(customer);
                        break;
                    case consts.clumsy:
                        workingOnClumsy(customer);
                        break;
                }
            }
        })
    }

    function workingOnSpecialized(customer) {
        if (customer.gold >= consts.minGoldForAcceptWork) {
            counter.specialized++;
            worker.finalSum += customer.gold - customer.gold * consts.spendingForCandiesPercent;

            if (counter.specialized % consts.two === consts.zero) {
                worker.finalSum += consts.specializedBonus;
            }
        }
    }

    function workingOnAverage(customer) {
        worker.finalSum += customer.gold;
    }

    function workingOnClumsy(customer) {
        counter.clumsy++;
        if (counter.clumsy % consts.two === consts.zero) {
            customer.gold -= customer.gold * consts.clumsyEverySecondPercent;
        } else if (counter.clumsy % consts.three === consts.zero) {
            customer.gold -= customer.gold * consts.clumsyEveryThirdPercent;
        }
        worker.finalSum += customer.gold;
    }

    console.log(`Final sum: ${worker.finalSum.toFixed(consts.two)}`);
    let erned = worker.finalSum - consts.neededGoldForNextTask;
    if (erned < consts.zero) {
        console.log(`Mariyka need to earn ${Math.abs(erned).toFixed(consts.two)} gold more to continue in the next task.`);
    } else {
        console.log(`Mariyka earned ${erned.toFixed(consts.two)} gold more.`);
    }
}

solve(["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"]);
console.log('*'.repeat(40));
solve([
    "Programming : 500", "Driving : 243.55",
    "Acting : 200", "Singing : 100",
    "Cooking : 199", "Hardware maintenance : 800",
    "Gardening : 700", "Programming : 500"
]);