$(() => {
    const app = Sammy('#container', function () {
        /** Load plugins */
        this.use('Handlebars', 'hbs');

        /** add listeners */
        this.get('/index.html', viewController.renderHomePage);
        this.get('#/home', viewController.renderHomePage);
        this.post('#/login', userController.login);
        this.post('#/register', userController.createRegistration);
        this.get('#/logout', userController.logout);
        this.get('#/editor', viewController.renderEditorPage);
        this.post('#/add', entriesController.addNewEntry);
        this.get('#/delete/:_id', entriesController.deleteEntry);
        this.post('#/checkout', receiptController.updateReceipt);

        this.get('#/overview', viewController.renderOverview);
        this.get('#/details/:_id', viewController.renderReceiptDetails);

        //TODO -> can't understand what exactly need to do this button/path (check header.hbs)
        // this.get('#/archive', viewController.renderAllReceipts);

    });

    app.run();
});