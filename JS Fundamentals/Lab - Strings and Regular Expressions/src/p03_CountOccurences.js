function getCountOccurs(targetStr, text) {
    let count = 0;
    let indexOfTarget = text.indexOf(targetStr);

    while (indexOfTarget > -1) {
        count++;
        indexOfTarget = text.indexOf(targetStr, indexOfTarget + 1);
    }

    return count;
}

console.log(getCountOccurs('the',
    'The quick brown fox jumps over the lay dog.'));
console.log(getCountOccurs('ma',
    'Marine mammal training is the training and caring ' +
    'for marine life such as, dolphins, killer whales, ' +
    'sea lions, walruses, and other marine mammals. ' +
    'It is also a duty of the trainer to do mental and ' +
    'physical exercises to keep the animal healthy and happy.'));


function countOccurs(targetStr, text) {
    return text.split(targetStr).length - 1;
}

console.log(countOccurs('the',
    'The quick brown fox jumps over the lay dog.'));
console.log(countOccurs('ma',
    'Marine mammal training is the training and caring ' +
    'for marine life such as, dolphins, killer whales, ' +
    'sea lions, walruses, and other marine mammals. ' +
    'It is also a duty of the trainer to do mental and ' +
    'physical exercises to keep the animal healthy and happy.'));