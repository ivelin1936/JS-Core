$(() => {
    const app = Sammy('#main', function () {
        /** Load plugins */
        this.use('Handlebars', 'hbs');

        /** add listeners */
        this.get('/index.html', renderHomePage);
        this.get('#/home', renderHomePage);
        this.get('#/about', renderAboutPage);
        this.get('#/login', renderLoginPage);
        this.get('#/register', renderRegisterPage);

        /** Post listener on register */
        this.post('#/register', function (context) {
            const username = this.params.username;
            const password = this.params.password;
            const repeatPassword = this.params.repeatPassword;

            password !== repeatPassword
                ? auth.showError(`The given password doesn't matched!`)
                : auth.register(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo(`You was register successfully!`);

                        renderHomePage(context);
                    })
                    .catch(auth.handleError);
        });

        /** Post listener on login */
        this.post('#/login', function (context) {
            const username = this.params.username;
            const password = this.params.password;

            auth.login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("You logged successfully!");

                    renderHomePage(context);
                }).catch(auth.handleError);
        });

        /** Get listener on logout*/
        this.get('#/logout', function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo(`Successfully logged out!`);
                    renderHomePage(context);
                })
        });

        /** Get listener on catalog*/
        this.get('#/catalog', showCatalog);

        /** Get listener on create (in catalog) and Render Create Template/Partial*/
        this.get('#/create', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            })
        });

        /** Load and Render Catalog Template/Partial */
        function showCatalog(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId') !== 'undefined'
                || sessionStorage.getItem('teamId') !== null;
            context.hasNoTeam = sessionStorage.getItem('teamId') !== null;

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team: './templates/catalog/team.hbs'
            }).then(function () {
                teamsService.loadTeams()
                    .then((respons) => {
                        context.teams = respons;
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
            })
        }

        /** Load and Render Register Template/Partial */
        function renderRegisterPage(context) {
            context.loggetIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        }

        /** Load and Render Login Template/Partial */
        function renderLoginPage(context) {
            context.loggetIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login//loginPage.hbs');
            });
        }

        /** Load and Render About Template/Partial */
        function renderAboutPage(context) {
            context.loggetIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        }

        /** Load and Render Home Template/Partial */
        function renderHomePage(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId') !== 'undefined'
                || sessionStorage.getItem('teamId') !== null;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

    });

    app.run();
});