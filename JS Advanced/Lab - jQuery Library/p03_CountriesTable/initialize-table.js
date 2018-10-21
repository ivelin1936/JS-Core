function initializeTable() {
    $(`a#createLink`).on('click', createNewRow);

    function createNewRow() {
        const newCountry = $(`#newCountryText`).val();
        const newCapital = $(`#newCapitalText`).val();

        if (newCountry !== null && newCountry !== ''
            && newCapital !== null && newCapital !== '') {
            addNewRow(newCountry, newCapital);
        }

        $('#newCountryText').val('');
        $('#newCapitalText').val('');
        fixRowLinks();
    }

    function addNewRow(newCountry, newCapital) {
        let newTableRow = $('<tr>')
            .append($("<td>").text(newCountry))
            .append($("<td>").text(newCapital))
            .append($("<td>")
                .append($("<a href='#'>[Up]</a>").on('click', moveRowUp))
                .append($("<a href='#'>[Down]</a>").on('click', moveRowDown))
                .append($("<a href='#'>[Delete]</a>").on('click', deleteRow)));

        newTableRow.css('display', 'none');
        $(`#countriesTable`).append(newTableRow);
        newTableRow.fadeIn();
    }

    function deleteRow() {
        let $row = $(this).closest("tr");
        $row.fadeOut(function () {
            $row.remove();
            fixRowLinks();
        });
    }

    function moveRowDown() {
        let $row = $(this).parents("tr:first");

        $row.fadeOut(function () {
            $row.insertAfter($row.next());
            $row.fadeIn();
            fixRowLinks();
        });
    }

    function moveRowUp() {
        let $row = $(this).parents("tr:first");

        $row.fadeOut(function () {
            $row.insertBefore($row.prev());
            $row.fadeIn();
            fixRowLinks();
        });
    }

    function fixRowLinks() {
        // Show all links in the table
        $('#countriesTable a').css('display', 'inline');

        // Hide [Up] link in first table data row
        let tableRows = $('#countriesTable tr');
        $(tableRows[2]).find("a:contains('Up')")
            .css('display', 'none');

        // Hide the [Down] link in the last table row
        $(tableRows[tableRows.length - 1]).find("a:contains('Down')")
            .css('display', 'none');
    }

}