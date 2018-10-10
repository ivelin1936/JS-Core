function solve(inputArr) {
    let travelInfo = inputArr.reduce((acc, cur) => {
        let [country, town, cost] = cur.split(' > ');
        town = capitalize(town);
        cost = +cost;

        if (!acc[country]) {
            acc[country] = {};
        }
        if (!acc[country][town]) {
            acc[country][town] = cost;
        } else if (acc[country][town] > cost) {
            acc[country][town] = cost;
        }

        return acc;
    }, {});

    let result = Object.keys(travelInfo)
        .sort((a, b) => a.localeCompare(b))
        .map(state => {
            let resultRow = `${state} -> `;

            Object.entries(travelInfo[state])
                .sort((c1, c2) => c1[1] - c2[1])
                .map(e => {
                    resultRow += `${e[0]} -> ${e[1]} `
                });

            // let sortedTownsByPrice = Object.keys(travelInfo[state])
            //     .sort((t1,t2)=>{
            //         "use strict";
            //     return travelInfo[state][t1] - travelInfo[state][t2];
            // });
            //
            // for (let obj of sortedTownsByPrice) {
            //     resultRow += (obj + " -> ");
            //     resultRow += (travelInfo[state][obj]+ " ");
            // }

            return resultRow.trim();
        })
        .join('\n');

    console.log(result);

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
}

solve([
    "Bulgaria > sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"
]);