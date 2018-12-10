function startApp() {

    // Attach click events
    (() => {
        $('header').find('a[data-target]').click(viewController.navigateTo);
        $('#buttonLoginUser').click(userController.login);
        $('#buttonRegisterUser').click(userController.register);
        $('#linkLogout').click(userController.logout);
        $('#buttonCreateAd').click(adsController.createAd);

        $('.notification').click(function () {
            $(this).hide();
        });
    })();

    (function renderHomePageOnLoad() {
        if(localStorage.getItem('authtoken') !== null){
            viewController.userLoggedIn();
        } else {
            viewController.userLoggedOut();
        }

        viewController.showView('viewHome');
    })();
}