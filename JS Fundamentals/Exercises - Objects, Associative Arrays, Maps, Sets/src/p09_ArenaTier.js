function arena(input) {

    let gladiatorsPool = new Map();

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "Ave Cesar") {
            break;
        }

        if (input[i].match(' vs ')) {
            let [firstGladiator, secondGladiator] = input[i].split(' vs ');
            if (isPresent(firstGladiator) && isPresent(secondGladiator)) {
                gladiatorsDuel(firstGladiator, secondGladiator);
            }

        } else {
            let [name, technique, skill] = input[i].split(' -> ');
            if (isPresent(name)) {
                addTechniqueOrUpdateSkill(name, technique, +skill);
            } else {
                addGladiatorToPool(name, technique, +skill);
            }
        }
    }

    printResult();

    function printResult() {
        /*print the gladiators, ordered by total skill in desecending order,
        then ordered by name in ascending order.
        Foreach gladiator print their technique and skill, ordered desecending,
        then ordered by technique name in ascending order*/

        let compareByTotalSkillPt = (name1, name2) => {
            return getTotalSkillPoints(name1) - getTotalSkillPoints(name2);
        };

        let compareByName = (aName, bName) => {
            if (aName < bName) {
                return -1;
            } else if (bName > aName) {
                return 1;
            }
            return 0;
        };

        console.log([...gladiatorsPool]
            .sort((g1, g2) =>
                compareByTotalSkillPt(g2[0], g1[0]) || compareByName(g1[0], g2[0]))
            .map(g => {
                let result = `${g[0]}: ${getTotalSkillPoints(g[0])} skill` + "\n";

                Array.from(Object.entries(g[1])
                    .filter((e, i, a) => i > 0))
                    .sort((a1, a2) => a2[1] - a1[1] || a1[0] > a2[0])
                    .forEach(e =>
                        result += `- ${e[0]} <!> ${e[1]}` + "\n");

                return result.trim();
            })
            .join('\n')
        );
    }

    function gladiatorsDuel(firstGladiator, secondGladiator) {
        if (gotAtLeastOneTechniqueAtCommon(firstGladiator, secondGladiator)) {
            let firstTotalSkillPoints = getTotalSkillPoints(firstGladiator);
            let secondTotalSkillPoints = getTotalSkillPoints(secondGladiator);

            firstTotalSkillPoints > secondTotalSkillPoints ?
                gladiatorsPool.delete(secondGladiator) :
                gladiatorsPool.delete(firstGladiator);
        }
    }

    function getTotalSkillPoints(name) {
        return Object.values(gladiatorsPool.get(name))
            .filter(item => !isNaN(item))
            .reduce((a, b) => a + b)
    }

    function gotAtLeastOneTechniqueAtCommon(firstGladiator, secondGladiator) {
        let firstGlad = gladiatorsPool.get(firstGladiator);
        let secondGlad = gladiatorsPool.get(secondGladiator);

        let firstGladiatorSkills = Object.keys(firstGlad).filter(s => s !== 'name');
        let secondGladiatorSkills = Object.keys(secondGlad).filter(s => s !== 'name');

        for (let i = 0; i < firstGladiatorSkills.length; i++) {
            for (let j = 0; j < secondGladiatorSkills.length; j++) {
                if (firstGladiatorSkills[i] === secondGladiatorSkills[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function addTechniqueOrUpdateSkill(name, technique, skill) {
        if (!gladiatorsPool.get(name).hasOwnProperty(technique)) {
            gladiatorsPool.get(name)[technique] = skill;
        } else {
            if (gladiatorsPool.get(name)[technique] < skill) {
                gladiatorsPool.get(name)[technique] = skill
            }
        }
    }

    function isPresent(gladiatorName) {
        return gladiatorsPool.has(gladiatorName);
    }

    function addGladiatorToPool(name, technique, skill) {
        let gladiator = {};
        gladiator['name'] = name;
        gladiator[technique] = skill;

        gladiatorsPool.set(name, gladiator);
    }
}

arena([
    "Pesho -> BattleCry -> 400",
    "Gosho -> PowerPunch -> 300",
    "Stamat -> Duck -> 200",
    "Stamat -> Tiger -> 250",
    "Ave Cesar"
]);
console.log('*'.repeat(50));
arena([
    "Pesho -> Duck -> 400",
    "Julius -> Shield -> 150",
    "Gladius -> Heal -> 200",
    "Gladius -> Support -> 250",
    "Gladius -> Shield -> 250",
    "Pesho vs Gladius",
    "Gladius vs Julius",
    "Gladius vs Gosho",
    "Ave Cesar"
]);