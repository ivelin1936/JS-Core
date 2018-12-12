;const viewController = (function () {

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        });
    }

    /** Fn for Load and Render Login Template/Partial */
    function renderLoginPage(context) {
        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs');
        })
    }

    /** Fn for Load and Render Register Template/Partial */
    function renderRegisterPage(context) {
        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        })
    }

    /** Fn for Load and Render Create Template/Partial */
    function renderCreatePage(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/create/createPage.hbs');
        })
    }

    /** Fn for Load and Render Edit Template/Partial */
    function renderEdit(context) {
        const listingId = context.params._id.substring(1);
        context._id = listingId;
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            listingModel.getById(listingId)
                .then((res) => {
                    context.title = res.title;
                    context.description = res.description;
                    context.brand = res.brand;
                    context.model = res.model;
                    context.year = res.year;
                    context.imageUrl = res.imageUrl;
                    context.fuel = res.fuel;
                    context.price = res.price;

                    this.partial('./templates/edit/edit.hbs');
                }).catch(handler.handleError)
        })

    }

    /** Fn for Load and Render All Listings Template/Partial */
    function allListings(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        listingModel.getAllListings()
            .then(function (response) {
                context.hasCars = response.length > 0;

                response.forEach(l => {
                    l.isAuthor = l._acl.creator === userId;
                });

                context.listings = response;
            }).then(function () {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                listing: './templates/listings/listing.hbs'
            }).then(function () {
                this.partial('./templates/listings/allListings.hbs')
            })

        })
    }

    /** Fn for Load and Render Details Template/Partial */
    function details(context) {
        const listingId = context.params._id.substring(1);
        context._id = listingId;
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            listingModel.getById(listingId)
                .then((res) => {
                    context.isAuthor = res._acl.creator === userId;
                    context.title = res.title;
                    context.imageUrl = res.imageUrl;
                    context.brand = res.brand;
                    context.model = res.model;
                    context.year = res.year;
                    context.fuel = res.fuel;
                    context.price = res.price;
                    context.description = res.description;

                    this.partial('./templates/listings/details.hbs')
                }).catch(handler.handleError)
        })
    }

    /** Fn for Load and Render My Listings Template/Partial */
    function myListings(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        listingModel.getAllListings()
            .then(function (response) {
                const myListings = [];
                response.forEach(l => {
                    if (l._acl.creator === userId) {
                        l.isAuthor = true;
                        myListings.push(l);
                    }
                });
                context.hasCars = myListings.length > 0;
                context.listings = myListings;

            }).then(function () {

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                listing: './templates/listings/listing.hbs'
            }).then(function () {
                this.partial('./templates/listings/allListings.hbs')
            })

        })
    }

    return {
        renderHomePage,
        renderLoginPage,
        renderRegisterPage,
        renderCreatePage,
        renderEdit,
        allListings,
        details,
        myListings
    }
})();