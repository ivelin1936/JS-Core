; const userController = (function () {

    /** Fn for Load and Render Login Template/Partial */
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

    /** Fn for Post listener on login */
    function login(context) {
        const username = this.params.username;
        const password = this.params.password;

        auth.login(username, password)
            .then(function (response) {
                auth.saveSession(response);
                auth.showInfo("Successfully logged in!");

                homeController.renderHomePage(context);
            }).catch(auth.handleError);
    }

    /** Fn for Get listener on logout */
    function logout(context) {
        auth.logout()
            .then(function () {
                sessionStorage.clear();
                auth.showInfo(`Successfully logged out!`);
                homeController.renderHomePage(context);
            })
    }

    return {
        renderLoginPage,
        login,
        logout
    }
})();