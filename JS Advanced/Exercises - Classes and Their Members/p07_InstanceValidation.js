class CheckingAccount {
    constructor(clientId, email, firstName, lastName ) {
        this._clientId = clientId;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    set _clientId(id) {
        if (!(/^[0-9]{6}$/g).test(id)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }
        this.clientId = id;
    }

    set _email(email) {
        let emailPattern = /^[A-Za-z0-9]+@[A-Za-z]+(\.[A-Za-z]+)*$/g;
        if (!emailPattern.test(email)) {
            throw new TypeError('Invalid e-mail');
        }
        this.email = email;
    }

    set _firstName(name) {
        if (!CheckingAccount._isValidNameLength(name)) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        } else if (!CheckingAccount._isValidNameLetters(name)) {
            throw new TypeError('First name must contain only Latin characters');
        }
        this.firstName = name;
    }

    set _lastName(name) {
        if (!CheckingAccount._isValidNameLength(name)) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        } else if (!CheckingAccount._isValidNameLetters(name)) {
            throw new TypeError('Last name must contain only Latin characters');
        }
        this.lastName = name;
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