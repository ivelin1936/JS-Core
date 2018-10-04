function isStrStartWith(str, givenSubstr) {
    return str.startsWith(givenSubstr);
}

console.log(isStrStartWith('How have you been?', 'how'));
console.log(isStrStartWith('The quick brown fox…', 'The quick brown fox…'));
console.log(isStrStartWith('Marketing Fundamentals, starting 19/10/2016', 'Marketing Fundamentals, sta'));