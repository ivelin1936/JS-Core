(function loadData() {
    const baseServiceUrl = `https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students`;
    const kinveyAuthorization = `Basic Z3Vlc3Q6Z3Vlc3Q=`;

    const request = {
        method: "GET",
        url: baseServiceUrl,
        headers: {
            Authorization: kinveyAuthorization
        }
    };

    $.ajax(request)
        .then(renderData);

    function renderData(data) {
        data.sort((a, b) => {
            return a.ID - b.ID
        });

        for (let student of data) {
            $('#results')
                .append($('<tr data-id="${student._id}">')
                    .append(`<th class="id">${student.ID}</th>`)
                    .append(`<th class="firstName">${student.FirstName}</th>`)
                    .append(`<th class="lastName">${student.LastName}</th>`)
                    .append(`<th class="facultyNumber">${student.FacultyNumber}</th>`)
                    .append(`<th class="grade">${student.Grade}</th>`));
        }
    }
})();