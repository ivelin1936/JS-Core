class PublicTransportTable {
    constructor(town) {
        $('caption').text(`${town}'s Public Transport`);
        this._init();
        this._db = [];
    }

    addVehicle(vehicleObj) {
        let $button = $('<button>').text(`More Info`);
        $button.on('click', _showMoreInfo);

        $('tbody.vehicles-info')
            .append(
                $('<tr>')
                    .append($('<td>').text(`${vehicleObj.type}`))
                    .append($('<td>').text(`${vehicleObj.name}`))
                    .append($button));

        function _showMoreInfo() {
            $(this).unbind('click');
            $(this).text('Less Info');
            $(this).on('click', showLessInfo);

            let $info = $('<tr class="more-info">')
                .append($('<td colspan="3">')
                    .append($('<table>')
                        .append(`<tr><td>Route: ${vehicleObj.route}</td></tr>`)
                        .append(`<tr><td>Price: ${vehicleObj.price}</td></tr>`)
                        .append(`<tr><td>Driver: ${vehicleObj.driver}</td></tr>`)
                    )
                );

            $($(this).parent()[0]).after($info);
        }

        function showLessInfo() {
            $(this).unbind('click');

            $(this).text('More Info');
            $(this).on('click', _showMoreInfo);

            let $el = $($(this).parent()).next()[0];
            $el.remove();
        }
    }

    _init() {
        $('button.search-btn').on('click', searching);
        $('button.clear-btn').on('click', clearAllFilters);

        function searching() {
            let $typeInputVal = $('input[name="type"]').val();
            let $nameInputVal = $('input[name="name"]').val();

            if ($typeInputVal.trim() !== '') {
                let $allTr = $('tbody.vehicles-info tr');
                for (let tr of $allTr) {
                    let currentVal = $($(tr).children()[0]).text();
                    if (!currentVal.includes($typeInputVal)) {
                        $(tr).hide();
                    }
                }
            }
            if ($nameInputVal.trim() !== '') {
                let $allTr = $('tbody.vehicles-info tr');
                for (let tr of $allTr) {
                    let currentVal = $($(tr).children()[1]).text();
                    if (!currentVal.includes($nameInputVal)) {
                        $(tr).hide();
                    }
                }
            }

            //Removes any additional vehicle rows, that are displaying the
            //extra data (route, price, driver)
            function removeAdditionalRows() {
                let $buttons = $('tbody.vehicles-info button');
                //TODO...
            }
        }

        function clearAllFilters() {
            let $allTr = $('tbody.vehicles-info tr');
            //Show all rows data
            for (let tr of $allTr) {
                $(tr).show();
            }
            //Clear the input boxes
            $('input[name="type"]').val('');
            $('input[name="name"]').val('');
        }
    }
}