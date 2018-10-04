function validateEmail(email) {
    let pattern = /\b[a-zA-Z0-9]{2,}@[a-z]+.[a-z]+\b/g;

    return pattern.test(email) ? 'Valid' : 'Invalid';
}

console.log(validateEmail('valid@email.bg'));
console.log(validateEmail('invalid@emai1.bg'));