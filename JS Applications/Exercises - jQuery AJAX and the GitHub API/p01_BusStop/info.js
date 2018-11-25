function getInfo() {
    let $stopIdInput = $('input#stopId');
    let $stopNameDiv = $('div#stopName');
    let $ul = $('ul#buses');

    let stopID = $stopIdInput.val();
    if (stopID.trim() !== '') {
        let url = `https://judgetests.firebaseio.com/businfo/${stopID}.json `;

        $.ajax({
            url,
            success: displayRepos,
            error: displayError
        });

        function displayRepos(stopObj) {
            $stopNameDiv.empty();
            $ul.empty();

            $stopNameDiv.text(`StopID: ${stopObj.name}`);

            for (let busId in stopObj.buses) {
                $ul.append(
                    $('<li>')
                        .text(`Bus ${busId} arrives in ${stopObj.buses[busId]} minutes`)
                );
            }
        }

        function displayError(err) {
            $stopNameDiv.text('Error');
        }

        $stopIdInput.text('');
    }
}