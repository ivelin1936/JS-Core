function lookupChar(inputStr, index) {
    if (typeof(inputStr) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (inputStr.length <= index || index < 0) {
        return "Incorrect index";
    }

    return inputStr.charAt(index);
}

/** UNIT TESTING */
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("...", function () {
    it("...", function () {

    });

});