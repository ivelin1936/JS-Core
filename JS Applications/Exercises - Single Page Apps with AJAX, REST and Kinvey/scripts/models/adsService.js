; const adsService = (function () {

    function loadAds() {
        return requester.get('appdata', 'ads', 'kinvey');
    }

    function createAd(data) {
        return requester.post('appdata', 'ads', 'kinvey', data);
    }

    function removeAd(adId) {
        const endpoint = `ads/${adId}`;
        return requester.remove('appdata', endpoint, 'kinvey');
    }

    function getAdById(adId) {
        const endpoint = `ads/${adId}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    function editAd(id, data) {
        const endpoint = `ads/${id}`;
        return requester.update('appdata', endpoint, 'kinvey', data);
    }

    return {
        loadAds,
        createAd,
        removeAd,
        getAdById,
        editAd
    }
})();