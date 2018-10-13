function airPollution(sofiaMap, commandArr) {
    const pmConsts = {
        breezeValue: 15,
        galeValue: 20
    };

    let matrix = sofiaMap.map(row => row.split(' ').map(Number));

    let commandDispatcher = {
        breeze: (rowIndex) => breeze(rowIndex),
        gale: (colIndex) => gale(colIndex),
        smog: (value) => smog(value)
    };

    commandArr.forEach(command => {
        let event = command.split(/\s+/)[0];
        let number = +command.split(/\s+/)[1];

        commandDispatcher[event](number);
    });

    let result = getPollutedBlocks();
    console.log(
        result.length === 0 ?
            'No polluted areas' :
                `Polluted areas: ${result.join(', ')}`);

    function breeze(rowIndex) {
        //index is the row where all column’s value drops by 15 PM
        for (let col = 0; col < matrix[rowIndex].length; col++) {
            let value = matrix[rowIndex][col] - pmConsts.breezeValue;
            matrix[rowIndex][col] = value > 0 ? value : 0;
        }
    }

    function gale(colIndex) {
        //index is the column in all rows where value drops by 20 PM
        for (let row = 0; row < matrix.length; row++) {
            let value = matrix[row][colIndex] - pmConsts.galeValue;
            matrix[row][colIndex] = value > 0 ? value : 0;
        }
    }

    function smog(value) {
        //all blocks in the map increase equally by the given value’s PM
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                matrix[row][col] += value;
            }
        }
    }

    function getPollutedBlocks() {
        let pollutedBlocks = [];
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] >= 50) {
                    pollutedBlocks.push(`[${row}-${col}]`)
                }
            }
        }
        return pollutedBlocks;
    }
}

airPollution(
    [
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
    ],
    ["breeze 1", "gale 2", "smog 25"]
);

airPollution(
    [
        "5 7 3 28 32",
        "41 12 49 30 33",
        "3 16 20 42 12",
        "2 20 10 39 14",
        "7 34 4 27 24",
    ],
    ["smog 11", "gale 3", "breeze 1", "smog 2"]
);

airPollution(
    [
        "5 7 2 14 4",
        "21 14 2 5 3",
        "3 16 7 42 12",
        "2 20 8 39 14",
        "7 34 1 10 24",
    ],
    ["breeze 1", "gale 2", "smog 35"]
);