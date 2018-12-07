; const homeController = (function () {

    /** Fn for Load and Render Home Template/Partial */
    function renderHomePage(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.teamId = sessionStorage.getItem('teamId') !== 'undefined'
            || sessionStorage.getItem('teamId') !== null;

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        });
    }

    return {
        renderHomePage
    }
})();