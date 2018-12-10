;const adsController = (function () {

    const templates = {};

    (async function loadTemplates() {
        const [adsCatalogTemplate, adBoxTemplate]
            = await Promise.all([
            $.get('./templates/ads-catalog.html'),
            $.get('./templates/ad-box-partial.html')
        ]);

        templates['catalog'] = Handlebars.compile(adsCatalogTemplate);
        Handlebars.registerPartial('adBox', adBoxTemplate);
    })();

    // Load all ads
    function loadAds() {
        const userId = localStorage.getItem('id');

        adsService.loadAds()
            .then(function (response) {
                const $viewAds = $('#viewAds');

                const allAds = {ads: response};
                allAds.ads.forEach(ad => {
                    ad.isAuthor = ad._acl.creator === userId;
                });

                $viewAds.html(templates.catalog(allAds));

                $viewAds.find('button.ad-control.delete').click(deleteAd);
                $viewAds.find('button.ad-control.edit').click(openEditAdd);

            }).catch(handler.handleError);
    }

    // Create an add
    function createAd(event) {
        const createForm = $('form#formCreateAd');

        let titleInp = createForm.find('input[name=title]');
        let descriptionInp = createForm.find('textarea[name=description]');
        let priceInp = createForm.find('input[name=price]');
        let imageUrlInp = createForm.find('input[name=imageUrl]');

        if (isFormValid(createForm)) {
            const data = {
                publisher: localStorage.getItem('username'),
                title: titleInp.val(),
                description: descriptionInp.val(),
                price: priceInp.val(),
                imageUrl: imageUrlInp.val()
            };

            adsService.createAd(data)
                .then(function (res) {
                    viewController.navigateTo(event);
                    handler.showInfo(`Successfully added!`);
                }).catch(handler.handleError);
        } else {
            handler.showError(`Title, description fields can't be empty! Price can't be 0!`);
            return;
        }

        //Clear all fields
        titleInp.val('');
        descriptionInp.val('');
        priceInp.val('');
        imageUrlInp.val('');
    }

    // Delete an add
    function deleteAd(event) {
        const adId = $(event.target).parent().attr('data-id');

        adsService.removeAd(adId)
            .then(function (res) {
                viewController.navigateTo(event);
                handler.showInfo(`Successfully removed!`);
            }).catch(handler.handleError);
    }

    // Edit an add
    async function editAd(adId, publisher) {
        const editForm = $('form#formEditAd');
        const data = {
            publisher: publisher,
            title: editForm.find('input[name=title]').val(),
            description: editForm.find('textarea[name=description]').val(),
            price: editForm.find('input[name=price]').val(),
            imageUrl: editForm.find('input[name=imageUrl]').val()
        };

        if (isFormValid(editForm)) {
            adsService.editAd(adId, data)
                .then(function (res) {
                    handler.showInfo(`Successfully edited!`);
                }).catch(handler.handleError);
        } else {
            handler.showError(`Title, description fields can't be empty! Price can't be 0!`);
        }
    }

    // Open edit add view
    function openEditAdd(event) {
        event.preventDefault();
        event.stopPropagation();

        const adId = $(event.target).parent().attr('data-id');

        adsService.getAdById(adId)
            .then(function (response) {
                viewController.navigateTo(event);

                const editForm = $('form#formEditAd');
                editForm.find('input[name=title]').val(response.title);
                editForm.find('textarea[name=description]').text(response.description);
                editForm.find('input[name=price]').val(response.price);
                editForm.find('input[name=imageUrl]').val(response.imageUrl);

                $('input#buttonEditAd')
                    .click(function (event) {
                        event.preventDefault();

                        console.log(response);
                        editAd(adId, response.publisher);
                        viewController.renderViewAds();
                    });
            }).catch(handler.handleError);
    }

    function isFormValid($form) {
        let titleInp = $form.find('input[name=title]');
        let descriptionInp = $form.find('textarea[name=description]');
        let priceInp = $form.find('input[name=price]');
        let imageUrlInp = $form.find('input[name=imageUrl]');

        return titleInp.val().trim() !== ''
            && descriptionInp.val().trim() !== ''
            && priceInp.val() !== ''
            && priceInp.val() > 0;
    }

    return {
        loadAds,
        createAd,
        deleteAd,
        editAd,
        openEditAdd
    }
})();