;const userController = (function () {
    /** controller work with userService */

    // Saves username/id/authtoken to local storage
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        viewController.userLoggedIn();
    }

    // Logs in the user
    function login() {
        let form = $('#formLogin');
        const username = form.find('input[name="username"]').val();
        const password = form.find('input[name="passwd"]').val();
        const loginData = {
            username,
            password
        };

        userService.login(loginData)
            .then(response => {
                saveSession(response);
                viewController.showView('viewAds');
                handler.showInfo('Successfully logged in!');
            }).catch(handler.handleError);
    }

    // Register a user
    function register() {
        let form = $('#formRegister');
        const username = form.find('input[name="username"]').val();
        const password = form.find('input[name="passwd"]').val();
        const confirmPassword = form.find('input[name="ConfirmPasswd"]').val();
        const registerData = {
            username,
            password
        };

        if (username.trim().length < 3) {
            handler.showError(`Username can't be less than 3 symbols!`);
            return;
        }

        if (password === confirmPassword) {
            userService.register(registerData)
                .then(response => {
                    saveSession(response);
                    viewController.showView('viewAds');
                    viewController.showInfo('Successfully registered!');
                }).catch(handler.handleError);

        } else {
            handler.showError(`Passwords doesn't match!`);
            form.find('input[name="ConfirmPasswd"]').val('');
        }
    }

    // Logout a user
    function logout() {
        const logoutData = {
            authtoken: localStorage.getItem('authtoken')
        };

        userService.logout(logoutData)
            .then(response => {
                localStorage.clear(); // Clears all session storage on logout
                viewController.userLoggedOut();
                viewController.showView('viewHome');
                handler.showInfo('Successful logout!');
            }).catch(handler.handleError);
    }

    return {
        login,
        register,
        logout
    }
})();