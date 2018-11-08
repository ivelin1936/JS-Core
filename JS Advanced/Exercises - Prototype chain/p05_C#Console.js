class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
}

module.exports = {Console};

/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe('Console Class functionality tests', function () {

    describe('writeLine() tests with one passed argument', () => {
        it('If single string is passed, the function should return it.', () => {
            //Arrange
            let str = 'someString';
            //Act
            let actual = Console.writeLine(str);
            //Assert
            assert.equal(actual, str);
        });
        it('If single Object is passed, should return the JSON representation of the object.', () => {
            //Arrange
            let obj = {prop: 'someProperty'};
            //Act
            let actual = Console.writeLine(obj);
            let expected = JSON.stringify(obj);
            //Assert
            assert.equal(actual, expected);
        })
    });

    describe('writeLine() tests with more than one passed argument', () => {
        it('If no arguments are passed should throw a TypeError', () => {
            expect(Console.writeLine).to.throw(TypeError);
        });
        it('If multiple arguments are passed, but the first is not a string should throw a TypeError', () => {
            let expected = 'No string format given!';
            try {
                Console.writeLine(5, 'str', {});
            } catch (ex) {
                assert.equal(ex.message, expected);
                assert.equal((ex.constructor === TypeError), true);
            }
        });
        it('If the number of parameters does not correspond to the number of placeholders in the template string - throw a RangeError.', () => {
            let expectedErrorMsg = 'Incorrect amount of parameters given!';
            try {
                Console.writeLine("The sum of {0} and {1} is {2}", 3, 4);
            } catch (ex) {
                assert.equal(ex.message, expectedErrorMsg);
                assert.equal((ex.constructor === RangeError), true);
            }
        });
        it('If the placeholders have indexes not withing the parameters range - throw a RangeError.', () => {
            let expectedErrorMsg = 'Incorrect placeholders given!';
            try {
                Console.writeLine("The sum of {0} and {13} is {2}", 3, 4, 7);
            } catch (ex) {
                assert.equal(ex.message, expectedErrorMsg);
                assert.equal((ex.constructor === RangeError), true);
            }
        });

        it('if multiple arguments are passed and the first is a string, should return correct result', () => {
            let expected = 'The sum of 3 and 4 is 7';
            let actual = Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7);
            assert.equal(actual, expected);
        });
    });
});
