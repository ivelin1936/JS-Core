class LineManager {
    constructor(stops) {
        this.stops = stops;
        this._delay = 0;
        this._currentStopIndex = 0;
        this._timeOnCourse = 0;
    }

    set stops(stops) {
        stops.forEach(stop => {
            if (stop.name.trim() === ''
                || isNaN(stop.timeToNext)
                || stop.timeToNext < 0) {
                throw new Error('Initialization Error: Invalid bus-stop data.');
            }
        });

        this._stops = stops;
    }

    get stops() {
        return this._stops;
    }

    //returns true if the current stop is the last stop,
    //otherwise returns false.
    get atDepot() {
        return this._currentStopIndex === this.stops.length - 1;
    }

    //returns the name of the next stop. If the bus is at the
    //last stop return the string “At depot.”
    get nextStopName() {
        return this.atDepot
            ? `At depot.`
            : this.stops[this._currentStopIndex + 1].name;
    }

    //returns the delay in minutes that a bus has made during
    //the entire trip (check the example for details).
    get currentDelay() {
        return this._delay;
    }

    arriveAtStop(minutes) {
        if (minutes < 0) {
            throw new Error('Minutes cannot be negative');
        } else if (this.atDepot) {
            throw new Error('last stop reached');
        }

        this._timeOnCourse += minutes;
        this._delay += minutes - this._stops[this._currentStopIndex].timeToNext;
        this._currentStopIndex++;

        return !this.atDepot;
    }

    toString() {
        try {
            return `Line summary\n`
                + `- Next stop: ${this._stops[this._currentStopIndex + 1].name}\n`
                + `- Stops covered: ${this._currentStopIndex}\n`
                + `- Time on course: ${this._timeOnCourse} minutes\n`
                + `- Delay: ${this._delay} minutes`;
        } catch (error) {
            return `Line summary\n`
                + `- Course completed\n`
                + `- Stops covered: ${this._currentStopIndex}\n`
                + `- Time on course: ${this._timeOnCourse} minutes\n`
                + `- Delay: ${this._delay} minutes`;
        }
    }
}

// Initialize a line manager with correct values
const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);

// Travel through all the stops until the bus is at depot
while (man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());

// Should throw an Error (minutes cannot be negative)
man.arriveAtStop(-4);

// Should throw an Error (last stop reached)
man.arriveAtStop(4);
//

// Should throw an Error at initialization
const wrong = new LineManager([
    {name: 'Stop', timeToNext: {wrong: 'Should be a number'}}
]);
