function attachEvents() {
    const baseSurviceUrl = "https://baas.kinvey.com/appdata/kid_HkmxJKbAm/biggestCatches";
    // const base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const kinveyAuthorization = `Basic a2lkX0hrbXhKS2JBbTo5NGQwMTJiNWNmNWM0Nzc0OTY3OThlNDcxMDI0NThkMw==`

    $('.load').click(listAllCatches);
    $('.add').click(createNewCatch);

    function listAllCatches() {
        const request = {
            url: baseSurviceUrl,
            method: "GET",
            headers: {
                "Authorization": kinveyAuthorization
            }
        };

        $.ajax(request)
            .then(displayCatches);
    }

    function displayCatches(catches) {
        $('#catches').empty();

        for (let catche of catches) {
            $('#catches')
                .append($('<div>').addClass("catch").attr("data-id", catche._id)
                    .append($('<label>').text("Angler"))
                    .append($('<input>').attr("type", "text").addClass("angler").val(catche.angler))
                    .append($('<label>').text("Weight"))
                    .append($('<input>').attr("type", "number").addClass("weight").val(catche.weight))
                    .append($('<label>').text("Species"))
                    .append($('<input>').attr("type", "text").addClass("species").val(catche.species))
                    .append($('<label>').text("Location"))
                    .append($('<input>').attr("type", "text").addClass("location").val(catche.location))
                    .append($('<label>').text("Bait"))
                    .append($('<input>').attr("type", "text").addClass("bait").val(catche.bait))
                    .append($('<label>').text("Capture Time"))
                    .append($('<input>').attr("type", "number").addClass("captureTime").val(catche.captureTime))
                    .append($('<button>').addClass("update").text("Update").click(updateCatch))
                    .append($('<button>').addClass("delete").text("Delete").click(deleteCatch))
                );
        }
    }

    function createNewCatch() {
        let inputs = $(this).parent().find('input');
        const newCatchData = JSON.stringify({
            angler: $(inputs[0]).val(),
            weight: +($(inputs[1]).val()),
            species: $(inputs[2]).val(),
            location: $(inputs[3]).val(),
            bait: $(inputs[4]).val(),
            captureTime: +($(inputs[5]).val())
        });

        const request = {
            url: baseSurviceUrl,
            method: "POST",
            headers: {
                "Authorization": kinveyAuthorization,
                "Content-type": "application/json"
            },
            data: newCatchData
        };

        $.ajax(request)
            .then(listAllCatches);

        for (let input of inputs) {
            $(input).val('');
        }
    }

    function updateCatch() {
        let inputs = $(this).parent().find('input');
        let catchId = $(this).parent().attr('data-id');

        const newData = JSON.stringify({
            angler: $(inputs[0]).val(),
            weight: +($(inputs[1]).val()),
            species: $(inputs[2]).val(),
            location: $(inputs[3]).val(),
            bait: $(inputs[4]).val(),
            captureTime: +($(inputs[5]).val())
        });

        const request = {
            url: baseSurviceUrl + "/" + catchId,
            method: "PUT",
            headers: {
                "Authorization": kinveyAuthorization,
                "Content-type": "application/json"
            },
            data: newData
        };

        $.ajax(request)
            .then(listAllCatches);
    }

    function deleteCatch() {
        let catchId = $(this).parent().attr('data-id');

        const request = {
            url: baseSurviceUrl + "/" + catchId,
            method: "DELETE",
            headers: {
                "Authorization": kinveyAuthorization
            }
        };

        $.ajax(request)
            .then(listAllCatches)
    }
}