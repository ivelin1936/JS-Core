function treasureLocator(cordArr) {
    let islands = {
        'Tuvalu': {'x1': 1, 'x2': 3, 'y1': 1, 'y2': 3},
        'Tokelau': {'x1': 8, 'x2': 9, 'y1': 0, 'y2': 1},
        'Samoa': {'x1': 5, 'x2': 7, 'y1': 3, 'y2': 6},
        'Tonga': {'x1': 0, 'x2': 2, 'y1': 6, 'y2': 8},
        'Cook': {'x1': 4, 'x2': 9, 'y1': 7, 'y2': 8}
    };

    let checkCords = (x, y) => {
        for (let island in islands) {
            let x1 = islands[island]['x1'];
            let x2 = islands[island]['x2'];
            let y1 = islands[island]['y1'];
            let y2 = islands[island]['y2'];

            if (x >= x1 && x <= x2) {
                if (y >= y1 && y <= y2) {
                    return island;
                }
            }
        }
        return 'On the bottom of the ocean';
    };

    for (let i = 0; i < cordArr.length; i += 2) {
        console.log(checkCords(cordArr[i], cordArr[i + 1]));
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);
treasureLocator([6, 4]);


function printTreasureLocation(params) {
    for (let i = 0; i < params.length; i++) {
        let col = params[i++];
        let row = params[i];

        let location = (row >= 0 && row <= 1 && col >= 8 && col <= 9) ? 'Tokelau'
            : (row >= 1 && row <= 3 && col >= 1 && col <= 3) ? 'Tuvalu'
                : (row >= 3 && row <= 6 && col >= 5 && col <= 7) ? 'Samoa'
                    : (row >= 6 && row <= 8 && col >= 0 && col <= 2) ? 'Tonga'
                        : (row >= 7 && row <= 8 && col >= 4 && col <= 9) ? 'Cook'
                            : 'On the bottom of the ocean';

        console.log(location);
    }
}

printTreasureLocation([4, 2, 1.5, 6.5, 1, 3]);
console.log();
printTreasureLocation([6, 4]);