;const listingModel = (function () {

    function getAllListings() {
        return requester.get('appdata', 'cars', 'Kinvey');
    }

    function getById(id) {
        const endpoint = `cars/${id}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function create(data) {
        return requester.post('appdata', 'cars', 'Kinvey', data);
    }

    function removeListing(id) {
        const endpoint = `cars/${id}`;
        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    function edit(id, data) {
        const endpoint = `cars/${id}`;
        return requester.update('appdata', endpoint, 'Kinvey', data)
    }

    return {
        getAllListings,
        getById,
        create,
        removeListing,
        edit
    }
})();