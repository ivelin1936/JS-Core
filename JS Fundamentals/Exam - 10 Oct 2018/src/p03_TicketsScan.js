function scan(str, infoForPrint) {
    let passangerNamePatter = /\s(([A-Z][a-zA-Z]*)-([A-Z][a-zA-Z]*)(\.-([A-Z][a-zA-Z]+))?)\s/gm;
    let airportPattern = /\s([A-Z]{3}\/[A-Z]{3})\s/gm;
    let flightNumPattern = /\s([A-Z]{1,3}[0-9]{1,5})\s/gm;
    let companyPattern = /-\s[A-Z][a-zA-Z]*\*[A-Z][a-zA-Z]*\s/gm;

    if (infoForPrint === 'name') {
        let passangerName = str.match(passangerNamePatter)[0].trim().replace(/-/g, " ");
        console.log(`Mr/Ms, ${passangerName}, have a nice flight!`);
    }
    if (infoForPrint === 'flight') {
        let airportMatch = str.match(airportPattern)[0].trim();
        let fromAirport = airportMatch.split('/')[0];
        let toAirport = airportMatch.split('/')[1];
        let flightNum = str.match(flightNumPattern)[0].trim();
        console.log(`Your flight number ${flightNum} is from ${fromAirport} to ${toAirport}.`);
    }
    if (infoForPrint === 'company') {
        let company = str.match(companyPattern)[0].trim().replace(/-/g, '').replace(/\*/g, ' ').trim();
        console.log(`Have a nice flight with ${company}.`);
    }
    if (infoForPrint === 'all') {
        let passangerName = str.match(passangerNamePatter)[0].trim().replace(/-/g, " ");
        let airportMatch = str.match(airportPattern)[0].trim();
        let fromAirport = airportMatch.split('/')[0];
        let toAirport = airportMatch.split('/')[1];
        let flightNum = str.match(flightNumPattern)[0].trim();
        let company = str.match(companyPattern)[0].trim().replace(/-/g, '').replace(/\*/g, ' ').trim();
        console.log(`Mr/Ms, ${passangerName}, your flight number ${flightNum} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`);
    }
}

scan(
    'ahah Second-Testov )*))&&ba SOF/VAR ela** FB973 - Bulgaria*Air -opFB900 pa-SOF/VAr//_- T12G12 STD08:45  STA09:35 ',
    'all'
);
console.log('*'.repeat(40));
scan(
    ' TEST-T.-TESTOV   SOF/VIE OS806 - Austrian*Airlines T24G55 STD11:15 STA11:50 ',
    'flight'
);