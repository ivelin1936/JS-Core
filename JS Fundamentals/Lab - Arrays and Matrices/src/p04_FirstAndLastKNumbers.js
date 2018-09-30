function firstAndLastKElements(inputArr) {
    let k = +inputArr[0];

    return inputArr.slice(1, k + 1).join(' ')
        + '\n'
        + inputArr.slice(-k).join(' ');
}

console.log(firstAndLastKElements([2, 7, 8, 9]));
console.log();
console.log(firstAndLastKElements([3, 6, 7, 8, 9]));


/* Arrow solution */
let arrowFirstLastK = arr => console.log(
    arr.slice(1, arr[0] + 1).join(' ') + '\n' + arr.slice(arr[0] * -1).join(' ')
);

/* Function solution */
function funcFirstLastK(arr) {
    let k = arr.shift();

    console.log(arr.slice(0, k).join(' '));
    console.log(arr.slice(k * -1).join(' '));

}

arrowFirstLastK([2, 7, 8, 9]);
console.log();
funcFirstLastK([2, 7, 8, 9]);
console.log();
arrowFirstLastK([3, 6, 7, 8, 9]);
console.log();
funcFirstLastK([3, 6, 7, 8, 9]);