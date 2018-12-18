;const petController = (function () {

    /** Fn loading dashboard pets sorted by likes, returning Promise*/
    function loadDashboardPets(context) {
        return petModel.getDashboardPets()
            .then(function (res) {
                context.pets = res
                    .filter(p => p._acl.creator !== context.userId)
                    .sort((a, b) => b.petLikes - a.petLikes);
            });
    }

    /** Fn for add pet */
    function addPet(context) {
        const data = {
            category: context.params.category,
            description: context.params.description,
            imageURL: context.params.imageURL,
            name: context.params.name,
            petLikes: 0
        };

        //TODO -> Don't have validation by the task, but will be good to make!!!

        petModel.addPet(data)
            .then(function (res) {
                handler.showInfo('Pet created.');
                context.redirect('#/dashboard');
            }).catch(handler.handleError);
    }

    // //Change likes count in UI and in DB real-time, But doesn't sort pets real-time
    // /** Fn for sending likes from everywhere - without redirect */
    // function like(context) {
    //     const petId = context.params._id.substring(1);
    //
    //     let currentLikes = $(`counter#${petId}`).text();
    //     let newLikes = +currentLikes + 1;
    //     $(`counter#${petId}`).text(`${newLikes}`);
    //
    //     petModel.getPetById(petId)
    //         .then(function (response) {
    //             let likes = +response.petLikes + 1;
    //             const data = {
    //                 category: response.category,
    //                 description: response.description,
    //                 imageURL: response.imageURL,
    //                 name: response.name,
    //                 petLikes: likes
    //             };
    //             petModel.updatePetById(petId, data)
    //                 .catch(handler.handleError);
    //         }).catch(handler.handleError);
    // }

    /** Fn for sending likes in dashboard */
    function sentLike(context) {
        like(context, `#/dashboard`);
    }

    /** Fn for sending likes in details page */
    function sentLikeInDetailsPage(context) {
        const petId = context.params._id.substring(1);
        like(context, `#/details/:${petId}`);
    }

    function like(context, redirectPage) {
        const petId = context.params._id.substring(1);

        petModel.getPetById(petId)
            .then(function (response) {
                let likes = +response.petLikes + 1;
                const data = {
                    category: response.category,
                    description: response.description,
                    imageURL: response.imageURL,
                    name: response.name,
                    petLikes: likes
                };
                petModel.updatePetById(petId, data)
                    .then(function (res) {
                        context.redirect(redirectPage);
                    }).catch(handler.handleError);
            }).catch(handler.handleError);
    }

    /** Fn for deleting pet */
    function remove(context) {
        const petId = context.params._id.substring(1);

        petModel.remove(petId)
            .then(function () {
                handler.showInfo(`Pet removed successfully!`);
                context.redirect('#/dashboard');
            }).catch(handler.handleError);
    }

    /** Fn for save edit pet */
    function edit(context) {
        const petId = context.params._id.substring(1);
        const newDescription = context.params.description;

        petModel.getPetById(petId)
            .then(function (response) {
                const data = {
                    category: response.category,
                    description: newDescription,
                    imageURL: response.imageURL,
                    name: response.name,
                    petLikes: response.petLikes
                };

                petModel.edit(petId, data)
                    .then(function (res) {
                        handler.showInfo(`Updated successfully!`);
                        context.redirect('#/dashboard');
                    }).catch(handler.handleError);
            }).catch(handler.handleError);
    }

    return {
        loadDashboardPets,
        addPet,
        sentLike,
        sentLikeInDetailsPage,
        remove,
        edit,
        // like
    }
})();