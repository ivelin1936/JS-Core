function speedLimit([speed, area]) {

    const zones = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20
    };

    let getSpeedLimit = function speedLimit(drivingArea) {
        if (drivingArea in zones) {
            return zones[drivingArea];
        }
    };

    let getInfraction = function (speed, limit) {
        let overSpeed = speed - limit;
        if (overSpeed <= 0) {
            return false;
        } else {
            if (overSpeed <= 20) {
                return 'speeding';
            } else if (overSpeed <= 40) {
                return 'excessive speeding';
            } else {
                return 'reckless driving';
            }
        }
    };

    let limit = getSpeedLimit(area);
    let infraction = getInfraction(speed, limit);

    if (infraction) {
        console.log(infraction);
    }
}

speedLimit([40, 'city']);
speedLimit([21, 'residential']);
speedLimit([120, 'interstate']);
speedLimit([200, 'motorway']);