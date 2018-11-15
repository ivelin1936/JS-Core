let expect = require('chai').expect;
let assert = require('chai').assert;

let SubscriptionCard = require('./SubscriptionCard');

describe('SubscriptionCard Tests', function () {
    let card ;
    beforeEach(() => {
        card  = new SubscriptionCard('Pesho', 'Petrov', '00000000');
    });

    describe('Test card declared properties', () => {
        it('instance test', () => {
            assert.isTrue(card !== undefined);
            assert.isTrue(card instanceof SubscriptionCard);
        });

        it('firstName should be private property and use accessor', () => {
            assert.equal(card.firstName, 'Pesho');
        });

        it('Once declared firstName must not be changed', () => {
            card.firstName = 'Tosho';
            assert.equal(card.firstName, 'Pesho');
        });

        it('lastName should be private property and use accessor', () => {
            assert.equal(card.lastName, 'Petrov');
        });

        it('Once declared lastName must not be changed', () => {
            card.lastName = 'Toshov';
            assert.equal(card.lastName, 'Petrov');
        });

        it('SSN should be private property and use accessor', () => {
            assert.equal(card.SSN, '00000000');
        });

        it('Once declared SSN must not be changed', () => {
            card.SSN = '321432423432';
            assert.equal(card.SSN, '00000000');
        });

        it('Subscriptions should be declared as empty array', () => {
            assert.isArray(card._subscriptions);
            assert.equal(card._subscriptions.length, 0);
        });

        it('Blocked should be declared default false', () => {
            assert.isFalse(card.isBlocked);
        });

        it('Blocked should be access only from accessor isBlocked', () => {
            assert.isUndefined(card.blocked);
            assert.isFalse(card.isBlocked)
        });
    });

    describe('Test block and unblock functions', () => {
        it('block function should blocking the card and set blocked property on true', () => {
            card.block();
            assert.isTrue(card.isBlocked);
        });

        it('unblock function should unblocking the card and set blocked property on false', () => {
            card.block();
            card.unblock();
            assert.isFalse(card.isBlocked);
        });
    });

    describe('Test addSubscription function', () => {
        it('Test if addSubscription function adding correct', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));

            assert.isTrue(card._subscriptions.length === 2);
        });

        it('Test if addSubscription function adding an object', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            assert.isObject(card._subscriptions[0]);
            assert.isObject(card._subscriptions[1]);
        });

        it('Test addSubscription function added object', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            let obj = card._subscriptions[0];

            assert.isTrue(obj.hasOwnProperty('line'));
            assert.isTrue(obj.hasOwnProperty('startDate'));
            assert.isTrue(obj.hasOwnProperty('endDate'));
        });

        it('Test addSubscription function added object', () => {
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            let obj = card._subscriptions[0];

            assert.isTrue(obj.hasOwnProperty('line'));
            assert.isTrue(obj.hasOwnProperty('startDate'));
            assert.isTrue(obj.hasOwnProperty('endDate'));
        });

        it('Test added object into subscriptions', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            let obj = card._subscriptions[0];

            assert.isString(obj.line);
            assert.isTrue(obj.startDate instanceof Date);
            assert.isTrue(obj.endDate instanceof Date);
        });
    });

    describe('Test isValid function', () => {
        it('If the card is blocked, isValid should return false', () => {
            card.block();
            assert.isFalse(card.isValid('120', new Date('2018-04-22')));
        });

        it('isValid should return true with correct input data', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.isTrue(card.isValid('120', new Date('2018-04-22')));
        });

        it('isValid should return true with correct input data with "*"', () => {
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.isTrue(card.isValid('120', new Date('2018-04-22')));
        });

        it('isValid should return false if not match is found', () => {
            card.addSubscription('121', new Date('2018-04-22'), new Date('2018-05-21'));
            card.addSubscription('113', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.isFalse(card.isValid('120', new Date('2018-04-22')));
        });

        it('isValid should return false with start date > than passed date', () => {
            card.addSubscription('120', new Date('2018-04-23'), new Date('2018-05-21'));
            assert.isFalse(card.isValid('120', new Date('2018-04-22')));
        });

        it('isValid should return false with end date < than passed date', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-03-21'));
            assert.isFalse(card.isValid('120', new Date('2018-04-22')));
        });
    });
});