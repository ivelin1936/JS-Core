function assemblesCar(inputCarObj) {

        function produceEngine() {
            return {
                power:
                    inputCarObj.power <= 90 ? 90
                        : inputCarObj.power <= 120 ? 120
                        : 200,
                volume:
                    inputCarObj.power <= 90 ? 1800
                        : inputCarObj.power <= 120 ? 2400
                        : 3500
            }
        }
        
        function produceCarriage() {
            return {
                type: inputCarObj.carriage,
                color: inputCarObj.color
            }
        }
        
        function produceWheels() {
            let wheels = [];
            let size = inputCarObj.wheelsize % 2 === 0 ?
                inputCarObj.wheelsize - 1
                : inputCarObj.wheelsize;
            for (let i = 0; i < 4; i++) {
                wheels[i] = size;
            }
            return wheels;
        }

        return {
            model: inputCarObj.model,
            engine: produceEngine(),
            carriage: produceCarriage(),
            wheels: produceWheels()
        }
}

console.log(assemblesCar({
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
));
console.log(assemblesCar({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));