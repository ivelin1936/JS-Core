function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255)) {
        return undefined; // Red value is invalid
    }
    if (!Number.isInteger(green) || (green < 0) || (green > 255)) {
        return undefined; // Green value is invalid
    }
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255)) {
        return undefined; // Blue value is invalid
    }

    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe('Test rgbToHexColor', function () {
    describe('Tests with non number parameters', () => {
        it(`Should return undefined when first parameter isn't integer`, () => {
            assert.isUndefined(rgbToHexColor('red', 23, 54));
        });
        it(`Should return undefined when second parameter isn't integer`, () => {
            assert.isUndefined(rgbToHexColor(12, 'green', 54));
        });
        it(`Should return undefined when third parameter isn't integer`, () => {
            assert.isUndefined(rgbToHexColor(65, 23, 'blue'));
        });
        it(`Should return undefined when is passed non number parameter`, () => {
            assert.isUndefined(rgbToHexColor(65, [], 123));
        });
    });

    describe('Tests with negative parameters', () => {
        it(`Should return undefined when first parameter is negative`, () => {
            assert.isUndefined(rgbToHexColor(-5, 23, 54));
        });
        it(`Should return undefined when second parameter is negative`, () => {
            assert.isUndefined(rgbToHexColor(5, -23, 54));
        });
        it(`Should return undefined when third parameter is negative`, () => {
            assert.isUndefined(rgbToHexColor(5, 23, -54));
        });
    });

    describe('Tests with parameters biggest than 255', () => {
        it(`Should return undefined when first parameter is biggest then 255`, () => {
            assert.isUndefined(rgbToHexColor(540, 23, 54));
        });
        it(`Should return undefined when second parameter is biggest then 255`, () => {
            assert.isUndefined(rgbToHexColor(54, 2322, 23));
        });
        it(`Should return undefined when third parameter is biggest then 255`, () => {
            assert.isUndefined(rgbToHexColor(54, 23, 540));
        });
    });

    describe('Tests with floating point parameters', () => {
        it(`Should return undefined when first parameter is floating point`, () => {
            assert.isUndefined(rgbToHexColor(5.40, 23, 54));
        });
        it(`Should return undefined when second parameter is floating point`, () => {
            assert.isUndefined(rgbToHexColor(54, 23.22, 23));
        });
        it(`Should return undefined when third parameter is floating point`, () => {
            assert.isUndefined(rgbToHexColor(54, 23, 5.40));
        });
    });

    describe('Tests with valid parameters', () => {
        it('Type of result should be a string', () => {
            let red = 45;
            let green = 135;
            let blue = 200;

            let actualReaultType = typeof rgbToHexColor(red, green, blue);
            let expected = 'string';

            assert.equal(actualReaultType, expected);
        });
        it('should return #000000 on rgbToHexColor(0, 0, 0)', () => {
            expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
        });

        it('should return #FFFFFF on rgbToHexColor(255, 255, 255)', () => {
            expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
        });

        it('should return #002264 on rgbToHexColor(0, 34, 100)', () => {
            expect(rgbToHexColor(0, 34, 100)).to.equal('#002264');
        });
    });
});