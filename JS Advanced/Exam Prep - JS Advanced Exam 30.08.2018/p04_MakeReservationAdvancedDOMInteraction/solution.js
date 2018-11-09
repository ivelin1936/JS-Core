function makeReservation(selector) {
    //Buttons
    const $submitBtn = $('button#submit');
    const $editBtn = $('button#edit');
    const $continueBtn = $('button#continue');

    //Fields
    const $fullName = $('input#fullName');
    const $email = $('input#email');
    const $phoneNumber = $('input#phoneNumber');
    const $address = $('input#address');
    const $postalCode = $('input#postalCode');

    $submitBtn.on('click', listedInPreview);
    $editBtn.on('click', edit);
    $continueBtn.on('click', continueFn);

    function continueFn() {
        $editBtn.attr("disabled", "disabled");
        $continueBtn.attr("disabled", "disabled");

        let $container = $(`div${selector}`);
        $container.append($('<h2>Payment details</h2>'))
            .append($('<select id="paymentOptions" class="custom-select">')
                .append($('<option selected disabled hidden>Choose</option>'))
                .append($('<option value="creditCard">Credit Card</option>'))
                .append($('<option value="bankTransfer">Bank Transfer</option>')))
            .append($('<div id="extraDetails"></div>'));

        $('select#paymentOptions').on('change', selectedPayment);
    }
    
    function selectedPayment() {
        $('div#extraDetails').html('');

        let choosen = this.value;
        if (choosen === 'creditCard') {
            creditCardTransfer();
        } else if (choosen === 'bankTransfer') {
            bankTransfer();
        }
    }

    function creditCardTransfer() {
        $('div#extraDetails')
            .append($('<div class="inputLabel">Card Number<input></div>'))
            .append($('<br>'))
            .append($('<div class="inputLabel">Expiration Date<input></div>'))
            .append($('<br>'))
            .append($('<div class="inputLabel">Security Numbers<input></div>'))
            .append($('<br>'))
            .append($('<button id="checkOut">Check Out</button>'));

        $('button#checkOut').on('click', completeReservation);
    }

    function bankTransfer() {
        $('div#extraDetails')
            .append($('<p>You have 48 hours to transfer the amount to:' +
                '<br>' +
                'IBAN: GR96 0810 0010 0000 0123 4567 890</p>'))
            .append($('<button id="checkOut">Check Out</button>'));

        $('button#checkOut').on('click', completeReservation);
    }

    function completeReservation() {
        let $wrapper = $('div#wrapper');
        $wrapper.html('');
        $wrapper.append($('<h4>Thank you for your reservation!</h4>'));
    }

    function edit() {
        $submitBtn.removeAttr("disabled");
        $editBtn.attr("disabled", "disabled");
        $continueBtn.attr("disabled", "disabled");

        let $inputs = $('div.block input');
        let $li = $('ul#infoPreview li');

        for (let i = 0; i < $li.length; i++) {
            $($inputs[i]).val($li[i].textContent.split(':')[1].trim());
        }

        $li.remove();
    }

    function listedInPreview() {
        let fullName = $fullName.val().trim();
        let email = $email.val().trim();

        if (($fullName === null || fullName === '')
            || (email === null || email === '')) {
            return;
        }

        let phoneNumber = $phoneNumber.val().trim();
        let address = $address.val().trim();
        let postalCode = $postalCode.val().trim();

        $('ul#infoPreview')
            .append(`<li>Name: ${fullName}</li>`)
            .append(`<li>E-mail: ${email}</li>`)
            .append(`<li>Phone: ${phoneNumber}</li>`)
            .append(`<li>Address: ${address}</li>`)
            .append(`<li>Postal Code: ${postalCode}</li>`);

        $submitBtn.attr("disabled", "disabled");
        $editBtn.removeAttr("disabled");
        $continueBtn.removeAttr("disabled");

        $fullName.val('');
        $email.val('');
        $phoneNumber.val('');
        $address.val('');
        $postalCode.val('');
    }
}