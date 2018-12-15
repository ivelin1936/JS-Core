;const receiptController = (function () {

    function getActiveReceipt(context) {
        return receiptModel.getActiveReciept(context.userId)
            .then(function (response) {
                if (response.length > 0) {
                    context.receiptId = response[0]._id;
                    context.productCount = response[0].productCount;
                    context.total = response[0].total;
                } else {
                    receiptModel.createNewReceipt()
                        .then(function (resp) {
                            context.receiptId = resp._id;
                            context.productCount = resp.productCount;
                            context.total = resp.total;
                        })
                }
            });
    }

    function updateReceipt(context) {
        //Before carrying out any actions, make sure the receipt contains at
        //least one entry – the user should not be able to checkout an empty receipt!
        if (+context.params.productCount === 0) {
            handler.showError(`Not able to checkout an empty receipt!`);
            return;
        }

        const receiptId = context.params.receiptId;
        const data = {
            total: context.params.total,
            productCount: context.params.productCount,
            active: false
        };

        receiptModel.updateReceipt(receiptId, data)
            .then(function () {
                handler.showInfo(`Receipt checked out`);
                context.redirect('#/editor');
            })
    }

    function getUserReceipts(context) {
        return receiptModel.getUserReceipts(context.userId)
            .then(function (response) {
                context.receipts = response;

                context.totalPrice = 0;
                response.forEach(r => {
                    const date = new Date(r._kmd.lmt);
                    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const currentTime = `${date.getHours()}:${date.getMinutes()}`;
                    r.dateTime = `${currentDate} ${currentTime}`;
                    context.totalPrice += +r.total;
                });
                context.totalPrice = context.totalPrice.toFixed(2);
            })
    }

    return {
        getActiveReceipt,
        updateReceipt,
        getUserReceipts
    }
})();