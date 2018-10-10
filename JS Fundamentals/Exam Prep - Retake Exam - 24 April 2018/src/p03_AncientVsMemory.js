function solve(input) {
    const strStart = '32656 19759 32763 0';

    let nums = input.join(' ');
    let arr = nums.split(strStart);

    let words = [];
    arr.filter(e => e !== '')
        .forEach(element => {
            if (+element[1] !== 0) {
                element = element.split(' ')
                    .filter(e => e !== '')
                    .map(e => +e.trim());

                let codesCount = +element.splice(0, 2)[0];
                element = element.splice(0, codesCount);

                words.push(decodeWord(element))
            }
        });

    function decodeWord(element) {
        return element
            .map(e => String.fromCharCode(e))
            .join('');
    }

    return words.join('\n');
}

console.log(solve([
    `32656 19759 32763 0 5 0 80 101 115 104 111 0 0 0 0 0 0 0 0 0 0 0`,
    `0 32656 19759 32763 0 7 0 83 111 102 116 117 110 105 0 0 0 0 0 0 0 0`
]));

console.log(solve([
    `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0`,
    `5 0 71 111 115 104 111 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 4 0`,
    `75 105 114 111 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 8 0 86 101`,
    `114 111 110 105 107 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`
]));