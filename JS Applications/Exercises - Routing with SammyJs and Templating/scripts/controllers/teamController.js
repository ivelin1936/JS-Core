;const teamController = (function () {

    /** Fn for Load and Render Team details Template/Partial */
    function showTeamDetails(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.teamId = context.params._id.substring(1);
        context.isOnTeam = sessionStorage.getItem('teamId') !== "undefined"
            && sessionStorage.getItem('teamId') === context.teamId;

        auth.getUsers()
            .then(resp => {
                context.members = resp.filter((key) => key.teamId === context.teamId);

                this.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    teamMember: './templates/catalog/teamMember.hbs',
                    teamControls: './templates/catalog/teamControls.hbs'
                }).then(function () {
                    teamsService.loadTeamDetails(context.teamId)
                        .then(res => {
                            context.isAuthor = sessionStorage.getItem('userId') === res._acl.creator;
                            context.name = res.name;
                            context.comment = res.comment;

                            this.partial('./templates/catalog/details.hbs');
                        }).catch(auth.handleError);
                });

            }).catch(auth.handleError);
    }

    /** Fn for Get listener on myTeam ( in catalog ) */
    function showMyTeamDetails(context) {
        const myTeamId = sessionStorage.getItem('teamId');
        context.redirect(`#/catalog/:${myTeamId}`);
    }

    /** Fn for Get listener on delete ( team ) */
    function deleteTeam(context) {
        const teamId = context.params.teamId.substring(1);

        teamsService.deleteTeam(teamId)
            .then(function (res) {
                auth.showInfo(`The team was successfully deleted!`);
                leaveTeam(context);
                context.redirect('#/catalog');
            }).catch(auth.handleError);
    }

    /** Fn for Post listener on edit ( team ) */
    function edit(context) {
        const teamId = sessionStorage.getItem('teamId');
        const name = context.params.name;
        const description = context.params.comment;

        if (name.trim() === ''){
            auth.showError(`Team name cannot be empty`);
            return;
        }

        teamsService.edit(teamId, name, description)
            .then(function (res) {
                auth.showInfo(`Successfully edited!`);
                context.redirect(`#/catalog/:${teamId}`);

            }).catch(auth.handleError);
    }

    /** Fn for Get listener on edit ( team ) */
    function renderEdit(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            editForm: './templates/edit/editForm.hbs'
        }).then(function (res) {
            this.partial('./templates/edit/editPage.hbs');
        })
    }

    /** Fn for Get listener on join ( into the team ) */
    function joinTeam(context) {
        const teamId = context.params.teamId.substring(1);
        const hasTeam = sessionStorage.getItem('teamId') !== 'undefined';

        if (!hasTeam) {
            teamsService.joinTeam(teamId)
                .then(res => {
                    sessionStorage.clear();
                    auth.saveSession(res);
                    auth.showInfo(`Successfully joined!`);
                    context.redirect(`#/catalog/:${teamId}`);
                });
        } else {
            auth.showError(`Can't join in new team, unless you leaves of your own team!`);
            context.redirect(`#/catalog/:${teamId}`);
        }
    }

    /** Fn for Get listener on leave ( team ) */
    function leaveTeam(context) {
        teamsService.leaveTeam()
            .then(function (res) {
                sessionStorage.clear();
                auth.saveSession(res);
                auth.showInfo(`Successfully leave the team!`);
                context.redirect('#/catalog');
            }).catch(auth.handleError);
    }

    /** Fn for Post listener on create */
    function createTeam(context) {
        const hasTeam = sessionStorage.getItem('teamId') !== 'undefined';
        const username = sessionStorage.getItem('username');

        if (!hasTeam) {
            const name = this.params.name;
            const comment = this.params.comment;

            if (name.trim() === ''){
                auth.showError(`Team name cannot be empty`);
                return;
            }

            teamsService.createTeam(name, comment)
                .then(function (response) {
                    auth.showInfo(`Team ${name} was successfully created!`);
                    const teamId = response._id;

                    teamsService.joinTeam(teamId)
                        .then(function (res) {
                            auth.saveSession(res);
                            context.redirect('#/catalog');
                        });
                }).catch(auth.handleError);
        } else {
            auth.showError(`Can't create a team, unless you leaves your's one!`);
        }
    }

    /** Fn for Get listener on create (in catalog) Render Create Template/Partial*/
    function renderCreate(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            createForm: './templates/create/createForm.hbs'
        }).then(function () {
            this.partial('./templates/create/createPage.hbs');
        })
    }

    return {
        showTeamDetails,
        showMyTeamDetails,
        deleteTeam,
        edit,
        renderEdit,
        joinTeam,
        leaveTeam,
        createTeam,
        renderCreate
    }
})();