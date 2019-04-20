
//step 2: with the input from the user make the api call.
//this is how to get restaurant location data
function getLatLongByCityName(cityName, query) {
    const searchURL = `https://developers.zomato.com/api/v2.1/search?q=${cityName}`;

    fetch(searchURL, {
        // mode: 'cors',
        'key': '31a83692b8cfde09a94e3b299af8c46c',
        'apikey': '31a83692b8cfde09a94e3b299af8c46c',
        headers: {
            // 'Content-Type': 'application/json',
            // 'user-key': '67646e13c44ac3bdc3cbb2e9f1081aa7',
            // 'X-Zomato-API-Key': '67646e13c44ac3bdc3cbb2e9f1081aa7', 
            'user-key': '31a83692b8cfde09a94e3b299af8c46c',
            'X-Zomato-API-Key': '31a83692b8cfde09a94e3b299af8c46c',
            // 'user-key': '460286dfbdb204719a6ef49dfdc82c58',
            // 'X-Zomato-API-Key': '460286dfbdb204719a6ef49dfdc82c58'
            // 'Access-Control-Allow-Origin':'*',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => renderResult(responseJson, query))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function priceRange(inputPriceRange) {
    if (inputPriceRange == 1) {

        const price_1 = `<p>Price: <i class="fas fa-money-bill-alt"></i></p>`;
        return price_1;

    }
    else if (inputPriceRange == 2) {
        const price_2 = `<p>Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></p>`;
        return price_2;
    }
    else if (inputPriceRange == 3) {
        const price_3 = `<p>Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></p>`;
        return price_3;
    }
    else {
        return `Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></i>`;
    }

}

//step 3: with the api results display them back to the user
function renderResult(result, query) {
    const outputElem = $('.js-search-results');
    const rand = Math.floor(Math.random() * 19);
    const rest = result.restaurants[rand];
    const text = `
	<div class="row top-results">
	<div class="col-2">
	<img src="${rest.restaurant.thumb}" class="thumb-img" alt="${rest.restaurant.name}">
	</div>
	<div class="col-6">
	<h2 class="restaurant-name">${rest.restaurant.name}</h2><br>
	<h3 class="city-name">${rest.restaurant.location.city}</h3>
	</div>
	<div class="col-3">
	<h3 class="user-rating">User Rating: <br>${rest.restaurant.user_rating.rating_text}</h3>
	</div>
	</div>
	<div class="row">
	<div class="col-6">
	<p>Address: ${rest.restaurant.location.address}</p>
	<p class="price-range">${priceRange(rest.restaurant.price_range)}</p>
	<p>Average Cost for Two: $${rest.restaurant.average_cost_for_two}</p>
	<p>Cuisine: ${rest.restaurant.cuisines}</p>
	</div>
	<div class="col-6">
	<form action="https://www.google.com/maps/place/${rest.restaurant.location.latitude},${rest.restaurant.location.longitude}" target="_blank">
	</form>
	<form action="${rest.restaurant.menu_url}" target="_blank" >
	<button type="submit" class="result-btn menu">Menu <i class="fas fa-utensils"></i></button>
	</form>
	</div>
	</div>`;

    const text_noimage = `
	<div class="row">
	<div class="col-2">
	<img src="rest.jpg" class="thumb-img" alt="restaurant">
	</div>
	<div class="col-6">
	<h2 class="restaurant-name">${rest.restaurant.name}</h2><br>
	<h3 class="city-name">${rest.restaurant.location.city}</h3>
	</div>
	<div class="col-3">
	<h3 class="user-rating">User Rating: <br>${rest.restaurant.user_rating.rating_text}</h3>
	</div>
	</div>
	<div class="row">
	<div class="col-6">
	<p>Address: ${rest.restaurant.location.address}</p>
	<p style="price-range">${priceRange(rest.restaurant.price_range)}</p>
	<p>Average Cost for Two: $${rest.restaurant.average_cost_for_two}</p>
	<p>Cuisine: ${rest.restaurant.cuisines}</p>
	</div>
	<div class="col-6">
	<form action="https://www.google.com/maps/place/${rest.restaurant.location.latitude},${rest.restaurant.location.longitude}" target="_blank">
	<button type="submit" class="result-btn">Directions <i class="fas fa-map-marked-alt"></i> </button><br>
	</form>
	<form action="${rest.restaurant.menu_url}" target="_blank" >
	<button type="submit" class="result-btn">Menu <i class="fas fa-utensils"></i></button>
	</form>
	</div>
	</div>
	`;

    if (rest.restaurant.thumb == "") {
        $('.js-search-results').html(text_noimage);
    }
    else {
        $('.js-search-results').html(text);
    }
    console.log(`${priceRange()}`);
    $('.js-search-results').removeClass('hidden');
    $('.search-box').addClass('hidden');
    $('.box').addClass('hidden');
    $('.top-bar').removeClass('hidden');
}

//step 1 get input from the user
function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const cityName = $('#js-cityName').val();
        const query = $('#js-query').val();
        // clear out the input
        // queryTarget.val("");
        console.log(cityName, query);
        getLatLongByCityName(cityName, query);
    });
}

$(watchSubmit);