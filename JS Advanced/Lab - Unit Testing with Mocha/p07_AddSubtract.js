function createCalculator() {
    let value = 0;
    return {
        add: function (num) {
            value += Number(num);
        },
        subtract: function (num) {
            value -= Number(num);
        },
        get: function () {
            return value;
        }
    }
}

/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Test createCalculator", () => {
    let calculator;
    beforeEach(function(){
        calculator = createCalculator();
    });

    describe('Test return module', () => {
        it('function should return an Object', () => {
            assert.isObject(createCalculator());
        });

        it('Result object should contains 3 properties', () => {
            const propertiesCount = Object.keys(calculator).length;
            assert.equal(propertiesCount, 3);
        });

        it('Result object should contains add, subtract and get as properties', () => {
            const propArr = ['add', 'subtract', 'get'];

            let containsAllProp = true;
            Object.keys(calculator)
                .forEach((k) => {
                    if (propArr.indexOf(k) < 0) {
                        containsAllProp = false;
                    }
                });

            assert.isTrue(containsAllProp);
        });
        it("should have get() function", function () {
            let hasProp = calculator.hasOwnProperty('get');
            expect(hasProp).to.be.true;
        });

        it("should have subtract() function", function(){
            let hasProp = calculator.hasOwnProperty('subtract');
            expect(hasProp).to.be.true;
        });

        it("should have add() function", function(){
            let hasProp = calculator.hasOwnProperty('add');
            expect(hasProp).to.be.true;
        });
    });
    describe('Test functionality with invalid inputs', () => {
        it("should return NaN after (add('hello))", function(){
            calculator.add("hello");
            let value = calculator.get();
            expect(value).to.be.NaN;
        });

        it("should return NaN after (subtract('hello')", function(){
            calculator.subtract('hello');
            let value = calculator.get();
            expect(value).to.be.NaN
        });

        it("should return NaN after add empty input", function(){
            calculator.add();
            let value = calculator.get();
            expect(value).to.be.NaN
        });

        it("should return NaN after subtract of empty input", function(){
            calculator.subtract();
            let value = calculator.get();
            expect(value).to.be.NaN
        })
    });
    describe('Test functionality with valid inputs', () => {
        it("should return 0 for get", function(){
            let value = calculator.get();
            expect(value).to.be.equal(0);
        });

        it('should return 5 on {add "5";}', () => {
            calculator.add("5");
            let value = calculator.get();
            expect(value).to.equal(5);
        });

        it("should return -5 after (add(-5))", function(){
            calculator.add(-5);
            let value = calculator.get();
            expect(value).to.be.equal(-5);
        });

        it("should return 2 after (add(10); subtract('7'); add('-2'); subtract(-1)", function(){
            calculator.add(10);
            calculator.subtract('7');
            calculator.add(-2);
            calculator.subtract('-1');
            let value = calculator.get();
            expect(value).to.be.equal(2);
        });

        it("should return 4.2 after(add(5.3); subtract(1.1))", function(){
            calculator.add(5.3);
            calculator.subtract(1.1);
            let value = calculator.get();
            expect(value).to.be.equal(4.199999999999999);
        })
    });
});