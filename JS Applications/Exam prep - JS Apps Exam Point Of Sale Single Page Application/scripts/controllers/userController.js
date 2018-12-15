;const userController = (function () {

    /** Fn for Post listener on login */
    function login(context) {
        const username = this.params['username-login'];
        const password = this.params['password-login'];

        userModel.login(username, password)
            .then(function (res) {
                userModel.saveSession(res);
                handler.showInfo(`Successfully logged in!`);
                context.redirect('#/editor');
            }).catch((err) => {
            handler.handleError(err);
            $('input[name="username-login"]').val('');
            $('input[name="password-login"]').val('');
        });
    }

    /** Fn for Get listener on logout */
    function logout(context) {
        //TODO -> Form validation should be the same as register.
        userModel.logout()
            .then(function () {
                sessionStorage.clear();
                handler.showInfo(`Login successful.`);
                context.redirect('#/home');
            })
    }

    /** Fn for Post listener on register */
    function createRegistration(context) {
        if (!validator.isRegFormValid(context.params)) {
            $('input[name="password-register"]').val('');
            $('input[name="password-register-check"]').val('');
            return;
        }

        const username = this.params['username-register'];
        const password = this.params['password-register'];
        userModel.register(username, password)
            .then(function (response) {
                userModel.saveSession(response);
                handler.showInfo(`User registration successful.`);
                context.redirect('#/editor');
            })
            .catch(userModel.handleError);
    }

    return {
        login,
        logout,
        createRegistration
    }
})();