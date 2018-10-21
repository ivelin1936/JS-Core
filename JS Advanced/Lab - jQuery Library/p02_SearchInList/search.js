function search() {
    let searchText = $('input#searchText').val().toLowerCase();

    const matchedTowns = $(`ul#towns li`)
        .css('font-weight', '')
        .filter(function (index, elem) {
            return elem.textContent.toLowerCase().indexOf(searchText) > -1;
        })
        .css('font-weight', 'bold')
        .length;

    $('div#result').text(`${matchedTowns} matches found.`);
}

// function search() {
//
//     let searchText = $('input#searchText').val();
//     searchText = searchText.charAt(0).toUpperCase() + searchText.substring(1);
//
//     let matchedTowns = $(`ul#towns li:contains('${searchText}')`);
//
//     $(`ul#towns li`).css('font-weight', '');
//     matchedTowns.css('font-weight', 'bold');
//
//     $('div#result').text(matchedTowns.length + ' matches found.')
// }

