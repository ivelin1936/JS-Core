//TODO -> 100/100 in judge, need refactoring the code
function realEstateAgency () {
	$('button[name="regOffer"]').on('click', regOffer);
	$('button[name="findOffer"]').on('click', findOffer);

	function findOffer() {
        let $familyBudget = $('input[name="familyBudget"]').val();
        let $apartmentType = $('input[name="familyApartmentType"]').val();
        let $familyName = $('input[name="familyName"]').val();

        if (($familyBudget.trim() !== ''
                && typeof +$familyBudget === 'number'
                && $familyBudget > 0)
            && $apartmentType.trim() !== ''
            && $familyName.trim() !== '') {

           let appartment = find();

           if (appartment) {
               let rentPrice = +$($(appartment).children()[0]).text().split(' ')[1];
               let commission = +$($(appartment).children()[2]).text().split(' ')[1];

               $(appartment).css('border', '2px solid red');
               $(appartment).empty();

               let $btn = $(`<button>MoveOut</button>`).on('click', moveOut);

               $(appartment)
                   .append($(`<p>${$familyName}</p>`))
                   .append($(`<p>live here now</p>`))
                   .append($btn);

               let agencyProfit = +$('div#roof h1').text().split(' ')[2];
               agencyProfit += (rentPrice * commission / 100) * 2;
               $('div#roof h1').text(`Agency profit: ${agencyProfit} lv.`);

               $('div#notifications p#message').text('Enjoy you new home! :))')
           } else {
               $('div#notifications p#message').text('We were unable to find you a home, so sorry :(');
           }
        } else {
            $('div#notifications p#message').text('We were unable to find you a home, so sorry :(');
        }

        function find() {
            let $appartments = $('div#building div');
            for (let appart of $appartments) {
                let details = $(appart).children();

                let rentPrice = +$(details[0]).text().split(' ')[1];
                let type = $(details[1]).text().split(' ')[1];
                let commission = +$(details[2]).text().split(' ')[1];

                if (rentPrice) {
                    let neededMoney = rentPrice + (rentPrice * commission / 100);

                    if ($apartmentType === type
                        && $familyBudget >= neededMoney) {
                        return appart;
                    }
                }
            }
            return undefined;
        }

        clearFindFields();
    }
    
    function moveOut() {
        let familyName = $($($(this).parent()).children()[0]).text();

	    $($('div#notifications p#message')).text(`They had found cockroaches in ${familyName}'s apartment`);
        $(this).parent().remove();
    }

	function regOffer() {
        let $rentPrice = $('input[name="apartmentRent"]').val();
        let $apartmentType = $('input[name="apartmentType"]').val();
        let $commissionRate = $('input[name="agencyCommission"]').val();

        if (($rentPrice.trim() !== ''
                && typeof +$rentPrice === 'number'
                && +$rentPrice > 0)
            && ($commissionRate.trim() !== ''
                && typeof +$commissionRate === 'number'
                && $commissionRate > 0
                && $commissionRate <= 100)
            && ($apartmentType.trim() !== ''
                && !/[:]/.test($apartmentType))) {

            //'Your offer was created successfully.'
            $('div#building')
                .append($('<div class="apartment">')
                    .append($(`<p>Rent: ${$rentPrice}</p>`))
                    .append($(`<p>Type: ${$apartmentType}</p>`))
                    .append($(`<p>Commission: ${$commissionRate}</p>`)))

            $('div#notifications p#message').text('Your offer was created successfully.');
        } else {
            //'Your offer registration went wrong, try again.'
            $('div#notifications p#message').text('Your offer registration went wrong, try again.');
        }

        clearRegFields();
    }
    
    function clearRegFields() {
        $('input[name="apartmentRent"]').val('');
        $('input[name="apartmentType"]').val('');
        $('input[name="agencyCommission"]').val('');
    }

    function clearFindFields() {
        $('input[name="familyBudget"]').val('');
        $('input[name="familyApartmentType"]').val('');
        $('input[name="familyName"]').val('');
    }
}