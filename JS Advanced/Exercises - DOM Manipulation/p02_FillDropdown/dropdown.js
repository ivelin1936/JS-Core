; const dropdown = (function () {

    function addItem() {
        let text = document.getElementById("newItemText").value;
        let value = document.getElementById("newItemValue").value;

        if (text !== null && text !== ''
            && value !== null && value !== '') {
            let option = document.createElement("OPTION");
            option.text = text;
            option.value = value;

            let menu = document.getElementById("menu");
            menu.add(option);

            document.getElementById("newItemText").value = '';
            document.getElementById("newItemValue").value = '';
        }
    }

    return {
        addItem
    }
}
)();