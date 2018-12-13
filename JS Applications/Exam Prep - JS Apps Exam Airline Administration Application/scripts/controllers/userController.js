;const userController = (function () {
    //TODO -> for refactoring!!!!

    /** Fn for Post listener on login */
    function login(context) {
        const username = this.params.username;
        const password = this.params.pass;

        userModel.login(username, password)
            .then(function (res) {
                userModel.saveSession(res);
                handler.showInfo(`Successfully logged in!`);
                context.redirect('#/home');
            }).catch((err) => {
            handler.handleError(err);
            $('input[name="username"]').val('');
            $('input[name="pass"]').val('');
        });
    }

    /** Fn for Get listener on logout */
    function logout(context) {
        userModel.logout()
            .then(function () {
                sessionStorage.clear();
                handler.showInfo(`Successfully logged out!`);
                context.redirect('#/home');
            })
    }

    /** Fn for Post listener on register */
    function createRegistration(context) {
        if (!validator.isRegFormValid(context.params)) {
            $('input[name="pass"]').val('');
            $('input[name="checkPass"]').val('');
            return;
        }

        const username = this.params.username;
        const password = this.params.pass;

        userModel.register(username, password)
            .then(function (response) {
                userModel.saveSession(response);
                handler.showInfo(`Successful register!`);
                context.redirect('#/home');
            })
            .catch(userModel.handleError);
    }

    return {
        login,
        logout,
        createRegistration
    }
})();