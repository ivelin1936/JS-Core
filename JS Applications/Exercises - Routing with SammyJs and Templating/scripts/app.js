$(() => {
    const app = Sammy('#main', function () {
        /** Load plugins */
        this.use('Handlebars', 'hbs');

        /** add listeners */
        //home listeners
        this.get('/index.html', homeController.renderHomePage);
        this.get('#/home', homeController.renderHomePage);

        //about listeners
        this.get('#/about', aboutController.renderAboutPage);

        //user listeners - login/logout
        this.get('#/login', userController.renderLoginPage);
        this.post('#/login', userController.login);
        this.get('#/logout', userController.logout);

        //register listeners
        this.get('#/register', registerController.renderRegisterPage);
        this.post('#/register', registerController.createRegistration);

        //catalog listeners
        this.get('#/catalog', catalogController.showCatalog);
        this.get('#/catalog/:_id', teamController.showTeamDetails);
        this.get('#/catalog/myTeam/:_id', teamController.showMyTeamDetails);

        //team listeners
        this.get('#/join/:teamId', teamController.joinTeam);
        this.get('#/leave', teamController.leaveTeam);
        this.get('#/delete/:teamId', teamController.deleteTeam);
        this.get('#/edit/:teamId', teamController.renderEdit);
        this.post('#/edit/:teamId', teamController.edit);

        // /create team listeners
        this.get('#/create', teamController.renderCreate);
        this.post('#/create', teamController.createTeam);
    });

    app.run();
});