$(() => {
    const app = Sammy('#container', function () {
        /** Load plugins */
        this.use('Handlebars', 'hbs');

        /** add listeners */
        this.get('/index.html', viewController.renderHomePage);
        this.get('#/main', viewController.renderHomePage);
        this.get('#/register', viewController.renderRegisterPage);
        this.get('#/login', viewController.renderLoginPage);
        this.get('#/dashboard', viewController.renderDashboardPage);
        this.get('#/addPet', viewController.renderCreatePetPage);
        this.get('#/myPets', viewController.renderMyPetsPage);
        this.get('#/myPet/delete/:_id', viewController.renderDeletePage);
        this.get('#/detailsMyPet/:_id', viewController.renderMyPetEditDetails);
        this.get('#/details/:_id', viewController.renderPetDetails);
        this.get('#/all', viewController.renderAllPets);
        this.get('#/cats', viewController.renderAllCats);
        this.get('#/dogs', viewController.renderAllDogs);
        this.get('#/parrots', viewController.renderAllParrots);
        this.get('#/reptiles', viewController.renderAllReptiles);
        this.get('#/other', viewController.renderAllOthers);

        this.post('#/register', userController.createRegistration);
        this.post('#/login', userController.login);
        this.get('#/logout', userController.logout);

        this.post('#/addPet', petController.addPet);
        this.get('#/delete/:_id', petController.remove);
        this.post('#/save/:_id', petController.edit);

        this.get('#/petLike/:_id', petController.sentLike);
        this.get('#/details/like/:_id', petController.sentLikeInDetailsPage);

    });

    app.run();
});