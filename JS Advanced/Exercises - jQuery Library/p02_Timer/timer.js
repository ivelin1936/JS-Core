function timer() {
    let timeInterval = null;

    const $hours = $('span#hours');
    const $minutes = $('span#minutes');
    const $seconds = $('span#seconds');
    const $startButton = $('#start-timer');
    const $stopButton = $('#stop-timer');
    const $resetButton = $('#reset-timer');

    $startButton.on('click', startTimer);
    $stopButton.click(stopTimer);
    $resetButton.click(resetTimer);

    function resetTimer() {
        if (timeInterval === null) {
            $hours.text(`00`);
            $minutes.text(`00`);
            $seconds.text(`00`);
        }
    }

    function tick() {
        let currentHours;
        let currentMin;
        let currentSec = +$seconds.text() + 1;

        if (currentSec === 60) {
            currentSec = 0;
            currentMin = +$minutes.text() + 1;
        }
        if (currentMin > 59) {
            currentMin = 0;
            currentHours = +$hours.text() + 1;
        }
        if (currentHours === 24) {
            currentHours = 0;
            currentMin = 0;
            currentSec = 0;
        }

        $hours.text(currentHours < 10 ? `0${currentHours}` : currentHours);
        $minutes.text(currentMin < 10 ? `0${currentMin}` : currentMin);
        $seconds.text(currentSec < 10 ? `0${currentSec}` : currentSec);
    }

    function startTimer() {
        if (timeInterval === null) {
            timeInterval = setInterval(tick, 1000);
        }
    }

    function stopTimer() {
        clearInterval(timeInterval);
        timeInterval = null;
    }
}
