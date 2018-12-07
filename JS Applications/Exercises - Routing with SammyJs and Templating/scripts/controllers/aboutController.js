; const aboutController = (function () {

    /** Fn for Load and Render About Template/Partial */
    function renderAboutPage(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/about/about.hbs');
        });
    }

    return {
        renderAboutPage
    }
})();