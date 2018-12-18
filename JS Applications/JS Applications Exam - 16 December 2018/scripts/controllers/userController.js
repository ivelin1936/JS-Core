;const userController = (function () {

    /** Fn for Post listener on login */
    function login(context) {
        const username = context.params.username;
        const password = context.params.password;

        if (!validator.isValidForm(username, password)) {
            return;
        }

        userModel.login(username, password)
            .then(function (response) {
                userModel.saveSession(response);
                handler.showInfo('Login successful.');
                context.redirect('#/dashboard');

                $('input[name=username]').val('');
                $('input[name=password]').val('');
            }).catch(handler.handleError);
    }

    /** Fn for Get listener on logout */
    function logout(context) {
        userModel.logout()
            .then(function () {
                sessionStorage.clear();
                handler.showInfo(`Successfully logged out!`);
                context.redirect('#/main');
            }).catch(handler.handleError);
    }

    /** Fn for Post listener on register */
    function createRegistration(context) {
        const username = context.params.username;
        const password = context.params.password;

        if (!validator.isValidForm(username, password)) {
            return;
        }

        userModel.register(username, password)
            .then(function (response) {
                userModel.saveSession(response);
                handler.showInfo('User registration successful.');
                context.redirect('#/dashboard');
            }).catch(handler.handleError);
    }

    return {
        login,
        logout,
        createRegistration
    }
})();