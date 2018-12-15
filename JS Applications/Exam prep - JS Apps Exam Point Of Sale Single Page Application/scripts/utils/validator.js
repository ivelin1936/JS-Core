;const validator = (function () {

    function isValidForm(data) {
        //TODO...

        return true;
    }

    function isRegFormValid(data) {
        if (data['username-register'].length < 5) {
            handler.showError('Username should be at least 5 characters long.');
            return false;
        } else if (data['password-register'] === '' || data['password-register-check'] === '') {
            handler.showError('Passwords should be not empty.');
            return false;
        } else if (data['password-register'].trim() !== data['password-register-check'].trim()) {
            handler.showError('Passwords does not matched.');
            return false;
        }

        return true;
    }

    function isValidEntryForm(context) {
        const type = context.params.type;
        const qty = context.params.qty;
        const price = context.params.price;

        if (type.trim() === '') {
            handler.showError('Product name must be a non-empty string.');
            return false;
        } else if (qty === '' || isNaN(+qty)) {
            handler.showError('Quantity must be a number.');
            return false;
        } else if (price === '' || isNaN(+price)) {
            handler.showError('Price must be a number.');
            return false;
        }

        return true;
    }

    return {
        isValidForm,
        isRegFormValid,
        isValidEntryForm
    }
})();