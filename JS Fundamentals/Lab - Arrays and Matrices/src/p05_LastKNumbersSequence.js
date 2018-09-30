function generateSequence(n, k) {
    let sequence = [1];

    let nextElement = (arr) => {
        return arr.slice(-k).reduce((a, b) => a + b, 0);
    };

    for (let i = 0; i < n; i++) {
      sequence[i] = nextElement(sequence);
    }

    return sequence.join(' ');
}

console.log(generateSequence(6, 3));
console.log(generateSequence(8, 2));