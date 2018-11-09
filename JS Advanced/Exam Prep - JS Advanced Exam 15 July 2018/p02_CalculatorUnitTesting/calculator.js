class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide===undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
            throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}

let output = new Calculator();
output.add(10);
output.add("Pesho");
output.add("5");
console.log(output.toString());
output.add(10);
console.log(output.divideNums());
output.add(1);
console.log(output.orderBy());
console.log(output.toString());


/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe('Testing Calculator functionality', function () {

    let calculator;
    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Property expenses Tests', () => {
        it('Calculator should contains property expenses', () => {
            assert.isTrue(calculator.hasOwnProperty('expenses'));
        });
        it('Property expenses should be initialized to an empty array', () => {
            assert.isArray(calculator.expenses);
            assert.isTrue(calculator.expenses.length === 0);
        });
    });

    describe('Function add(data) Tests', () => {
        it('Should add correct element from any type to an expenses', () => {
            let emptyArr = [];
            let emptyObj = {};
            calculator.add(emptyArr);
            calculator.add(emptyObj);
            calculator.add(5);
            calculator.add(-34);
            calculator.add(0.45);
            calculator.add('string');

            assert.isTrue(calculator.expenses.length === 6);
            assert.isTrue(calculator.expenses.indexOf(5) > -1);
            assert.isTrue(calculator.expenses.indexOf(-34) > -1);
            assert.isTrue(calculator.expenses.indexOf(0.45) > -1);
            assert.isTrue(calculator.expenses.indexOf('string') > -1);
            assert.isTrue(calculator.expenses.indexOf(emptyArr) > -1);
            assert.isTrue(calculator.expenses.indexOf(emptyObj) > -1);
        });
    });

    describe('Function divideNums() Tests', () => {
        it('If there are no number in the array should throw Error', () => {
            calculator.add('string');
            calculator.add([]);
            calculator.add({});
            calculator.add('another string');

            expect(function () { calculator.divideNums(); }).to.throw();
        });
        it('With numbers should return correct result', () => {
            calculator.add(10);
            calculator.add(2);
            calculator.add(2);
            calculator.add(3);

            let actual = calculator.divideNums();
            let expected = 10 / 2 / 2 / 3;

            assert.equal(actual, expected);
        });
        it('If have a zero in the array should return actual message', () => {
            calculator.add(10);
            calculator.add(2);
            calculator.add(0);
            calculator.add(3);

            let actual = calculator.divideNums();
            let expected = 'Cannot divide by zero';

            assert.equal(actual, expected);
        });
        it('If array contains different types elements, should divide only the numbers inside', () => {
            calculator.add(10);
            calculator.add('Gosho');
            calculator.add(2);
            calculator.add({});
            calculator.add(3);
            calculator.add([]);

            let actual = calculator.divideNums();
            let expected = 10 / 2 / 3;

            assert.equal(actual, expected);
        });
        it('With negative numbers should working correct', () => {
            calculator.add(10);
            calculator.add(-5);
            calculator.add(-2);

            let actual = calculator.divideNums();
            let expected = 10 / -5 / -2;

            assert.equal(actual, expected);
        });
        it('With floating point numbers should working correct', () => {
            calculator.add(10.23);
            calculator.add(-5.54);
            calculator.add(2.3);

            let actual = calculator.divideNums();
            let expected = 10.23 / -5.54 / 2.3;

            assert.equal(actual, expected);
        })
    });

    describe('Function toString() Tests', () => {
        it('If there are no items in expenses, should return "empty array"', () => {
            let actual = calculator.toString();
            let expected = "empty array";
            assert.equal(actual, expected);
        });
        it('With elements should return them joined with an arrow " -> "', () => {
            calculator.add(5);
            calculator.add('string');
            calculator.add(23.54);
            calculator.add(-13);

            let actual = calculator.toString();
            let expected = `5 -> string -> 23.54 -> -13`;

            assert.equal(actual, expected);
        });
    });

    describe('Function orderBy() Tests', () => {
        it('Sort for numbers', () => {
            calculator.add(10);
            calculator.add(17);
            calculator.add(3);
            calculator.add(11);

            let actual = calculator.orderBy();
            let expected = `3, 10, 11, 17`;

            assert.equal(actual, expected);
        });
        it('Sort for mixed elements', () => {
            calculator.add(10);
            calculator.add('string');
            calculator.add(-3);
            calculator.add('another string');

            let actual = calculator.orderBy();
            let expected = `-3, 10, another string, string`;

            assert.equal(actual, expected);
        });
    });
});
