class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        let kidInfo = `${name}-${budget}`;
        if (this.kids[grade]
            && this.kids[grade].indexOf(kidInfo) > -1) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }

        if (!this.kids[grade]) {
            this.kids[grade] = [];
        }

        this.kids[grade].push(kidInfo);
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (!this.kids[grade]) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        let kidIndex =
            this.kids[grade]
                .map(kid => kid.split('-')[0])
                .indexOf(name);

        if (kidIndex < 0) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        this.kids[grade].splice(kidIndex, 1);
        return this.kids[grade];
    }

    toString() {
        if (Object.keys(this.kids).length === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

        Object.keys(this.kids)
            .sort((a, b) => a - b)
            .forEach(grade => {
                result = result + `Grade: ${grade}\n`;

                let currentKidNumber = 0;
                this.kids[grade]
                    .forEach(kid => {
                        currentKidNumber++;
                        result = result + `${currentKidNumber}. ${kid}\n`;
                    });

                result += `\n`;
            });

        return result.trim();
    }

    get numberOfChildren() {
        let counter = 0;
        Object.keys(this.kids)
            .forEach(grade => {
                counter += this.kids[grade].length;
            });
        return counter;
    }
}

// //input 1
// let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
// console.log(vacation.registerChild('Gosho', 5, 2000));
// console.log(vacation.registerChild('Lilly', 6, 2100));
// console.log(vacation.registerChild('Pesho', 6, 2400));
// console.log(vacation.registerChild('Gosho', 5, 2000));
// console.log(vacation.registerChild('Tanya', 5, 6000));
// console.log(vacation.registerChild('Mitko', 10, 1590));

// //Input 2
// let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
// vacation.registerChild('Gosho', 5, 2000);
// vacation.registerChild('Lilly', 6, 2100);
//
// console.log(vacation.removeChild('Gosho', 9));
//
// vacation.registerChild('Pesho', 6, 2400);
// vacation.registerChild('Gosho', 5, 2000);
//
// console.log(vacation.removeChild('Lilly', 6));
// console.log(vacation.registerChild('Tanya', 5, 6000))

//Input 3
let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);

vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500);

console.log(vacation.toString());


