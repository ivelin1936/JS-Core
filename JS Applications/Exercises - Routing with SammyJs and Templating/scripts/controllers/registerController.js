; const registerController = (function () {

    /** Fn For Load and Render Register Template/Partial */
    function renderRegisterPage(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            registerForm: './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        });
    }

    /** Fn for Post listener on register */
    function createRegistration(context) {
        const username = this.params.username;
        const password = this.params.password;
        const repeatPassword = this.params.repeatPassword;

        if (username.trim().length < 3
            || password.trim().length < 3) {
            auth.showError(`Username and Password can't be less than 3 symbols!`);
            return;
        }

        password !== repeatPassword
            ? auth.showError(`The given password doesn't matched!`)
            : auth.register(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo(`You was register successfully!`);

                    homeController.renderHomePage(context);
                })
                .catch(auth.handleError);
    }

    return {
        renderRegisterPage,
        createRegistration
    }
})();