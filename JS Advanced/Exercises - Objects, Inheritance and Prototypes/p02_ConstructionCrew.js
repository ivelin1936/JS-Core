function solve(inputWorkerObj) {
    return {
        weight: inputWorkerObj.weight,
        experience: inputWorkerObj.experience,
        bloodAlcoholLevel:
            inputWorkerObj.handsShaking ?
            inputWorkerObj.bloodAlcoholLevel + (inputWorkerObj.weight * 0.1 * inputWorkerObj.experience)
            : inputWorkerObj.bloodAlcoholLevel,
        handsShaking: inputWorkerObj.handsShaking ? false : inputWorkerObj.handsShaking
    }
}

console.log(solve({
        weight: 80,
        experience: 1,
        bloodAlcoholLevel: 0,
        handsShaking: true
    }
));
console.log(solve({
        weight: 120,
        experience: 20,
        bloodAlcoholLevel: 200,
        handsShaking: true
    }
));
console.log(solve({
        weight: 95,
        experience: 3,
        bloodAlcoholLevel: 0,
        handsShaking: false
    }
));