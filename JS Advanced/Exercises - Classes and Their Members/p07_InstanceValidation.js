class CheckingAccount {
    constructor(clientId, email, firstName, lastName ) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set clientId(id) {
        let clientIdPattern = /^\d{6}$/g;
        if (!clientIdPattern.test(id)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }
        this._clientId = id;
    }

    get clientId() {
        return this._clientId;
    }

    set email(email) {
        let emailPattern = /^[A-Za-z0-9]+@[A-Za-z]+(\.[A-Za-z]+)*$/g;
        if (!emailPattern.test(email)) {
            throw new TypeError('Invalid e-mail');
        }
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set firstName(name) {
        if (!CheckingAccount._isValidNameLength(name)) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        } else if (!CheckingAccount._isValidNameLetters(name)) {
            throw new TypeError('First name must contain only Latin characters');
        }
        this._firstName = name;
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(name) {
        if (!CheckingAccount._isValidNameLength(name)) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        } else if (!CheckingAccount._isValidNameLetters(name)) {
            throw new TypeError('Last name must contain only Latin characters');
        }
        this._lastName = name;
    }

    get lastName() {
        return this._lastName;
    }

    static _isValidNameLength(name) {
        if (name.length < 3 || name.length > 20) {
            return false;
        }
        return true;
    }

    static _isValidNameLetters(name) {
        let namePattern = /^[A-Za-z]{3,20}$/g;
        if (!namePattern.test(name)) {
            return false;
        }
        return true;
    }
}

try {
    let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');
} catch (ex) {
    console.log(ex.message);
}
try {
    let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov');
} catch (ex) {
    console.log(ex.message);
}
try {
    let acc = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov');
} catch (ex) {
    console.log(ex.message);
}
try {
    let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');
} catch (ex) {
    console.log(ex.message);
}