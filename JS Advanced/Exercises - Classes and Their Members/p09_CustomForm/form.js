let result = (function() {

    class Textbox {
        constructor(selector, regex) {
            this.selector = selector;
            this._elements = $(selector);
            this._invalidSymbols = regex;

            let that = this;
            $(selector).on('input change', function () {
                that.value = $(this).val();
            });
        }

        get value() {
            return $(this.selector).val();
        }

        set value(value) {
            $(this.selector).val(value);
        }

        get elements() {
            return this._elements;
        }

        isValid() {
            return !this._invalidSymbols.test($(this.selector).val());
        }
    }

    class Form {
        constructor(...textBoxes) {
            this._validateTextBoxes(textBoxes);

            this._element = $('<div>').addClass('form');
            this.textBoxes = textBoxes;
            this._addTextBoxesToElement();
        }

        set textBoxes(textBoxes) {
            this._textBoxes = textBoxes;
        }

        _validateTextBoxes(textBoxes) {
            textBoxes.forEach(textBox => {
                if (!textBox instanceof Textbox) {
                    throw new Error('Argument is not an instance of TextBox class');
                }
            })
        }

        _addTextBoxesToElement() {
            for (let textBox of this._textBoxes) {
                this._element.append($(textBox.selector));
            }
        }

        submit() {
            let formValidity = true;
            for (let textBox of this._textBoxes) {
                if (textBox.isValid()) {
                    $(textBox.selector).css('border', '2px solid green');
                } else {
                    $(textBox.selector).css('border', '2px solid red');
                    formValidity = false;
                }
            }

            return formValidity;
        }

        attach(selector) {
            $(selector).append(this._element);
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}());

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");
