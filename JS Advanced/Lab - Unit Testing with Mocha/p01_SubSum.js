function subsum(arr, startIndex, endIndex) {
    if (!Array.isArray(arr)) {
        return NaN;
    }
    if (startIndex < 0) {
        startIndex = 0;
    }
    if (endIndex > arr.length - 1) {
        endIndex = arr.length - 1;
    }

    let sum = 0;
    for (let i = startIndex; i <= endIndex; i++) {
        sum += +arr[i];
    }
    return sum;
}

console.log(subsum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subsum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(subsum([10, 'twenty', 30, 40], 0, 2));
console.log(subsum([], 1, 2));
console.log(subsum('text', 0, 2));

// module.exports = {subsum};
// let subsum = require('../p01_SubSum').subsum;

/** Unit testing */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Tests subSum", function () {
    it("with valid input should return correct result", () => {
        let array = [10, 20, 30, 40, 50, 60];
        let startIndex = 3;
        let endIndex = 300;

        let actual = subsum(array, startIndex, endIndex);
        let expected = 150;

        assert.equal(actual, expected)
    });
    it("with valid input with floating point numbers should return correct result", () => {
        let array = [1.1, 2.2, 3.3, 4.4, 5.5];
        let startIndex = -3;
        let endIndex = 1;

        let actual = subsum(array, startIndex, endIndex);
        let expected = 3.3;

        assert.closeTo(actual, expected, 0.001);
    });
    it("with string into the array should return NaN", () => {
        let array = [10, 'twenty', 30, 40];
        let startIndex = 0;
        let endIndex = 2;

        let actual = subsum(array, startIndex, endIndex);

        assert.isNaN(actual)
    });
    it("with empty array should return 0", () => {
        let array = [];
        let startIndex = 1;
        let endIndex = 2;

        let actual = subsum(array, startIndex, endIndex);
        let expected = 0;

        assert.equal(actual, expected)
    });
    it("with string first parameter should return NaN", () => {
        let array = 'text';
        let startIndex = 0;
        let endIndex = 2;

        let actual = subsum(array, startIndex, endIndex);

        assert.isNaN(actual)
    });
});