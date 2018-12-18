;let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_SkgtukElV";
    const kinveyAppSecret = "9ebb128c478a45a4818e65a90a3359ac";

    // Creates the authentication header
    function makeAuth(type) {
        if (type === 'basic') {
            return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        } else if (type === 'admin') {
            return 'Basic a2lkX1NrZ3R1a0VsVjo0MGRhZGRkZTllMTU0ZWZjODM3ZTQ3Y2YzYWU3NWFkNg=='
        } else if (type === 'Kinvey') {
            return 'Kinvey ' + sessionStorage.getItem('authtoken')
        }
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth)
            }
        };
    }

    // Function to return GET promise
    function get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post(module, endpoint, auth, data) {
        let req = makeRequest('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update(module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();