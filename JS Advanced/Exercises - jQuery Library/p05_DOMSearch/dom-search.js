function domSearch(selector, isCaseSensitive) {
    addControls();
    addSearchControls();
    addResultControls();

    //Add <div> with result list
    function addResultControls() {
        let $div = $(`<div class="result-controls "></div>`)
            .append($('<ul class="items-list"></ul>'));
        $(selector).append($div);
    }

    //Adding event listener to search <input>
    function addEventListenerToSearchInput() {
        let $input = $('div.search-controls :input');
        $input.on('change keyup paste cut', processSearching);

        //Hide all <li> in <ul> and show all who matched
        function processSearching() {
            let searchText = isCaseSensitive
                ? $input.val()
                : $input.val().toLowerCase();

            $(`ul.items-list li`)
                .css('display', 'none')
                .filter(function (index, elem) {
                    let elementText = isCaseSensitive
                        ? elem.textContent.substring(1)
                        : elem.textContent.substring(1).toLowerCase();

                    return elementText.startsWith(searchText);
                })
                .css('display', 'block');
        }
    }

    //Add <div> with search controls
    function addSearchControls() {
        let $div = $(`<div class="search-controls"></div>`)
            .append($(`<label>Search: <input></label>`));

        $(selector).append($div);
        addEventListenerToSearchInput();
    }

    //Add <div> with add controls
    function addControls() {
        let $div = $(`<div class="add-controls"></div>`)
            .append($('<label>Enter text: <input></label>'))
            .append($('<a class="button" style="display: inline-block;">Add</a>')
                .on('click', addControlBtnFn));

        $(selector).append($div);

        //Event btn adding function
        function addControlBtnFn() {
            let $text = $('div.add-controls :input').val();

            if ($text !== null && $text !== '') {
                let $delBtn = $(`<a class="button">X</a>`).on('click', deleteItemFn);
                let $li = $(`<li class="list-item"></li>`)
                    .append($delBtn)
                    .append(`<strong>${$text}</strong>`);

                $('.result-controls ul.items-list').append($li);
                $('div.add-controls :input').val('');
            }

            //Delete parent on current element
            function deleteItemFn() {
                $(this).parent().remove();
            }
        }
    }

}