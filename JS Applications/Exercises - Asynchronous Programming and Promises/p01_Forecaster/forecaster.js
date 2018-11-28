function attachEvents() {
    const baseUrl = `https://judgetests.firebaseio.com`;
    const symbols = {
        'Sunny': '&#x2600;',        // ☀
        'Partly sunny': '&#x26C5;', // ⛅
        'Overcast': '&#x2601;',     // ☁
        'Rain': '&#x2614;',         // ☂
        'Degrees': '&#176;'         // °
    };

    let forecastDiv = $('#forecast');
    let currentDiv = $('#current');
    let upcomingDiv = $('#upcoming');

    $('#submit').click(loadData);

    function loadData() {
        $.get(`${baseUrl}/locations.json`)
            .then((data) => {
                let obj = data
                    .filter(e => e.name === $('#location').val());

                if (obj.length > 0) {
                    renderingForecaster(obj[0]);
                    forecastDiv.show();
                } else {
                    $('#forecast').text('Error');
                }
            })
            .catch((err) => {
                $('#forecast').text('Error');
            })
    }

    function renderingForecaster(obj) {
        Promise.all([
            $.get(`${baseUrl}/forecast/today/${obj['code']}.json`),
            $.get(`${baseUrl}/forecast/upcoming/${obj['code']}.json`)
        ])
            .then(([today, upcoming]) => {
                currentDiv.empty();
                currentDiv
                    .append(`<div class="label">Current conditions</div>`)
                    .append($(`<span class="condition symbol">${symbols[today.forecast.condition]}</span>`))
                    .append($('<span class="condition">')
                        .append(
                            $('<span class="forecast-data">').text(`${today.name}`))
                        .append(
                            $(`<span class="forecast-data">${today.forecast.low}${symbols.Degrees} / ${today.forecast.high}${symbols.Degrees}</span>`))
                        .append(
                            $('<span class="forecast-data">').text(`${today.forecast.condition}`))
                    );

                upcomingDiv.empty();
                upcomingDiv.append(`<div class="label">Three-day forecast</div>`);
                for (let day of upcoming.forecast) {
                    upcomingDiv.append(upcomingHTMLCreator(day))
                }
            })
            .catch(err => {
                $('#forecast').text('Error')
            });

        function upcomingHTMLCreator(data) {
            return `<span class="upcoming">`
                + `<span class="symbol">${symbols[data.condition]}</span>`
                + `<span class="forecast-data">${data.low}${symbols.Degrees} / ${data.high}${symbols.Degrees}</span>`
                + `<span class="forecast-data">${data.condition}</span>`
                + `</span>`;
        }
    }
}