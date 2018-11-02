function isSymmetric(arr) {
    if (!Array.isArray(arr)) {
        return false; // Non-arrays are non-symmetric
    }

    let reversed = arr.slice(0).reverse(); // Clone and reverse

    let equal = (JSON.stringify(arr) === JSON.stringify(reversed));

    return equal;
}

/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Test isSymmetric", function () {
    it("If is passed an object, should return false", () => {
        assert.isFalse(isSymmetric({}));
    });
    it("If is passed string, should return false", () => {
        assert.isFalse(isSymmetric('string'));
    });
    it("If is passed number, should return false", () => {
        assert.isFalse(isSymmetric(5));
    });
    it("If is passed map, should return false", () => {
        assert.isFalse(isSymmetric(new Map()));
    });
    it("If is passed empty array, should return true", () => {
        let symArr = [];
        assert.isTrue(isSymmetric(symArr));
    });
    it("If is passed symmetric array, should return true", () => {
        let symArr = [1, 2, 'asd', 2, 1];
        assert.isTrue(isSymmetric(symArr));
    });
    it("If is passed non-symmetric array, should return false", () => {
        let inputArr = [1, 2, 'asd', 1, 2];
        assert.isFalse(isSymmetric(inputArr));
    });
    it("Should return false with 1,2,2,1", () => {
        assert.isFalse(isSymmetric(1,2,2,1));
    });
    it("Should return false with [5,'hi',{a:5},new Date(),{X:5},'hi',5]", () => {
        assert.isFalse(isSymmetric([5,'hi',{a:5},new Date(),{X:5},'hi',5]));
    });
    it("Should return true with [5,'hi',{a:5},new Date(),{a:5},'hi',5]", () => {
        assert.isTrue(isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5]));
    });
    it("With multiple consecutive checks, should return correct value", () => {
        assert.isTrue(isSymmetric([1, 2, 1]));
        assert.isTrue(isSymmetric(['a']));
        assert.isTrue(isSymmetric(['some', 1, 'some']));
        assert.isFalse(isSymmetric(['some', 1, 2]));
        assert.isFalse(isSymmetric(['a', 'b']));
        assert.isFalse(isSymmetric([1, 2, 3, 1, 2, 3]));
    });
});
