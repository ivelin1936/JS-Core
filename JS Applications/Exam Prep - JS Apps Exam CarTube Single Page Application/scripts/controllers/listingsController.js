;const listingsController = (function () {

    /** Fn for Get on delete listing */
    function deleteListing(context) {
        const listingId = context.params._id.substring(1);

        listingModel.removeListing(listingId)
            .then(function (res) {
                handler.showInfo(`Successfully deleted!`);
                viewController.allListings(context);
            }).catch(handler.handleError)
    }

    /** Fn for Post on edit listing */
    function edit(context) {
        if (!validator.isValidForm(context.params)) {
            return;
        }

        const carId = context.params.carId;
        const data = {
            seller: sessionStorage.getItem('username'),
            brand: context.params.brand,
            description: context.params.description,
            fuel: context.params.fuelType,
            imageUrl: context.params.imageUrl,
            model: context.params.model,
            price: context.params.price,
            title: context.params.title,
            year: context.params.year
        };

        listingModel.edit(carId, data)
            .then(function (res) {
                handler.showInfo(`Successfully edited!`);
                viewController.allListings(context);
            }).catch(handler.handleError);
    }

    /** Fn for Post on create listing */
    function create(context) {
        if (!validator.isValidForm(context.params)) {
            return;
        }

        const data = {
            seller: sessionStorage.getItem('username'),
            brand: context.params.brand,
            description: context.params.description,
            fuel: context.params.fuelType,
            imageUrl: context.params.imageUrl,
            model: context.params.model,
            price: context.params.price,
            title: context.params.title,
            year: context.params.year
        };

        listingModel.create(data)
            .then(function (res) {
                handler.showInfo(`Listing created.`);
                viewController.allListings(context);
            }).catch(handler.handleError);
    }

    return {
        deleteListing,
        edit,
        create
    }
})();