function createBook(wrapperID, bookTitle, author, isbn) {
    let container = $(wrapperID);

    let existingBooks = container.find('[id^="book"]'); // ^= (starts with)
    let bookId = 'book' + (existingBooks.length + 1);

    container.append(
        $(`<div id=${bookId}>`).append(
            $(`<p class="title">${bookTitle}</p>`),
            $(`<p class="author">${author}</p>`),
            $(`<p class="isbn">${isbn}</p>`),
            $('<button>').text('Select').click(select),
            $('<button>').text('Deselect').click(deselect)
        ));

    function select() {
        $(this).parent().css('border', '2px solid blue');
    }

    function deselect() {
        $(this).parent().css('border', 'none');
    }
}