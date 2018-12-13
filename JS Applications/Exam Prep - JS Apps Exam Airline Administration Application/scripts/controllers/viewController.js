;const viewController = (function () {

    function authorizeUser(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.userId = sessionStorage.getItem('userId');
    }

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        authorizeUser(context);

        function loadMainPartials() {
            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/catalog.hbs');
            });
        }

        if (context.loggedIn) {
            flightsModel.getAllFlights()
                .then(function (response) {
                    context.flights = response;
                }).then(function () {
                loadMainPartials();
            });
        } else {
            flightsModel.getAllFightsMasterAuth()
                .then(function (response) {
                    context.flights = response
                        .filter(fl => fl.public === `true`);
                }).then(function () {
                loadMainPartials();
            });
        }
    }

    /** Fn for Load and Render Login Template/Partial */
    function renderLoginPage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/login/login.hbs');
        })
    }

    /** Fn for Load and Render Register Template/Partial */
    function renderRegistrationPage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/registration/registration.hbs');
        })
    }

    /** Fn for Load and Render Create Template/Partial */
    function renderCreatePage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/create/create.hbs');
        })
    }

    /** Fn for Load and Render Details Template/Partial */
    function renderDetailsPage(context) {
        authorizeUser(context);
        const flightId = context.params._id.substring(1);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            flightsModel.getFlightById(flightId)
                .then((response) => {
                    context._id = flightId;
                    context.isAuthor = context.userId === response._acl.creator;
                    context.img = response.img;
                    context.destination = response.destination;
                    context.origin = response.origin;
                    context.departureDate = response.departureDate;
                    context.seats = response.seats;
                    context.cost = response.cost;

                    this.partial('./templates/details/details.hbs');
                }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render Edit Template/Partial */
    function renderEditPage(context) {
        authorizeUser(context);
        const flightId = context.params._id.substring(1);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            flightsModel.getFlightByIdKinveyAuth(flightId)
                .then((response) => {
                    context._id = flightId;
                    context.destination = response.destination;
                    context.origin = response.origin;
                    context.departureDate = response.departureDate;
                    context.departureTime = response.departureTime;
                    context.seats = response.seats;
                    context.cost = response.cost;
                    context.img = response.img;

                    this.partial('./templates/edit/edit.hbs');
                }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render Flights Template/Partial */
    function renderFlights(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            flightsModel.getAllFlights()
                .then((response) => {
                    context.flights = response
                        .filter(fl => fl._acl.creator === context.userId);
                    this.partial('./templates/myFlights/myFlights.hbs');
                }).catch(handler.handleError)
        })
    }

    return {
        renderHomePage,
        renderLoginPage,
        renderRegistrationPage,
        renderCreatePage,
        renderDetailsPage,
        renderEditPage,
        renderFlights
    }
})();