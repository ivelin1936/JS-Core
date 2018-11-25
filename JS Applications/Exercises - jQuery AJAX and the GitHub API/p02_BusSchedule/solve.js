function solve() {
    let $spanInfo = $('span.info');
    let $departBtn = $('#depart');
    let $arriveBtn = $('#arrive');

    let currentId = 'depot';
    let currentStopName;

    function depart() {
        $.ajax({
            method: 'GET',
            url: `https://judgetests.firebaseio.com/schedule/${currentId}.json `,
            success: display,
            error: throwError
        });

        function display(resource) {
            $departBtn.attr('disabled', true);
            $arriveBtn.attr('disabled', false);
            currentId = resource.next;
            currentStopName = resource.name;
            $spanInfo.text(`Next stop ${currentStopName}`);
        }

        function throwError(error) {
            $departBtn.attr('disabled', true);
            $arriveBtn.attr('disabled', true);
            $spanInfo.test(`Error`);
        }
    }

    function arrive() {
        $spanInfo.text(`Arriving at ${currentStopName}`);
        $departBtn.attr('disabled', false);
        $arriveBtn.attr('disabled', true);
    }

    return {
        depart,
        arrive
    };
}