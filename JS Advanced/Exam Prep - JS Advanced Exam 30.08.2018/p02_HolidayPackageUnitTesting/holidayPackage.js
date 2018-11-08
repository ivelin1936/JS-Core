class HolidayPackage {
    constructor(destination, season) {
        this.vacationers = [];
        this.destination = destination;
        this.season = season;
        this.insuranceIncluded = false; // Default value
    }

    showVacationers() {
        if (this.vacationers.length > 0)
            return "Vacationers:\n" + this.vacationers.join("\n");
        else
            return "No vacationers are added yet";
    }

    addVacationer(vacationerName) {
        if (typeof vacationerName !== "string" || vacationerName === ' ') {
            throw new Error("Vacationer name must be a non-empty string");
        }
        if (vacationerName.split(" ").length !== 2) {
            throw new Error("Name must consist of first name and last name");
        }
        this.vacationers.push(vacationerName);
    }

    get insuranceIncluded() {
        return this._insuranceIncluded;
    }

    set insuranceIncluded(insurance) {
        if (typeof insurance !== 'boolean') {
            throw new Error("Insurance status must be a boolean");
        }
        this._insuranceIncluded = insurance;
    }

    generateHolidayPackage() {
        if (this.vacationers.length < 1) {
            throw new Error("There must be at least 1 vacationer added");
        }
        let totalPrice = this.vacationers.length * 400;

        if (this.season === "Summer" || this.season === "Winter") {
            totalPrice += 200;
        }

        totalPrice += this.insuranceIncluded === true ? 100 : 0;

        return "Holiday Package Generated\n" +
            "Destination: " + this.destination + "\n" +
            this.showVacationers() + "\n" +
            "Price: " + totalPrice;
    }
}

/** Unit Tests */
let expect = require('chai').expect;
let assert = require('chai').assert;

describe('HolidayPackage class Tests', function () {
    let holidayPackage;
    beforeEach(function () {
        holidayPackage = new HolidayPackage('Plovdiv', 'Summer');
    });

    //Not needed for Judge
    describe('Test the instantiated holidayPackage', () => {
        //Not needed for Judge
        it('Class need be instantiated with two string parameters', () => {
            assert.isNotNull(holidayPackage);
        });
        //Not needed for Judge
        it('Class should instantiated with two string parameters', () => {
            assert.equal(typeof holidayPackage.destination, 'string');
            assert.equal(typeof holidayPackage.season, 'string');
        });
    });
    //Not needed for Judge
    describe('Test insuranceIncluded', () => {
        //Not needed for Judge
        it('...', () => {
            assert.isBoolean(holidayPackage.insuranceIncluded);
        });
        //Not needed for Judge
        it('InsuranceIncluded with passed not boolean should throw Error', () => {
            let passedParam = 'true';
            expect(function () { holidayPackage.insuranceIncluded = passedParam; }).to.throw();
        });
        //Not needed for Judge
        it('InsuranceIncluded should return false', () => {
            assert.isFalse(holidayPackage.insuranceIncluded);
        });
        //Not needed for Judge
        it('InsuranceIncluded with passed true should return true', () => {
            holidayPackage.insuranceIncluded = true;
            assert.isTrue(holidayPackage.insuranceIncluded);
        });
    });

    describe('Test showVacationers() function', () => {
        it('If there aren’t any vacationers, should returns a corresponding message.', () => {
            let actual = holidayPackage.showVacationers();
            let expected = "No vacationers are added yet";
            assert.equal(actual, expected);
        });

        it('If there are any vacationers, should returns a corresponding message.', () => {
            let vacationer1 = 'Gosho Someone';
            let vacationer2 = 'Aasd Someone';
            holidayPackage.addVacationer(vacationer1);
            holidayPackage.addVacationer(vacationer2);

            let actual = holidayPackage.showVacationers();
            let expected = "Vacationers:\n" + "Gosho Someone\nAasd Someone";
            assert.equal(actual, expected);
        });
    });

    describe('Test function addVacationer', () => {
        it('Test if vacationers property is an array', () => {
            assert(Array.isArray(holidayPackage.vacationers));
        });

        it('In case of an valid name, the function should add vacationer', () => {
            holidayPackage.addVacationer('Someone Someonechev');
            let actual = holidayPackage.vacationers.length;
            let expected = 1;
            assert.equal(actual, expected);
        });

        it('In case of an invalid name, the function throws an error', () => {
            expect(function () { holidayPackage.addVacationer('Some'); }).to.throw();
        });

        it('In case of an invalid name - not a string, the function throws an error', () => {
            expect(function () { holidayPackage.addVacationer(123); }).to.throw();
        });

        it('In case of an invalid empty name, the function throws an error', () => {
            expect(function () { holidayPackage.addVacationer(' '); }).to.throw();
        });

        it('In case of passed three names, the function throws an error', () => {
            expect(function () { holidayPackage.addVacationer('First Second Third'); }).to.throw();
        });
    });

    describe('Test function generateHolidayPackage()', () => {
        it('With no vacationers should throw error', () => {
            expect(function () { holidayPackage.generateHolidayPackage(); }).to.throw();
        });

        it('With one vacationers without insurance and out of Summer and Winter should return 400 total price', () => {
            let vacationer = 'Someone Someone';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.season = 'Esentaaa';

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 400;

            assert.equal(actual, expect);
        });

        it('With one vacationers with insurance and out of Summer and Winter should return 500 total price', () => {
            let vacationer = 'Someone Someone';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.insuranceIncluded = true;
            holidayPackage.season = 'Esentaaa';

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 500;

            assert.equal(actual, expect);
        });

        it('With two vacationers with insurance and out of Summer and Winter should return 900 total price', () => {
            let vacationer = 'Someone Someone';
            let vacationer2 = 'Some Some';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.addVacationer(vacationer2);
            holidayPackage.insuranceIncluded = true;
            holidayPackage.season = 'Esentaaa';

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 900;

            assert.equal(actual, expect);
        });

        it('With one vacationers with insurance and in Summer should return 700 total price', () => {
            let vacationer = 'Someone Someone';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.insuranceIncluded = true;

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 700;

            assert.equal(actual, expect);
        });

        it('With one vacationers with insurance and in Winter should return 700 total price', () => {
            let vacationer = 'Someone Someone';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.insuranceIncluded = true;
            holidayPackage.season = 'Winter';

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 700;

            assert.equal(actual, expect);
        });

        it('With one vacationers with insurance and in Spring should return 500 total price', () => {
            let vacationer = 'Someone Someone';
            holidayPackage.addVacationer(vacationer);
            holidayPackage.insuranceIncluded = true;
            holidayPackage.season = 'Spring';

            let actual = holidayPackage.generateHolidayPackage();
            let expect = "Holiday Package Generated\n" +
                "Destination: " + holidayPackage.destination + "\n" +
                holidayPackage.showVacationers() + "\n" +
                "Price: " + 500;

            assert.equal(actual, expect);
        });
    });
});