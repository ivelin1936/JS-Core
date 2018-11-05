function databaseManager(ticketsDescription, sortingCriteria) {
    let tickets = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    ticketsDescription.forEach(description => {
        [dest, price, stat] = description.split('|');
        tickets.push(new Ticket(dest, +price, stat))
    });

    function compare(a,b) {
        if (a[sortingCriteria] < b[sortingCriteria])
            return -1;
        if (a[sortingCriteria] > b[sortingCriteria])
            return 1;
        return 0;
    }

    tickets.sort(compare);

    return tickets;
}

console.log(databaseManager(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
));

console.log(databaseManager(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
));