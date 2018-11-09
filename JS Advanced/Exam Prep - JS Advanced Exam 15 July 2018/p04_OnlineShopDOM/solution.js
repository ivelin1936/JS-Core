function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    // Write your code here

    let $productInput = $('input[placeholder="Enter product"]');

    //Attach event listener to product input field
    $productInput.on('keyup keypress blur change', () => {
        console.log('its pressing');
        let $product = $('input[placeholder="Enter product"]').val();

        if ($product !== null && $product !== '') {
            $('button#submit').removeAttr('disabled');
        } else {
            $('button#submit').attr('disabled', 'disabled');
        }
    });

    //Attach event listener to submit button
    $('button#submit').on('click', addCurrentProductToInventory);
    
    function addCurrentProductToInventory() {
        $('button#submit').attr('disabled', 'disabled');

        let $product = $('input[placeholder="Enter product"]').val();
        let $price = +$('input#price').val();
        let $quantity = +$('input#quantity').val();

        //Validate that product isn't for whitespaces
        if ($product.trim() === '') {
            $('input[placeholder="Enter product"]').val('');
            return;
        }

        //Validate the free capacity (max is 150)
        let currentCapacity = +$('input#capacity').val();
        if ((currentCapacity + $quantity) > 150) {
            $quantity = 150 - currentCapacity;
        }

        //Attach the new product to the inventory
        $('ul.display')
            .append($(`<li>Product: ${$product} Price: ${$price} Quantity: ${$quantity}</li>`));

        resetVisualization();
        keepTrackOfCapacity($quantity);
        keepTrackOfTotalSum($price);
    }

    function keepTrackOfTotalSum($price) {
        let $sumField = $('input#sum');
        let sum = +$sumField.val() + $price;
        $sumField.val(sum)
    }

    function keepTrackOfCapacity($quantity) {
        let $capacityField = $('input#capacity');
        let capacity = +$capacityField.val() + $quantity;
        $capacityField.val(capacity);

        if (capacity === 150) {
            $capacityField.val('full');
            $capacityField.addClass('fullCapacity');
            //When capacity is maxed -> disabled all input fields
            $('input[placeholder="Enter product"]').attr('disabled', 'disabled');
            $('input#price').attr('disabled', 'disabled');
            $('input#quantity').attr('disabled', 'disabled');
        } else {
            $capacityField.val(capacity);
        }
    }
    
    function resetVisualization() {
        $('input[placeholder="Enter product"]').val('');
        $('input#price').val(1);
        $('input#quantity').val(1)
    }

}
