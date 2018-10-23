function validate() {
    let $checkbox = $('input#company');
    $checkbox.change(companyInfoFn);

    let $submit = $('#submit');
    $submit.on('click', function (ev) {
        ev.preventDefault();
        validateAndSubmit();
    });

    function validateAndSubmit() {
        const $email = $('#email');
        const $password = $('#password');
        const $confirmPass = $('#confirm-password');

        let isValidUN = validateUsername();
        let isValidE = validateEmail();
        let isValidP = validatePassword();
        let isValidCP = validateConfirmPassword();

        let isValidCompNum = true;
        if ($('#company').is(':checked')) {
            isValidCompNum = validateCompanyNumber();
        }

        if (isValidUN
            && isValidE
            && isValidP
            && isValidCP
            && isValidCompNum) {
            $('#valid').css('display', 'inline-block');
        }
    }

    function validateCompanyNumber() {
        const $companyNum = $('#companyNumber');
        const $value = $companyNum.val();

        if ($value < 1000 || $value > 9999) {
            $companyNum.css('border', '2px solid red');
            return false;
        } else {
            $companyNum.css('border', 'none');
            return true;
        }
    }

    function validateConfirmPassword() {
        const $password = $('#password');
        const $confirmPass = $('#confirm-password');

        if (!($confirmPass.val().match(/\b[\w]{5,15}\b/g))
            || ($password.val() !== $confirmPass.val())) {
            $confirmPass.css('border', '2px solid red');
            $confirmPass.val('');
            return false;
        } else {
            $confirmPass.css('border', 'none');
            return true;
        }
    }

    function validatePassword() {
        const $password = $('#password');

        if (!$password.val().match(/\b[\w]{5,15}\b/g)
            || ($password.val() !== $('#confirm-password').val())) {
            $password.css('border', '2px solid red');
            return false;
        } else {
            $password.css('border', 'none');
            return true;
        }
    }

    function validateEmail() {
        const $email = $('#email');

        if (!$email.val().match(/@.*\./g)) {
            $email.css('border', '2px solid red');
            return false;
        } else {
            $email.css('border', 'none');
            return true;
        }
    }

    function validateUsername() {
        const $username = $('#username');

        if (!$username.val().match(/\b[A-Za-z0-9]{3,20}\b/g)) {
            $username.css('border', '2px solid red');
            return false;
        } else {
            $username.css('border', 'none');
            return true;
        }
    }

    function companyInfoFn() {
        if ($(this).is(':checked')) {
            $('#companyInfo').css('display', 'inline');
        } else {
            $('#companyInfo').css('display', 'none');
        }
    }
}

/** ------------------------------------------------------------------------------ */

function validate2() {
    const userInfoFieldset = $('fieldset#userInfo');
    const companyCheckBox = userInfoFieldset.find('input#company');
    const companyFieldset = $('fieldset#companyInfo');

    companyCheckBox.change(companyInfoFn);

    //Submit event
    $('#submit').on('click', function (event) {
        event.preventDefault();
        let validDivDisplayValue = tryFormValidation() ? 'block' : 'none';

        $('div#valid').css('display', validDivDisplayValue);
    });

    // Declare border changes
    let invalidInput = inputBox =>
        inputBox.css({'border': ''}).css('border-color', 'red');
    let validInput = inputBox => inputBox.css('border', 'none');


    function tryFormValidation() {
        let isFormValid = true;

        // User Info
        processInput('username', /^[A-Za-z0-9]{3,20}$/g);
        processInput('email', /@.*\./g);
        processInput('password', /^\w{5,15}$/);
        processInput('confirm-password', /^\w{5,15}$/);

        // Company Info
        if ($('#company').is(':checked')) {
            let companyNumberInput = companyFieldset.find('input#companyNumber');

            let inputNumber = Number(companyNumberInput.val());
            if (inputNumber < 1000 || inputNumber > 9999) {
                invalidInput(companyNumberInput);
                isFormValid = false;
            } else {
                validInput(companyNumberInput);
            }
        }

        return isFormValid;

        function processInput(selector, pattern) {
            if (!tryValidateInput(selector, pattern)) {
                isFormValid = false;
            }
        }
    }

    let password = null;

    function tryValidateInput(id, regex) {
        let inputBox = userInfoFieldset.find('input#' + id);
        let isValid = regex.test(inputBox.val());

        if (id === 'password') {
            password = inputBox.val();
        } else if (id === 'confirm-password' && password !== inputBox.val()) {
            isValid = false;
            let passInputBox = userInfoFieldset.find('input#password');
            passInputBox.removeProp('border');
            invalidInput(passInputBox);
        }

        isValid ? validInput(inputBox) : invalidInput(inputBox);
        return isValid;
    }

    function companyInfoFn() {
        if ($(this).is(':checked')) {
            $('#companyInfo').css('display', 'inline');
        } else {
            $('#companyInfo').css('display', 'none');
        }
    }
}

