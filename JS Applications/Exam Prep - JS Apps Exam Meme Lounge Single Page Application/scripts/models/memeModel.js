;const memeModel = (function () {

    function getAllMemes() {
        return requester.get('appdata', 'memes', 'Kinvey');
    }

    function create(data) {
        return requester.post('appdata', 'memes', 'Kinvey', data);
    }

    function getById(id) {
        const endpoint = `memes/${id}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function edit(id, data) {
        const endpoint = `memes/${id}`;
        return requester.update('appdata', endpoint, 'Kinvey', data);
    }

    function remove(id) {
        const endpoint = `memes/${id}`;
        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    function getAllMemesByCreator(username) {
        const endpoint = `memes/?query={"creator":"${username}"}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    return {
        getAllMemes,
        create,
        getById,
        edit,
        remove,
        getAllMemesByCreator
    }
})();