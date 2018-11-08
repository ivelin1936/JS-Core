function addDestination() {
    /** Getting input fields values */
    let cityInput = $('div#input input')[0].value;
    let countryInput = $('div#input input')[1].value;

    /** If Someone of the fields is empty do not append nothing */
    if (cityInput === null || cityInput === ''
        || countryInput === null || countryInput === '') {
        return;
    }

    /** Append the new destination to the destinationList */
    let ssn = $('#seasons.custom-select').val();
    let season = ssn.charAt(0).toUpperCase() + ssn.substring(1);

    $('#destinationsList').append(
        $('<tr>')
            .append(`<td>${cityInput}, ${countryInput}</td>`)
            .append(`<td>${season}</td>`)
    );

    /** Clear input fields values */
    $('div#input input')[0].value = '';
    $('div#input input')[1].value = '';

    let numPerSeason = $(`#summaryBox input.summary#${ssn}`).val();
    $(`#summaryBox input.summary#${ssn}`).val(+numPerSeason + 1);
}