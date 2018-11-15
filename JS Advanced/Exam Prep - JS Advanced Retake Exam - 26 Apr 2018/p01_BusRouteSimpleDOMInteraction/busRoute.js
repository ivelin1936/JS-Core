function busRoute() {
    let firstStop = $("input[name=first-stop]").val();
    let lastStop = $("input[name=last-stop]").val();

    const busRoutes = $('ol#bus-stops li');

    if (firstStop !== '' && firstStop > 0
        && lastStop !== '' && lastStop <= busRoutes.length
        && firstStop < lastStop) {

        //o	Replaces the text "none" inside the span element with the selected bus stops
        $('h3#selected-route span').text(`${firstStop}-${lastStop}`);


        let $ulSelectedBusStops = $('ul#selected-bus-stops');
        //Empty previous data into ul with selected bus stops
        $ulSelectedBusStops.empty();
        //Selects from the given route of the bus with the received bus stops and displays it
        for (let i = firstStop - 1; i <= lastStop - 1; i++) {
            $ulSelectedBusStops.append($('<li>').text($(busRoutes[i]).text()));
        }

        //Clears the input boxes after the bus stops are selected correctly
        $("input[name=first-stop]").val('');
        $("input[name=last-stop]").val('');
    }
}