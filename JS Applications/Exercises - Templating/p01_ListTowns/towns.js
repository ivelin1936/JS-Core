function attachEvents() {
    $('#btnLoadTowns').click(getTownsInfo);

    function getTownsInfo() {
        const townsData = $('#towns').val()
            .split(',')
            .filter(e => e.trim() !== '')
            .reduce((acc, cur) => {
                acc.towns.push({'town': cur});
                return acc;
            }, {'towns': []});

        renderTowns(townsData);
    }

    async function renderTowns(towns) {
        let source = await $.get('template.hbs');
        let template = Handlebars.compile(source);

        $('#root').html(template(towns));
        $('#towns').val('');
    }
}