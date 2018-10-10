function solve(inputArr) {
    let startIndex = +inputArr[0];
    let endIndex = +inputArr[1];
    let replacement = inputArr[2];
    let matchedCountry = inputArr[3].match(/[A-Z][A-Za-z]+[A-Z]/)[0];

    String.prototype.replaceBetween = function (start, end, replacement) {
        return matchedCountry.substring(0, start) +
            replacement +
            matchedCountry.substring(end + 1);
    };

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }

    let country = matchedCountry.replaceBetween(startIndex, endIndex, replacement);

    let numPattern = /([0-9]{3}([.][0-9]+)?)/g;
    let nums = inputArr[3].match(numPattern);
    let town = nums
        .map(n => Math.ceil(n))
        .map(n => String.fromCharCode(n))
        .join('');

    console.log(`${capitalize(country)} => ${capitalize(town)}`)
}

solve([
    "3",
    "5",
    "gar",
    "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"
]);
console.log('*'.repeat(30));
solve([
    "1",
    "4",
    "loveni",
    "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"
]);