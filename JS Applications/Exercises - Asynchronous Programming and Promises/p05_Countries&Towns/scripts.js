function loadData() {
    const baseServicerUrl = 'https://baas.kinvey.com/appdata/kid_HkmxJKbAm/countries';
    const kinveyAuthorization = `Basic a2lkX0hrbXhKS2JBbTo5NGQwMTJiNWNmNWM0Nzc0OTY3OThlNDcxMDI0NThkMw==`;

    loadData();
    $('#addDataBtn').click(addCity);

    function addCity() {
        const country = $('#countryInp').val().trim();
        const city = $('#cityInp').val().trim();

        if (country !== '' && city !== '') {
            let request = {
                method: "POST",
                url: baseServicerUrl,
                headers: {
                    Authorization: kinveyAuthorization
                },
                data: {
                    "country": country,
                    "town": city
                }
            };

            $.ajax(request)
                .then(loadData);
        }

        $('#countryInp').val('');
        $('#cityInp').val('');
    }

    function loadData() {
        const request = {
            method: "GET",
            url: baseServicerUrl,
            headers: {
                Authorization: kinveyAuthorization
            }
        };

        $.ajax(request)
            .then(renderCountries);
    }

    function renderCountries(data) {
        let $div = $('#countriesContainer');
        $div.empty();

        const countries = data
            .map(d => d.country)
            .sort((a, b) => a.localeCompare(b));

        $div.append($(`<a href="#" class="list-group-item active">Countries List</a>`));
        for (let countryName of new Set(countries)) {
            $div.append(
                $(`<a href="#" class="list-group-item">${countryName}</a>`)
                    .click(renderTowns))
        }
    }

    async function renderTowns() {
        $(this).unbind("click");

        let div = $('<div>')
            .append(`<button type="button" class="btn btn-sm btn-info" id="LessBtn">Less Info</button>`)
            .append(`<ul id="list-group-towns">`);

        const townsData = await $.ajax({
            method: "GET",
            url: baseServicerUrl,
            headers: {
                Authorization: kinveyAuthorization
            }
        });

        townsData.sort((a, b) => {
            return a.town.localeCompare(b.town)
        });

        let townsList = $(div.find('#list-group-towns').prevObject[0]);
        const countryName = $(this).text();
        for (let t of townsData) {
            if (t.country === countryName) {
                townsList
                    .append($(`<li data-id="${t._id}" class="list-group-item list-group-item-info clearfix"><span style="position:absolute; top:30%;">${t.town}</span></li>`)
                        .append($(`<span class="pull-right button-group">`)
                            .append(`<button type="button" id="editBtn" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-edit"></span> Edit</button>`)
                            .append(`<button type="button" id="deleteBtn" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete</button>`))
                    );
            }
        }
        townsList.append($('<br>'));

        div.find('#deleteBtn').click(deleteCity);
        div.find('#editBtn').click(editCity);

        div.find('#LessBtn')
            .click(() => {
                div.remove();
                $(this).click(renderTowns);
            });

        div.insertAfter($(this))
    }

    function editCity() {
        $(this).unbind("click");
        let $listItem = $(this).parent().parent();
        const dataId = $listItem.attr('data-id');

        const inp = $(`<span id="editContainer"><br>
                <input type="text" placeholder="New country name (required)" class="form-control" id="countryEditInp">
                <input type="text" placeholder="New city name (required)" class="form-control" id="cityEditInp">
                <br>
                <button type="submit" class="btn btn-sm btn-success" id="updateBtn">Update</button>
                <button type="submit" class="btn btn-sm btn-info" id="backBtn">Back</button>
            <br><br></span>`);

        inp.find('#backBtn').click((e) => {
            $(e.target).parent().remove();
            $(this).click(editCity);
            $listItem.attr('class', 'list-group-item list-group-item-info clearfix');
        });

        inp.find('#updateBtn').click(() => {
            updateData(dataId)
        });

        $listItem.attr('class', 'list-group-item list-group-item-danger clearfix');

        inp.insertAfter($listItem);
    }

    function updateData(dataId) {
        const newCountry = $('#countryEditInp').val().trim();
        const newCity = $('#cityEditInp').val().trim();

        if (newCountry !== '' && newCity !== '') {
            const newData = JSON.stringify({
                country: newCountry,
                town: newCity
            });

            const request = {
                url: baseServicerUrl + "/" + dataId,
                method: "PUT",
                headers: {
                    "Authorization": kinveyAuthorization,
                    "Content-type": "application/json"
                },
                data: newData
            };

            $.ajax(request)
                .then(loadData);
        }
    }

    function deleteCity() {
        const dataId = $(this).parent().attr('data-id');

        const request = {
            url: baseServicerUrl + "/" + dataId,
            method: "DELETE",
            headers: {
                "Authorization": kinveyAuthorization
            }
        };

        $.ajax(request)
            .then($(this).parent().remove());
    }
}
