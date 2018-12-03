const baasUtil = utils;

function attachEvents() {
    loadPlayersData();
    $('#addPlayer').click(addNewPlayer);
}

function loadPlayersData() {
    const request = {
        method: `GET`,
        url: `${baasUtil.baseUrl}/players`,
        headers: baasUtil.authorization
    };

    $.ajax(request)
        .then(renderPlayers);
}

function renderPlayers(respond) {
    $('#players').empty();
    respond
        .forEach(player => {
            const playerDiv = playerHTMLBuilder(player);
            $('#players').append(playerDiv);
        })
}

function playerHTMLBuilder(player) {
    let htmlTemplate = $(` <div class="player" data-id="${player._id}">
            <div class="row">
                <label>Name:</label>
                <label class="name">${player.name}</label>
            </div>
            <div class="row">
                <label>Money:</label>
                <label class="money">${player.money}</label>
            </div>
            <div class="row">
                <label>Bullets:</label>
                <label class="bullets">${player.bullets}</label>
            </div>
            <button class="play">Play</button>
            <button class="delete">Delete</button>
        </div>`);

    attachPlayerButtonsEvents(htmlTemplate);

    return htmlTemplate;
}

function attachPlayerButtonsEvents(html) {
    //TODO => attach events to buttons
    let $playBtn = html.find('button.play');
    let $deleteBtn = html.find('button.delete');

    $deleteBtn.click(deletePlayer);
    $playBtn.click(play);
}

function getPlayer(event) {
    const playerDiv = $(event.target).parent();
    const dataId = playerDiv.attr('data-id');

    const request = {
        method: 'GET',
        url: `${baasUtil.baseUrl}/players/${dataId}`,
        headers: baasUtil.authorization
    };

    return $.ajax(request);
}

async function play(event) {
    const data = await getPlayer(event);
    let player = {
        dataId: data._id,
        money: +data.money,
        name: data.name,
        bullets: +data.bullets
    };

    loadCanvas(player);

    let saveBtn = $('button#save');
    let reloadBtn = $('button#reload');

    saveBtn.show();
    reloadBtn.show();
    $('#canvas').show();

    saveBtn.click(e => {
        e.preventDefault();
        save(player);
    });

    reloadBtn.click(e => {
        e.preventDefault();

        if (player.bullets < 6) {
            player.money -= 20;
            player.bullets = 6;
        }
    });
}

function save(player) {
    const request = {
        method: 'PUT',
        url: `${baasUtil.baseUrl}/players/${player.dataId}`,
        headers: baasUtil.authorization,
        data: {
            name: player.name,
            money: +player.money,
            bullets: +player.bullets
        }
    };

    $.ajax(request)
        .then(stopCurrentGame)
        .then(loadPlayersData);
}

function stopCurrentGame() {
    let canvas = document.getElementById("canvas");
    clearInterval(canvas.intervalId);

    $('button#save').hide();
    $('button#reload').hide();
}

function deletePlayer(event) {
    const playerDiv = $(event.target).parent();
    const dataId = playerDiv.attr('data-id');

    const request = {
        method: 'DELETE',
        url: `${baasUtil.baseUrl}/players/${dataId}`,
        headers: {
            Authorization: `Basic a2lkX0hrbXhKS2JBbTo5NGQwMTJiNWNmNWM0Nzc0OTY3OThlNDcxMDI0NThkMw==`
        }
    };

    $.ajax(request)
        .then(loadPlayersData);
}

function addNewPlayer() {
    const nameInput = $('#addName');
    const request = {
        method: 'POST',
        url: `${baasUtil.baseUrl}/players`,
        headers: baasUtil.authorization,
        data: {
            name: nameInput.val(),
            money: 500,
            bullets: 6
        }
    };

    $.ajax(request)
        .then(loadPlayersData)
        .then(nameInput.val(''));
}