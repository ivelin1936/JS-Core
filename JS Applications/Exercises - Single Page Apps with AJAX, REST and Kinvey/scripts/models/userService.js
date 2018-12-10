;const userService = (function () {
    /** User service make connection with requester API */

    function login(data) {
        return requester.post('user', 'login', 'basic', data);
    }

    function register(data) {
        return requester.post('user', '', 'basic', data);
    }

    function logout(data) {
        return requester.post('user', '_logout', 'kinvey', data);
    }

    return {
        login,
        register,
        logout
    }
})();