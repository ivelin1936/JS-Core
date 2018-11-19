function acceptance() {
	let $company = $('input[name="shippingCompany"]').val();
	let $product = $('input[name="productName"]').val();
	let $quantity = $('input[name="productQuantity"]').val();
	let $scrape = $('input[name="productScrape"]').val();

	if ($company.trim() !== ''
		&& $product.trim() !== ''
		&& ($quantity.trim() !== '' && (typeof +$quantity === 'number'))
		&& ($scrape.trim() !== '' && (typeof +$scrape === 'number'))) {

		let peaces = +$quantity - +$scrape;

		if (peaces > 0) {
			let $p = $('<p>').text(`[${$company}] ${$product} - ${peaces} pieces`);
			let $button = $('<button type="button">Out of stock</button>')
				.on('click', function () {
                    $($(this).parent()).parent().empty();
                });

			$('div#warehouse')
				.append($('<div>')
                    .append($p)
                    .append($button));
		}
	}

    $('input[name="shippingCompany"]').val('');
    $('input[name="productName"]').val('');
    $('input[name="productQuantity"]').val('');
    $('input[name="productScrape"]').val('');
}