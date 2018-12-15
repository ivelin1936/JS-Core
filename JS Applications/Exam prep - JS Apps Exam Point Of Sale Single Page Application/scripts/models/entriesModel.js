const entriesModel = (function () {

    function getByReceiptId(receiptId) {
        const query = `?query={"receiptId":"${receiptId}"}`;
        const endpoint = `entries${query}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function addEntry(data) {
        return requester.post('appdata', 'entries', 'Kinvey', data);
    }

    function removeEntry(entryId) {
        const endpoint = `entries/${entryId}`;
        return requester.remove('appdata', endpoint, 'Kinvey');
    }

    return {
        getByReceiptId,
        addEntry,
        removeEntry
    }
})();