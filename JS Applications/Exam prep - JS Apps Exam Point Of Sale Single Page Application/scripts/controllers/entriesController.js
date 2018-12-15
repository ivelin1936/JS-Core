const entriesController = (function () {

    function getEntriesByReceiptId(context) {
        return entriesModel.getByReceiptId(context.receiptId)
            .then(function (response) {
                context.entries = response;
                context.productCount = response.length;

                context.total = 0;
                context.entries.forEach(en => {
                    en.subTotal = (en.price * en.qty).toFixed(2);
                    context.total += +en.subTotal;
                });
                context.total = context.total.toFixed(2);
            });
    }

    function addNewEntry(context) {
        if (!validator.isValidEntryForm(context)) {
            return;
        }

        const data = {
            type: context.params.type,
            qty: context.params.qty,
            price: context.params.price,
            receiptId: $('input[name=receiptId]').val()
        };

        entriesModel.addEntry(data)
            .then(function () {
                handler.showInfo(`Entry added`);
                context.redirect('#/editor');
            })
    }

    function deleteEntry(context) {
        const entryId = context.params._id.substring(1);

        entriesModel.removeEntry(entryId)
            .then(function () {
                handler.showInfo(`Entry removed`);
                context.redirect('#/editor');
            })
    }

    return {
        getEntriesByReceiptId,
        addNewEntry,
        deleteEntry
    }
})();