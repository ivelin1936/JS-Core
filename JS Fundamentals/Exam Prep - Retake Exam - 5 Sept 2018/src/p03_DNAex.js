function solve(input) {
    let organismsDatabase = {};
    let pattern = /([a-z!@#$?]+)=(\d+)[-]{2}(\d+)[<]{2}([a-z]+)/;

    for (let line of input) {
        if (line === "Stop!") {
            break;
        }
        let matches = line.match(pattern);

        if (matches) {
            let name = matches[1].replace(/([^a-z0-9]+)/gi, '');
            let lengthOfTheName = +matches[2];

            if (name.length === lengthOfTheName) {
                let organism = matches[4];
                let countOfGenes = +matches[3];

                if (!organismsDatabase.hasOwnProperty(organism)) {
                    organismsDatabase[organism] = 0;
                }
                organismsDatabase[organism] += countOfGenes;
            }
        }

    }

    let sortedData = Object.entries(organismsDatabase)
        .sort((org1, org2) => org2[1] - org1[1])
        .map(element => `${element[0]} has genome size of ${element[1]}`)
        .join("\n");

    console.log(sortedData);
}

solve([
    '!@ab?si?di!a@=7--152<<human',
    'b!etu?la@=6--321<<dog',
    '!curtob@acter##ium$=14--230<<dog',
    '!some@thin@g##=9<<human',
    'Stop!'
]);
console.log("*".repeat(40));
solve([
    '=12<<cat',
    '!vi@rus?=2--142',
    '?!cur##viba@cter!!=11--800<<cat',
    '!fre?esia#=7--450<<mouse',
    '@pa!rcuba@cteria$=13--351<<mouse',
    '!richel#ia??=8--900<<human',
    'Stop!'
]);