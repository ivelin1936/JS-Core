function attachEventsListeners() {
    document.getElementById('daysBtn').addEventListener('click', convertDays);
    document.getElementById('hoursBtn').addEventListener('click', convertHours);
    document.getElementById('minutesBtn').addEventListener('click', convertMinutes);
    document.getElementById('secondsBtn').addEventListener('click', convertSeconds);

    function convertDays() {
        let daysValue = +document.getElementById('days').value;

        let hours = daysValue * 24;
        let minutes = hours * 60;
        let seconds = minutes * 60;

        document.getElementById('hours').value = hours;
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;
    }

    function convertHours() {
        let hoursValue = +document.getElementById('hours').value;

        let days = hoursValue / 24;
        let minutes = hoursValue * 60;
        let seconds = minutes * 60;

        document.getElementById('days').value = days;
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;
    }

    function convertMinutes() {
        let minutesValue = +document.getElementById('minutes').value;

        let hours = minutesValue / 60;
        let days = hours / 24;
        let seconds = minutesValue * 60;

        document.getElementById('days').value = days;
        document.getElementById('hours').value = hours;
        document.getElementById('seconds').value = seconds;
    }

    function convertSeconds() {
        let secondsValue = +document.getElementById('seconds').value;

        let minutes = secondsValue / 60;
        let hours = minutes / 60;
        let days = hours / 24;

        document.getElementById('days').value = days;
        document.getElementById('hours').value = hours;
        document.getElementById('minutes').value = minutes;
    }
}