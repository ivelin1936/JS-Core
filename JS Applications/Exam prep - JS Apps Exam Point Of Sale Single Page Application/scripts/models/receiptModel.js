;const receiptModel = (function () {

    function getActiveReciept(userId) {
        const query = `?query={"_acl.creator":"${userId}","active":"true"}`;
        const endpoint = `receipts${query}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    function createNewReceipt() {
        const data = {
            "active": true,
            "productCount": 0,
            "total": 0
        };
        return requester.post('appdata', 'receipts', 'Kinvey', data);
    }

    function updateReceipt(receiptId, data) {
        const endpoint = `receipts/${receiptId}`;
        return requester.update('appdata', endpoint, 'Kinvey', data);
    }

    function getUserReceipts(userId) {
        const query = `?query={"_acl.creator":"${userId}","active":"false"}`;
        const endpoint = `receipts${query}`;
        return requester.get('appdata', endpoint, 'Kinvey');
    }

    return {
        getActiveReciept,
        createNewReceipt,
        updateReceipt,
        getUserReceipts
    }
})();