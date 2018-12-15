;const viewController = (function () {

    function ctxHandler(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.userId = sessionStorage.getItem('userId');
    }

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        ctxHandler(context);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            login: './templates/welcome/login.hbs',
            register: './templates/welcome/register.hbs',
        }).then(function () {
            this.partial('./templates/welcome/welcome.hbs');
        })
    }

    /** Fn for Load and Render Editor Template/Partial */
    function renderEditorPage(context) {
        ctxHandler(context);
        context.inEditor = true;

        receiptController.getActiveReceipt(context)
            .then(function () {
                entriesController.getEntriesByReceiptId(context)
                    .then(function () {
                        context.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                        }).then(function () {

                            this.partial('./templates/create/editor.hbs');
                        })
                    }).catch(handler.handleError);
            }).catch(handler.handleError);
    }

    /** Fn for Load and Render MyReceipts Template/Partial */
    function renderOverview(context) {
        ctxHandler(context);

        receiptController.getUserReceipts(context)
            .then(function () {
                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/receipt/allReceipts.hbs');
                })
            }).catch(handler.handleError);

    }

    function renderReceiptDetails(context) {
        ctxHandler(context);
        context.receiptId = context.params._id.substring(1);

        entriesController.getEntriesByReceiptId(context)
            .then(function () {
                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/receipt/details.hbs');
                })
            })
    }

    return {
        renderHomePage,
        renderEditorPage,
        renderOverview,
        renderReceiptDetails
    }
})();