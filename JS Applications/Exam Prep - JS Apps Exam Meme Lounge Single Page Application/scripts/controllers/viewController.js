;const viewController = (function () {

    function authorizeUser(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.userId = sessionStorage.getItem('userId');
    }

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/home/main.hbs');
        });
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
    function renderRegisterPage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/register/register.hbs');
        })
    }

    /** Fn for Load and Render Home Meme Template/Partial */
    function renderHomeMemePage(context) {
        authorizeUser(context);

        memeController.getAllMemes(context)
            .then(function () {
                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/memeFeed/memeFeed.hbs')
                })
            }).catch(handler.handleError);
    }

    /** Fn for Load and Render Create Template/Partial */
    function renderCreatePage(context) {
        authorizeUser(context);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/create/create.hbs');
        })
    }

    /** Fn for Load and Render Edit Template/Partial */
    function renderEditPage(context) {
        authorizeUser(context);
        context._id = context.params._id.substring(1);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            memeModel.getById(context._id)
                .then((res) => {
                    context.title = res.title;
                    context.description = res.description;
                    context.imageUrl = res.imageUrl;

                    this.partial('./templates/edit/edit.hbs');
                }).catch(handler.handleError)
        })

    }


    /** Fn for Load and Render Details Template/Partial */
    function renderDetailsPage(context) {
        authorizeUser(context);
        context._id = context.params._id.substring(1);

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            memeModel.getById(context._id)
                .then((res) => {
                    context.creator = res.creator;
                    context.isAuthor = res._acl.creator === context.userId;
                    context.title = res.title;
                    context.imageUrl = res.imageUrl;
                    context.description = res.description;

                    this.partial('./templates/details/details.hbs')
                }).catch(handler.handleError)
        })
    }

    function renderProfilePage(context) {
        authorizeUser(context);

        const username = context.params.username.substring(1);

        userModel.getByUsername(username)
            .then(function (res) {
                res[0].userId = context.userId;
                res[0].hasAvatar = res[0].avatarUrl;
                res[0].isMyProfile = res[0]._id === context.userId;
                context.userProfiles = res;

                memeController.getAllMemesByCreator(res[0].username, context)
                    .then(function () {
                        context.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs'
                        }).then(function () {
                            this.partial('./templates/userProfile/profile.hbs')
                        })
                    }).catch(handler.handleError);
            })
    }

// /** Fn for Load and Render My Listings Template/Partial */
// function myListings(context) {
//     context.loggedIn = sessionStorage.getItem('authtoken') !== null;
//     context.username = sessionStorage.getItem('username');
//     const userId = sessionStorage.getItem('userId');
//
//     listingModel.getAllListings()
//         .then(function (response) {
//             const myListings = [];
//             response.forEach(l => {
//                 if (l._acl.creator === userId) {
//                     l.isAuthor = true;
//                     myListings.push(l);
//                 }
//             });
//             context.hasCars = myListings.length > 0;
//             context.listings = myListings;
//
//         }).then(function () {
//
//         context.loadPartials({
//             header: './templates/common/header.hbs',
//             footer: './templates/common/footer.hbs',
//             listing: './templates/listings/listing.hbs'
//         }).then(function () {
//             this.partial('./templates/listings/allListings.hbs')
//         })
//
//     })
// }

    return {
        renderHomePage,
        renderLoginPage,
        renderRegisterPage,
        renderHomeMemePage,
        renderCreatePage,
        renderEditPage,
        renderDetailsPage,
        renderProfilePage
    }
})
();