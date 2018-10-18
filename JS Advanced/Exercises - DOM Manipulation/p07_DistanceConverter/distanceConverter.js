function attachEventsListeners() {
    const consts = {
        "km": 1000,
        "m": 1,
        "cm": 0.01,
        "mm": 0.001,
        "mi": 1609.34,
        "yrd": 0.9144,
        "ft": 0.3048,
        "in": 0.0254
    };

    document.getElementById('convert').addEventListener('click', converting);
    
    function converting() {
        let distance = document.getElementById('inputDistance').value;

        let inputUnit = document.getElementById('inputUnits').value;
        //Multiply the incoming distance by the following conversion rates to convert to meters
        let inputValueInMeters = distance * consts[inputUnit];

        document.getElementById('outputDistance').value = convertFromM(inputValueInMeters);
    }

    function convertFromM(value) {
        let outputUnit = document.getElementById('outputUnits').value;
        //Divide to convert from meters to the required output unit.
        return value / consts[outputUnit];
    }
}