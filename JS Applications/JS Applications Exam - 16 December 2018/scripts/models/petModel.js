;const petModel = (function () {

    /** Fn for getting dashboard pets, return Promise */
    function getDashboardPets() {
        const query = `?query={}&sort={"likes": -1}`;
        return requester.get('appdata', `pets${query}`, 'Kinvey');
    }

    /** Fn for adding pet, return Promise */
    function addPet(data) {
        return requester.post('appdata', 'pets', 'Kinvey', data);
    }
    
    /** Fn for getting pet by id */
    function getPetById(petId) {
        return requester.get('appdata', `pets/${petId}`, 'Kinvey');
    }

    /** Fn for update pet by id, return Promise */
    function updatePetById(petId, data) {
        return requester.update('appdata', `pets/${petId}`, 'admin', data);
    }

    /** Fn for getting my pets, return Promise */
    function getMyPets(userId) {
        const query = `?query={"_acl.creator":"${userId}"}`;
        return requester.get('appdata', `pets${query}`, 'Kinvey');
    }

    /** Fn for remove pet, return Promise */
    function remove(petId) {
        return requester.remove('appdata', `pets/${petId}`, 'Kinvey');
    }

    /** Fn for edit pet, return Promise */
    function edit(petId, data) {
        return requester.update('appdata', `pets/${petId}`, 'Kinvey', data);
    }

    /** Fn for get pets by category criterion using query, return Promise */
    function getPetsByQueryCriterion(query) {
        return requester.get('appdata', `pets${query}`, 'Kinvey');
    }

    return {
        getDashboardPets,
        addPet,
        getPetById,
        updatePetById,
        getMyPets,
        remove,
        edit,
        getPetsByQueryCriterion
    }
})();