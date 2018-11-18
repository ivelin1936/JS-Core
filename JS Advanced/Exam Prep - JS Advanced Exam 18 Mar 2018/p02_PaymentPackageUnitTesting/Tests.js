let PaymentPackage = require('./PaymentPackage.js');

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('PaymentPackage class Tests', function () {

    let paymentPackage;
    beforeEach(() => {
        let name = 'SomeName';
        let value = 50;
        paymentPackage = new PaymentPackage(name, value);
    });

    describe('Test instantiated object properties', () => {
        describe('Test name property', () => {
            it('If name is not a string, should throw', () => {
                expect(function () { paymentPackage.name = 34; }).to.throw();
                expect(function () { paymentPackage.name = []; }).to.throw();
                expect(function () { paymentPackage.name = {}; }).to.throw();
                expect(function () { paymentPackage.name = -13.13; }).to.throw();
            });
            it('If name is empty string, should throw', () => {
                expect(function () { paymentPackage.name = ''; }).to.throw();
            });
            it('If name is correct, should be set', () => {
                paymentPackage.name = 'Nameeee';
                assert.equal(paymentPackage.name, 'Nameeee');
            })
        });

        describe('Test value property', () => {
            it('If value is not a number, should throw', () => {
                expect(function () { paymentPackage.value = 'string'; }).to.throw();
                expect(function () { paymentPackage.value = []; }).to.throw();
                expect(function () { paymentPackage.value = {}; }).to.throw();
                expect(function () { paymentPackage.value = new Map(); }).to.throw();
            });
            it('If value is negative, should throw', () => {
                expect(function () { paymentPackage.value = -1; }).to.throw();
                expect(function () { paymentPackage.value = -130; }).to.throw();
                expect(function () { paymentPackage.value = -89.97; }).to.throw();
            });
            it('If value is correct, should be set', () => {
                paymentPackage.value = 100;
                assert.equal(paymentPackage.value, 100);
            })
        });

        describe('Test VAT property', () => {
            it('VAT should have default value 20', () => {
                assert.equal(paymentPackage.VAT, 20);
            });
            it('If VAT is not a number, should throw', () => {
                expect(function () { paymentPackage.VAT = 'string'; }).to.throw();
                expect(function () { paymentPackage.VAT = []; }).to.throw();
                expect(function () { paymentPackage.VAT = {}; }).to.throw();
                expect(function () { paymentPackage.VAT = new Map(); }).to.throw();
            });
            it('If VAT is negative, should throw', () => {
                expect(function () { paymentPackage.VAT = -1; }).to.throw();
                expect(function () { paymentPackage.VAT = -130; }).to.throw();
                expect(function () { paymentPackage.VAT = -89.97; }).to.throw();
            });
            it('If VAT is correct, should be set', () => {
                paymentPackage.VAT = 99;
                assert.equal(paymentPackage.VAT, 99);
            })
        });

        describe('Test active property', () => {
            it('Active should be default true', () => {
                assert.isTrue(paymentPackage.active);
            });
        });
    });

    describe('...', () => {
        it('...', () => {
            //TODO...
        });
    });
});