function findEvenElements(inputArr) {
    let filterArr =
        inputArr
            .filter((element, index) => index % 2 === 0)
            .join(' ');

    return filterArr;
}

console.log(findEvenElements(['20', '30', '40']));
console.log(findEvenElements(['5', '10']));