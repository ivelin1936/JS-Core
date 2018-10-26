function BMI() {
    let [name, age, weight, height] = arguments;

    let heightInMeters = height / 100;
    let bmi = Math.round(weight / Math.pow(heightInMeters, 2));

    function getStatus() {
       if (bmi < 18.5) {
           return 'underweight';
       } else if (bmi < 25) {
           return 'normal';
       } else if (bmi < 30) {
           return 'overweight';
       } else {
           return 'obese';
       }
    }

    let status = getStatus(bmi);

    let evaloation = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: bmi,
        status: status
    };

    if (status === 'obese') {
        evaloation.recommendation = 'admission required';
    }

    return evaloation;
}

console.log(BMI('Peter', 29, 75, 182));
console.log(BMI('Honey Boo Boo', 9, 57, 137));