function solve(arrWithKingdoms, fightingMatrix) {
    const consts = {
        winner: 1.1,
        loser: 0.9
    };

    let kingdomDB = arrWithKingdoms.reduce((database, currentData) => {
        if (!database[currentData.kingdom]) {
            database[currentData.kingdom] = {
                totalWins: 0,
                totalLoses: 0
            };
        }
        if (!database[currentData.kingdom][currentData.general]) {
            database[currentData.kingdom][currentData.general] = {
                army: 0,
                wins: 0,
                loses: 0
            };
        }
        database[currentData.kingdom][currentData.general].army += currentData.army;

        return database;
    }, {});

    fightingMatrix.forEach(data => {
        let attKingdom = data[0];
        let attGeneral = data[1];
        let defKingdom = data[2];
        let defGeneral = data[3];

        if (attKingdom !== defKingdom) {
            let attArmy = kingdomDB[attKingdom][attGeneral].army;
            let defArmy = kingdomDB[defKingdom][defGeneral].army;

            if (attArmy !== defArmy) {
                attArmy > defArmy ?
                    battling(attKingdom, attGeneral, defKingdom, defGeneral) :
                    battling(defKingdom, defGeneral, attKingdom, attGeneral);
            }
        }
    });

    function battling(winnerKingdom, winnerGeneral, loserKingdom, loserGeneral) {
        let winnerArmy = kingdomDB[winnerKingdom][winnerGeneral].army;
        kingdomDB[winnerKingdom][winnerGeneral].wins++;
        kingdomDB[winnerKingdom].totalWins++;
        kingdomDB[winnerKingdom][winnerGeneral].army = Math.floor(winnerArmy * consts.winner);

        let loserArmy = kingdomDB[loserKingdom][loserGeneral].army;
        kingdomDB[loserKingdom][loserGeneral].loses++;
        kingdomDB[loserKingdom].totalLoses++;
        kingdomDB[loserKingdom][loserGeneral].army = Math.floor(loserArmy * consts.loser);
    }

    let sortedKingdoms =
        Object.entries(kingdomDB)
            .sort((k1, k2) => k2[1].totalWins - k1[1].totalWins
                || k1[1].totalLoses - k2[1].totalLoses
                || k1[0] > k2[0]);

    console.log(`Winner: ${sortedKingdoms[0][0]}`);

    let sortedGenerals =
        Object.entries(sortedKingdoms[0][1])
            .splice(2)
            .sort((g1, g2) => g2[1].army - g1[1].army)
            .map(general => {
                let result = `/\\general: ${general[0]}\n`;
                result += `---army: ${general[1].army}\n`;
                result += `---wins: ${general[1].wins}\n`;
                result += `---losses: ${general[1].loses}\n`;

                return result.trim();
            })
            .join('\n');

    console.log(sortedGenerals);
}

solve([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]
);
console.log('*'.repeat(50));
solve([{kingdom: "Stonegate", general: "Ulric", army: 5000},
        {kingdom: "YorkenShire", general: "Quinn", army: 5000},
        {kingdom: "Maiden Way", general: "Berinon", army: 1000}],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Maiden Way", "Berinon", "YorkenShire", "Quinn"]]
);
console.log('*'.repeat(50));
solve([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Doran"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"] ]
);