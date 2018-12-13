;const flightsModel = (function () {

    function add(data) {
        return requester.post('appdata', 'flights', 'Kinvey', data);
    }

    function getAllFlights() {
        return requester.get('appdata', 'flights', 'Kinvey');
    }

    function getAllFightsMasterAuth() {
        return requester.getWithMasterAuth('appdata', 'flights');
    }

    function getFlightById(id) {
        const endpoint = `flights/${id}`;
        return requester.getWithMasterAuth('appdata', endpoint);
    }

    function getFlightByIdKinveyAuth(id) {
        const endpoint = `flights/${id}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function edit(id, data) {
        const endpoint = `flights/${id}`;
        return requester.update('appdata', endpoint, 'Kinvey', data);
    }

    function removeFlight(id) {
        const endpoint = `flights/${id}`;
        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    return {
        add,
        getAllFlights,
        getAllFightsMasterAuth,
        getFlightById,
        getFlightByIdKinveyAuth,
        edit,
        removeFlight
    }
})();