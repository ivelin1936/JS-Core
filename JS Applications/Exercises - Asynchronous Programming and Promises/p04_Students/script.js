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
                    .append(`<td class="id">${student.ID}</td>`)
                    .append(`<td class="firstName">${student.FirstName}</td>`)
                    .append(`<td class="lastName">${student.LastName}</td>`)
                    .append(`<td class="facultyNumber">${student.FacultyNumber}</td>`)
                    .append(`<td class="grade">${student.Grade}</td>`));
        }
    }
})();