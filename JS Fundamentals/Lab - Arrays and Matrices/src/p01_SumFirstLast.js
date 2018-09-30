function getSum(arr) {
    return +arr[0] + +arr[arr.length - 1];
}

console.log(getSum(['20', '30', '40']));
console.log(getSum(['5', '10']));


function getSumFirstLast(arr) {

    let sum = (a, b) => {
        return a + b
    };

    return arr.length > 1 ? sum(+arr.shift(),+arr.pop()) : +arr.shift() * 2;
}

console.log(getSumFirstLast(['20', '30', '40']));
console.log(getSumFirstLast(['5', '10']));



function sumFirstLastNum(arr) {

    let sumFirstLastNum = arr => arr.length > 1
        ? +arr.shift() + +arr.pop()
        : +arr.shift() * 2;

    return sumFirstLastNum(arr);
}

console.log(sumFirstLastNum(['20', '30', '40']));
console.log(sumFirstLastNum([5]));