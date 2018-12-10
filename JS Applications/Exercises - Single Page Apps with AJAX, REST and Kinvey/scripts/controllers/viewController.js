; const viewController = (function () {

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if(viewName === 'viewAds'){
            adsController.loadAds();
        }
    }

    function renderViewAds() {
        showView('viewAds');
    }

    function navigateTo(event) {
        const viewName = $(event.target).attr('data-target');
        showView(viewName);
    }

    // Shows only the correct links for a logged in user
    function userLoggedIn() {
        const username = localStorage.getItem('username');
        $('#loggedInUser').text(`Welcome ${username}`).show();

        $('#linkHome').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();

        $('#linkLogin').hide();
        $('#linkRegister').hide();
    }

    // Shows only the correct links for an anonymous user
    function userLoggedOut() {
        $('#loggedInUser').text('').hide();

        $('#linkHome').show();
        $('#linkLogin').show();
        $('#linkRegister').show();

        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
    }

    return {
        showView,
        userLoggedIn,
        userLoggedOut,
        navigateTo,
        renderViewAds
    }
})();