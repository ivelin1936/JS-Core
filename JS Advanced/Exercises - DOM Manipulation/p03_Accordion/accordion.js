;const accordion = (function () {

    const consts = {
        displayStyle: {
            none: 'none',
            block: 'block'
        },
        buttonContent: {
            less: 'Less',
            more: 'More'
        }
    };

    function action() {
        let button = document.getElementsByClassName('button')[0];

        let fullContent = document.getElementById("extra");
        let display = window.getComputedStyle(fullContent).display;

        if (display === consts.displayStyle.none) {
            fullContent.style.display = consts.displayStyle.block;
            button.textContent = consts.buttonContent.less;
        } else {
            fullContent.style.display = consts.displayStyle.none;
            button.textContent = consts.buttonContent.less;
        }
    }

    return {
        action
    };
})();