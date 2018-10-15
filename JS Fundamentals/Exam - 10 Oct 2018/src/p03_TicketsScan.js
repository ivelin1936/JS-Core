function scanTicket(str, infoForPrint) {
    const nameRegex = /\s(([A-Z][a-zA-Z]*)-([A-Z][a-zA-Z]*)(\.-([A-Z][a-zA-Z]+))?)\s/g;
    const airportRegex = /\s([A-Z]{3}\/[A-Z]{3})\s/g;
    const flightNumRegex = /\s([A-Z]{1,3}\d{1,5})\s/g;
    const companyRegex = /-\s[A-Z][a-zA-Z]*\*[A-Z][a-zA-Z]*\s/g;

    const printer = {
        name:
            `Mr/Ms, ${getName()}, have a nice flight!`,
        flight:
            `Your flight number ${getFlightNum()} is from ${getAirports()[0]} to ${getAirports()[1]}.`,
        company:
            `Have a nice flight with ${getCompany()}.`,
        all:
        `Mr/Ms, ${getName()}, your flight number ${getFlightNum()} `
            + `is from ${getAirports()[0]} to ${getAirports()[1]}. `
            + `Have a nice flight with ${getCompany()}.`
    };

    if (printer[infoForPrint]) {
        console.log(printer[infoForPrint]);
    }

    function getName() {
        return str.match(nameRegex)[0].trim().replace(/-/g, " ");
    }

    function getFlightNum() {
        return str.match(flightNumRegex)[0].trim();
    }

    function getAirports() {
        return str.match(airportRegex)[0].trim().split('/');
    }

    function getCompany() {
        return str.match(companyRegex)[0].trim()
            .replace(/-/g, '')
            .replace(/\*/g, ' ')
            .trim();
    }
}

scanTicket(
    'ahah Second-Testov )*))&&ba SOF/VAR ela** FB973 - Bulgaria*Air -opFB900 pa-SOF/VAr//_- T12G12 STD08:45  STA09:35 ',
    'all'
);
console.log('*'.repeat(40));
scanTicket(
    ' TEST-T.-TESTOV   SOF/VIE OS806 - Austrian*Airlines T24G55 STD11:15 STA11:50 ',
    'flight'
);