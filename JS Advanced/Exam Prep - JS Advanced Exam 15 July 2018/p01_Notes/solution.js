function addSticker() {
    let $title = $('input.title').val().trim();
    let $content = $('input.content').val().trim();

    if ($title === null || $title === ''
        || $content === null || $content === '') {
        return;
    }

    $('ul#sticker-list')
        .append($('<li class="note-content">')
            .append($('<a class="button">x</a>')
                .on('click', deleteSticker))
            .append($(`<h2>${$title}</h2>`))
            .append($(`<hr>`))
            .append($(`<p>${$content}</p>`)));

    $('input.title').val('');
    $('input.content').val('');

    function deleteSticker() {
        $(this).parent().remove();
    }
}