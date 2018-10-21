function attachEvents() {
    $('ul#items li').on('click', function () {
        let li = $(this);

        if (!li.attr('data-selected')) {
            li.attr('data-selected', 'true');
            li.css('background-color', '#DDD');
        } else {
            li.removeAttr('data-selected');
            li.css('background-color', '');
        }

        let selectedLi = $('#items li[data-selected=true]');
        let towns =
            selectedLi
                .toArray()
                .map(li => li.textContent)
                .join(', ');
        $('div#selectedTowns').text(`Selected towns: ${towns}`);
    });
}

// function attachEvents() {
//     $('ul#items li').on('click', function () {
//         let li = $(this);
//
//         if (!li.attr('data-selected')) {
//             li.attr('data-selected', 'true');
//             li.css('background-color', '#DDD');
//         } else {
//             li.removeAttr('data-selected');
//             li.css('background-color', '');
//         }
//     });
//
//     $('#showTownsButton').on('click', function () {
//         let selectedLi = $('#items li[data-selected=true]');
//         let towns = selectedLi.toArray().map(li => li.textContent).join(', ');
//         $('div#selectedTowns').text(`Selected towns: ${towns}`);
//     })
// }