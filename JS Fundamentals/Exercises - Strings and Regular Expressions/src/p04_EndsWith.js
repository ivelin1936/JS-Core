function isStrEndsWith(str, givenSubstr) {
    return str.endsWith(givenSubstr);
}

console.log(isStrEndsWith('This sentence ends with fun?', 'fun?'));
console.log(isStrEndsWith('This is Houston, we have…', 'We have…'));
console.log(isStrEndsWith('The new iPhone has no headphones jack.', 'o headphones jack.'));