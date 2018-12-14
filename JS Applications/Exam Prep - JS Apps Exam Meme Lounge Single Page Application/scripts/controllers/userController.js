;const userController = (function () {

    /** Fn for Post listener on login */
    function login(context) {
        const username = context.params.username;
        const password = context.params.password;

        userModel.login(username, password)
            .then(function (res) {
                userModel.saveSession(res);
                handler.showInfo(`Login successful.`);
                context.redirect('#/home/meme');
            }).catch((err) => {
            handler.handleError(err);
            $('input[name="username"]').val('');
            $('input[name="password"]').val('');
        });
    }

    /** Fn for Get listener on logout */
    function logout(context) {
        userModel.logout()
            .then(function () {
                sessionStorage.clear();
                handler.showInfo(`Logout successful.`);
                context.redirect('#/home');
            })
    }

    /** Fn for Post listener on register */
    function createRegistration(context) {
        if (!validator.isRegFormValid(context.params)) {
            $('input[name="password"]').val('');
            $('input[name="repeatPass"]').val('');
            return;
        }

        const userData ={
            username: context.params.username,
            password: context.params.password,
            email: context.params.email,
            avatarUrl: context.params.avatarUrl
        };

        userModel.register(userData)
            .then(function (response) {
                userModel.saveSession(response);
                handler.showInfo(`User registration successful.`);
                context.redirect('#/home');
            })
            .catch(handler.handleError);
    }

    function removeUser(context) {
        const userId = context.params.userId.substring(1);
        userModel.removeUserById(userId)
            .then(function (res) {
                sessionStorage.clear();
                handler.showInfo(`User deleted successfully.`);
                context.redirect('#/home');
            })
    }

    return {
        login,
        logout,
        createRegistration,
        removeUser
    }
})();