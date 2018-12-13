$(() => {
    const app = Sammy('#container', function () {
        /** Load plugins */
        this.use('Handlebars', 'hbs');

        /** add listeners */
        this.get('/index.html', viewController.renderHomePage);
        this.get('#/home', viewController.renderHomePage);

        this.get('#/login', viewController.renderLoginPage);
        this.get('#/registration', viewController.renderRegistrationPage);

        this.post('#/login', userController.login);
        this.get('#/logout', userController.logout);

        this.post('#/registration', userController.createRegistration);

        this.get('#/create', viewController.renderCreatePage);
        this.post('#/create', flightsController.addFlight);

        this.get('#/details/:_id', viewController.renderDetailsPage);
        this.get('#/edit/:_id', viewController.renderEditPage);
        this.post('#/edit/:_id', flightsController.edit);

        this.get('#/flights', viewController.renderFlights);
        this.get('#/delete/:_id', flightsController.deleteFlight);

    });

    app.run();
});