function f1Race(raceInput) {
    const consts = {
        join: "Join",
        crash: "Crash",
        pit: "Pit",
        overtake: "Overtake",
        regexSplit: /\s+/
    };
    
    let race = raceInput
        .splice(0, 1)[0]
        .split(consts.regexSplit)
        .map(p => p.trim());

    raceInput.forEach(line => {
        let event = line.split(consts.regexSplit)[0];
        let pilotName = line.split(consts.regexSplit)[1];

        action(event, pilotName)
    });

    function action(event, pilotName) {
        let pilotIndex = race.indexOf(pilotName);

        switch (event) {
            case consts.join:
                if (!race.includes(pilotName)) {
                    race.push(pilotName);
                }
                break;
            case consts.crash:
                if (pilotIndex > -1) {
                    race.splice(pilotIndex, 1);
                }
                break;
            case consts.pit:
                if (pilotIndex > -1 && pilotIndex !== race.length - 1) {
                    race.splice(pilotIndex, 1);
                    race.splice(pilotIndex + 1, 0, pilotName);
                }
                break;
            case consts.overtake:
                if (pilotIndex > 0) {
                    race.splice(pilotIndex, 1);
                    race.splice(pilotIndex - 1, 0, pilotName);
                }
                break;
        }
    }

    console.log(race.join(' ~ '));
}

f1Race([
    "Vetel Hamilton Slavi",
    "Pit Hamilton",
    "Overtake Vetel",
    "Crash Slavi"
]);
console.log('*'.repeat(30));
f1Race([
    "Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"
]);