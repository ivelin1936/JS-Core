; const catalogController = (function () {

    /** Fn for Load and Render Catalog Template/Partial */
    function showCatalog(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.teamId = sessionStorage.getItem('teamId') !== 'undefined'
            || sessionStorage.getItem('teamId') !== null;
        context.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            team: './templates/catalog/team.hbs'
        }).then(function () {
            teamsService.loadTeams()
                .then((respons) => {
                    context.teams = respons;
                    this.partial('./templates/catalog/teamCatalog.hbs');
                });
        })
    }

    return {
        showCatalog
    }
})();