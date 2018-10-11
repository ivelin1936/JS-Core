function championShip(input) {
    let champinShipData =
        input.reduce((acc, cur) => {
            let [teamName, pilotName, points] = cur.split(' -> ');
            if (!acc[teamName]) {
                acc[teamName] = {
                    "totalPoints": 0
                };
            }
            if (!acc[teamName][pilotName]) {
                acc[teamName][pilotName] = 0;
            }
            acc[teamName][pilotName] += +points;
            acc[teamName].totalPoints += +points;

            return acc;
        }, {});

    let sortedTeams =
        [...Object.entries(champinShipData)]
            .sort((t1, t2) => t2[1].totalPoints - t1[1].totalPoints)
            .splice(0, 3)
            .map(team => {
                let teamResult = `${team[0]}: ${team[1].totalPoints}` + "\n";

                Object.entries(team[1]).slice(1)
                    .sort((p1, p2) => p2[1] - p1[1])
                    .forEach(p => {
                        teamResult += `-- ${p[0]} -> ${p[1]}` + "\n";
                    });

                return teamResult.trim();
            });

    console.log(sortedTeams.join("\n"));
}

championShip([
    "Red Bull -> Max Verstapen -> 6",
    "Red Bull -> Daniel Ricciardo -> 4",
    "Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8"
]);