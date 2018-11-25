function attachEvents() {
    const url = `https://jsappsfirstdemoproject-1bc66.firebaseio.com/phonebook`;
    // const url = `https://phonebook-nakov.firebaseio.com/phonebook`;
    let $personInput = $('#person');
    let $phoneInput = $('#phone');
    let $createBtn = $('#btnCreate');
    let $loadBtn = $('#btnLoad');
    let $phonebook = $('#phonebook');

    $loadBtn.on('click', loadPhoneBooks);
    $createBtn.on('click', submitData);

    function submitData() {
        if ($personInput.val().trim() !== '' && $phoneInput.val().trim() !== '') {
            let data = {
                person: $personInput.val(),
                phone: $phoneInput.val()
            };

            $.post(`${url}.json`, JSON.stringify(data))
                .then(() => loadPhoneBooks());

            $personInput.val('');
            $phoneInput.val('');
        }
    }

    function loadPhoneBooks() {
        $phonebook.empty();

        $.get(`${url}.json`)
            .then(data => {
                Object.keys(data)
                    .forEach(key => {
                        $phonebook.append($(`<li>${data[key].person}: ${data[key].phone} </li>`)
                            .append($(`<button>[Delete]</button>`)
                                .on('click', () => deleteData(key)))
                        );
                    })
            })
    }

    function deleteData(key) {
        $.ajax({
            url: `${url}/${key}.json`,
            method: 'DELETE'
        })
            .then(() => loadPhoneBooks());
    }
}
