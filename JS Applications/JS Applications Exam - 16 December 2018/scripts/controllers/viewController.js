;const viewController = (function () {

    /** Fn for user info from sessionStorage */
    function authorizeUser(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.userId = sessionStorage.getItem('userId');
    }

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        authorizeUser(context);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/welcome/welcome.hbs')
        })
    }

    /** Fn for Load and Render Register Template/Partial */
    function renderRegisterPage(context) {
        authorizeUser(context);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/register/register.hbs')
        })
    }

    /** Fn for Load and Render Login Template/Partial */
    function renderLoginPage(context) {
        authorizeUser(context);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/login/login.hbs')
        })
    }

    /** Fn for Load and Render Dashboard Template/Partial */
    function renderDashboardPage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petController.loadDashboardPets(context)
                .then(() => {
                    this.partial('./templates/dashboard/dashboard.hbs');
                }).catch(handler.handleError);
        })
    }

    /** Fn for Load and Render Create Template/Partial */
    function renderCreatePetPage(context) {
        authorizeUser(context);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/create/create.hbs')
        })
    }

    /** Fn for Load and Render My Pets Template/Partial */
    function renderMyPetsPage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petModel.getMyPets(context.userId)
                .then(function (res) {
                    context.pets = res;
                }).then(() => {
                this.partial('./templates/pet/myPets.hbs')
            }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render Delete Template/Partial */
    function renderDeletePage(context) {
        authorizeUser(context);
        const petId = context.params._id.substring(1);
        context._id = petId;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petModel.getPetById(petId)
                .then((res) => {
                    context.name = res.name;
                    context.petLikes = res.petLikes;
                    context.imageURL = res.imageURL;
                    context.description = res.description;

                    this.partial('./templates/pet/delete.hbs')
                }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render My Pet Details Template/Partial */
    function renderMyPetEditDetails(context) {
        authorizeUser(context);
        const petId = context.params._id.substring(1);
        context._id = petId;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petModel.getPetById(petId)
                .then((res) => {
                    context.name = res.name;
                    context.petLikes = res.petLikes;
                    context.imageURL = res.imageURL;
                    context.description = res.description;

                    this.partial('./templates/pet/detailsMyPet.hbs')
                }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render Pet Details Template/Partial */
    function renderPetDetails(context) {
        authorizeUser(context);

        const petId = context.params._id.substring(1);
        context._id = petId;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petModel.getPetById(petId)
                .then((res) => {
                    context.name = res.name;
                    context.petLikes = res.petLikes;
                    context.imageURL = res.imageURL;
                    context.description = res.description;

                    this.partial('./templates/pet/detailsOtherPet.hbs')
                }).catch(handler.handleError)
        })
    }

    /** Private helper function for rendering filtered animals */
    function filterAndRenderAnimals(context, query) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            petModel.getPetsByQueryCriterion(query)
                .then(function (res) {
                    context.pets = res
                        .filter(p => p._acl.creator !== context.userId)
                        .sort((a, b) => b.petLikes - a.petLikes);
                }).then(() => {
                this.partial('./templates/dashboard/dashboard.hbs');
            }).catch(handler.handleError)
        })
    }

    /** Fn for rendering All Pets */
    function renderAllPets(context) {
        const query = `?query={}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    /** Fn for rendering All Cats */
    function renderAllCats(context) {
        const query = `?query={"category":"Cat"}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    /** Fn for rendering All Dogs */
    function renderAllDogs(context) {
        const query = `?query={"category":"Dog"}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    /** Fn for rendering All Parrots */
    function renderAllParrots(context) {
        const query = `?query={"category":"Parrot"}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    /** Fn for rendering All Reptiles */
    function renderAllReptiles(context) {
        const query = `?query={"category":"Reptile"}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    /** Fn for rendering All Others */
    function renderAllOthers(context) {
        const query = `?query={"category":"Other"}&sort={"likes": -1}`;
        filterAndRenderAnimals(context, query);
    }

    return {
        renderHomePage,
        renderRegisterPage,
        renderLoginPage,
        renderDashboardPage,
        renderCreatePetPage,
        renderMyPetsPage,
        renderDeletePage,
        renderMyPetEditDetails,
        renderPetDetails,
        renderAllPets,
        renderAllCats,
        renderAllDogs,
        renderAllParrots,
        renderAllReptiles,
        renderAllOthers
    }
})();