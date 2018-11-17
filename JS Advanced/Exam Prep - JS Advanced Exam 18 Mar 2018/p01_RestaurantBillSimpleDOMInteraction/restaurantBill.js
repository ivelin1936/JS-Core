function addProduct() {
    let product = $('section#add-product input')[0].value;
    let price = $('section#add-product input')[1].value;

    if (product.trim() !== '' && price.trim() !== '') {
        $('tbody#product-list')
            .append($('<tr>')
                .append($('<td>').text(product))
                .append($('<td>').text(price)));

        let totalPrice = +$($('tfoot td')[1]).text() + +price;
        $($('tfoot td')[1]).text(`${totalPrice}`);

        $('section#add-product input')[0].value = '';
        $('section#add-product input')[1].value = '';
    }
}