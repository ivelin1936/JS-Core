function isDistanceValid([x1, y1, x2, y2]) {

    let distCalc = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
    };

    let validator = (x1, y1, x2, y2, distCalc) => {
        let distance = distCalc(x1, y1, x2, y2);
        if (Number.isInteger(distance)) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    };

    validator(+x1, +y1, 0, 0, distCalc);
    validator(+x2, +y2, 0, 0, distCalc);
    validator(+x1, +y1, +x2, +y2, distCalc);
}

isDistanceValid([3, 0, 0, 4]);
isDistanceValid([2, 1, 1, 1]);


function validateDistance(params) {
    let first = params[0];
    let second = params[1];
    let third = params[2];
    let fourth = params[3];

    // First point to the Center
    console.log(`{${first}, ${second}} to {0, 0} is ${isDistanceInteger(first, second) ? 'valid' : 'invalid'}`);

    // Second point to the Center
    console.log(`{${third}, ${fourth}} to {0, 0} is ${isDistanceInteger(third, fourth) ? 'valid' : 'invalid'}`);

    // First point to Second point
    console.log(`{${first}, ${second}} to {${third}, ${fourth}} is ${isDistanceInteger(first, second, third, fourth) ? 'valid' : 'invalid'}`);

    function isDistanceInteger(x1, y1, x2 = 0, y2 = 0) {
        let distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        return distance % 1 === 0;
    }
}

validateDistance([3, 0, 0, 4]);
console.log('*'.repeat(20));
validateDistance([2, 1, 1, 1]);