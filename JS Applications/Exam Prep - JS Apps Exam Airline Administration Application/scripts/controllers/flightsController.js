;const flightsController = (function () {

    function dataParser(context) {
        return {
            cost: context.params.cost,
            departureDate: context.params.departureDate,
            departureTime: context.params.departureTime,
            destination: context.params.destination,
            img: context.params.img,
            origin: context.params.origin,
            public: !!context.params.public,
            seats: context.params.seats
        };
    }

    function addFlight(context) {
        const data = dataParser(context);

        if (!validator.isAddFormValid(data)) {
            handler.showError('Invalid data!');
            return;
        }

        flightsModel.add(data)
            .then(function (res) {
                handler.showInfo(`Successfully added!`);
                context.redirect('#/home');
            }).catch(handler.handleError);
    }

    function edit(context) {
        const flightId = context.params._id.substring(1);
        const data = dataParser(context);

        if (!validator.isAddFormValid(data)) {
            handler.showError('Invalid data!');
            return;
        }

        flightsModel.edit(flightId, data)
            .then(function (response) {
                handler.showInfo(`Successfully edited flight.`);
                context.redirect(`#/details/:${flightId}`);
            }).catch(handler.handleError);
    }

    function deleteFlight(context) {
        const flightId = context.params._id.substring(1);

        flightsModel.removeFlight(flightId)
            .then(function () {
                handler.showInfo('Flight deleted.');
                context.redirect('#/flights');
            }).catch(handler.handleError);
    }

    return {
        addFlight,
        edit,
        deleteFlight
    }
})();