function attachEvents() {
    const url = "https://jsappsfirstdemoproject-1bc66.firebaseio.com/messenger.json";
    const $authorField = $('#author');
    const $contentField = $('#content');
    const $messagesBox = $('#messages');

    $('#submit').on('click', submitMessage);
    $('#refresh').on('click', refreshMessages);

    function submitMessage() {
        let author = $authorField.val();
        let content = $contentField.val();

        if (author.trim() !== '' && content.trim() !== '') {
            let timestamp = Date.now();
            let data = {author, content, timestamp};

            $.post(url, JSON.stringify(data))
                .then(refreshMessages)
        }

        $contentField.val('');
    }

    function refreshMessages() {
        $messagesBox.empty();
        $.get(url)
            .then(data => {
                Object.values(data)
                    .sort((a, b) => a['timestamp'] - b['timestamp'])
                    .forEach(message => {
                        $messagesBox.append(`${message['author']}: ${message['content']}\n`);
                    });
            });
    }
}