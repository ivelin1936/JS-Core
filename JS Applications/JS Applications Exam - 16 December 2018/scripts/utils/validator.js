;const validator = (function () {

    function isValidForm(username, password) {
        if (username === '' || username.length < 3) {
            handler.showError('Username must be at least 3 symbols');
            return false;
        }

        if (password === '' || password.length < 6) {
            handler.showError('Password must be at least 6 symbols');
            return false;
        }

        return true;
    }

    return {
        isValidForm
    }
})();