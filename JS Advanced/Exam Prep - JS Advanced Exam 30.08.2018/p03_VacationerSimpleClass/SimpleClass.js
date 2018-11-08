class Vacationer {
    constructor(fullName, creditCardDetails = [1111, '', 111]) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        this.creditCard = creditCardDetails;
        this.wishList = [];
    }

    set creditCard(details) {
        if (details.length !== 3) {
            throw new Error('Missing credit card information');
        }

        let [cardNumber, expirationDate, securityNumber] = details;
        if (typeof cardNumber !== 'number' || typeof securityNumber !== 'number') {
            throw new Error('Invalid credit card details');
        }

        this._creditCard = {
            cardNumber: +cardNumber,
            expirationDate: expirationDate,
            securityNumber: +securityNumber
        };
    }

    get creditCard() {
        return this._creditCard;
    }

    set fullName(fullName) {
        if (fullName.length !== 3) {
            throw new Error('Name must include first name, middle name and last name');
        }
        for (let name of fullName) {
            let nameRegex = /^[A-Z][a-z]+$/g;
            if (!nameRegex.test(name)) {
                throw new Error('Invalid full name');
            }
        }

        let [firstName, secondName, lastName] = fullName;
        this._fullName = {
            firstName: firstName,
            middleName: secondName,
            lastName: lastName
        };
    }

    get fullName() {
        return this._fullName;
    }

    generateIDNumber() {
        const vowel = ["a", "e", "o", "i", "u"];
        let generatedId = 231 * this._fullName.firstName.charCodeAt(0) + 139 * this._fullName.middleName.length;

        let lastNameLastChar = this._fullName.lastName.charAt(this._fullName.lastName.length - 1);
        if (vowel.indexOf(lastNameLastChar) > -1) {
            generatedId = '' + generatedId + 8;
        } else {
            generatedId = '' + generatedId + 7;
        }

        return generatedId;
    }

    addCreditCardInfo(input) {
        this.creditCard = input;
    }

    addDestinationToWishList(destination) {
        if (this.wishList.indexOf(destination) > -1) {
            throw new Error('Destination already exists in wishlist');
        }
        this.wishList.push(destination);
        this.wishList = this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        return `Name: ${this._fullName.firstName} ${this._fullName.middleName} ${this._fullName.lastName}\n`
            + `ID Number: ${this.idNumber}\n`
            + `Wishlist:\n`
            + `${this.wishList.length === 0 ? 'empty' : this.wishList.join(', ')}\n`
            + `Credit Card:\n`
            + `Card Number: ${this._creditCard.cardNumber}\n`
            + `Expiration Date: ${this._creditCard.expirationDate}\n`
            + `Security Number: ${this._creditCard.securityNumber}`;
    }
}

try {
    let b = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
    let a = new Vacationer(["Tania", "Ivanova", "Zhivkova"], ['123456789', "10/01/2018", 777]);
} catch (ex) {
    console.log(ex.message);
}

try {
    let a = new Vacationer(["Vania", "Ivanova", "Zhivk0va"]);
} catch (ex) {
    console.log(ex.message);
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
    let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
    console.log("Error: " + err.message);
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());

