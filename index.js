
//step 2: with the input from the user make the api call.
//this is how to get restaurant location data
function getLatLongByCityName(cityName, query) {
    const searchURL = `https://developers.zomato.com/api/v2.1/search?q=${cityName}`;
    $.ajax({
        type: 'GET',
        url: searchURL,
        contentType: 'application/json',
        dataType:'jsonp',
        responseType:'application/json',
        data: {
            'key': '31a83692b8cfde09a94e3b299af8c46c',
            'apikey': '31a83692b8cfde09a94e3b299af8c46c',
        },
        xhrFields: {
          withCredentials: false
        },
        headers: {
          'Access-Control-Allow-Credentials' : true,
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET',
          'Access-Control-Allow-Headers':'application/json',
          'user-key': '31a83692b8cfde09a94e3b299af8c46c',
          'X-Zomato-API-Key': '31a83692b8cfde09a94e3b299af8c46c',
        },
        success: function(data) {
            console.log(data);
            renderResult(data, query);
        },
        error: function(error) {
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        }
      });
    // fetch(searchURL, {
    //     // mode: 'cors',
    //     'key': '31a83692b8cfde09a94e3b299af8c46c',
    //     'apikey': '31a83692b8cfde09a94e3b299af8c46c',
    //     headers: {
    //         // 'Content-Type': 'application/json',
    //         // 'user-key': '67646e13c44ac3bdc3cbb2e9f1081aa7',
    //         // 'X-Zomato-API-Key': '67646e13c44ac3bdc3cbb2e9f1081aa7', 
    //         'user-key': '31a83692b8cfde09a94e3b299af8c46c',
    //         'X-Zomato-API-Key': '31a83692b8cfde09a94e3b299af8c46c',
    //         // 'user-key': '460286dfbdb204719a6ef49dfdc82c58',
    //         // 'X-Zomato-API-Key': '460286dfbdb204719a6ef49dfdc82c58'
    //         // 'Access-Control-Allow-Origin':'*',
    //     }
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         throw new Error(response.statusText);
    //     })
    //     .then(responseJson => renderResult(responseJson, query))
    //     .catch(err => {
    //         $('#js-error-message').text(`Something went wrong: ${err.message}`);
    //     });
}

function priceRange(inputPriceRange) {
    console.log(inputPriceRange);
    let htmlOutPut = '';
    if (inputPriceRange == 1) {

        htmlOutPut = `<p>Price: <i class="fas fa-money-bill-alt"></i></p>`;

    }
    else if (inputPriceRange == 2) {
        htmlOutPut = `<p>Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></p>`;
    }
    else if (inputPriceRange == 3) {
        htmlOutPut = `<p>Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></p>`;
    }
    else {
        htmlOutPut = `Price: <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i> <i class="fas fa-money-bill-alt"></i></i>`;
    }
    return htmlOutPut;
}

function checkText(inputText) {
    let outputText = '';
    if (inputText === undefined)
    {
        outputText = '';
    } else {
     outputText = inputText;
    }
    return outputText;
}

//step 3: with the api results display them back to the user
function renderResult(result, query) {
    const outputElem = $('.js-search-results');
    const rand = Math.floor(Math.random() * (result.restaurants.length - 1));
    const rest = result.restaurants[rand];
    console.log(rest, rand);
    console.log(priceRange(rest.restaurant.priceRange));
    const text = `
	<div class="row top-results">
	<div class="col-2">
	<img src="${rest.restaurant.thumb}" class="thumb-img" alt="${checkText(rest.restaurant.name)}">
	</div>
	<div class="col-6">
	<h2 class="restaurant-name">${checkText(rest.restaurant.name)}</h2><br>
	<h3 class="city-name">${checkText(rest.restaurant.location.city)}</h3>
	</div>
	<div class="col-3">
	<h3 class="user-rating">User Rating: <br>${checkText(rest.restaurant.userRating.rating_text)}</h3>
	</div>
	</div>
	<div class="row">
	<div class="col-6">
	<p>Address: ${checkText(rest.restaurant.location.address)}</p>
	<p class="price-range">${priceRange(rest.restaurant.priceRange)}</p>
	<p>Average Cost for Two: $${checkText(rest.restaurant.average_cost_for_two)}</p>
	<p>Cuisine: ${checkText(rest.restaurant.cuisines)}</p>
	</div>
	<div class="col-6">
	<form action="https://www.google.com/maps/place/${checkText(rest.restaurant.location.latitude)},${checkText(rest.restaurant.location.longitude)}" target="_blank">
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
	<h2 class="restaurant-name">${checkText(rest.restaurant.name)}</h2><br>
	<h3 class="city-name">${checkText(rest.restaurant.location.city)}</h3>
	</div>
	<div class="col-3">
	<h3 class="user-rating">User Rating: <br>${checkText(rest.restaurant.userRating.rating_text)}</h3>
	</div>
	</div>
	<div class="row">
	<div class="col-6">
	<p>Address: ${checkText(rest.restaurant.location.address)}</p>
	<p style="price-range">${priceRange(rest.restaurant.priceRange)}</p>
	<p>Average Cost for Two: $${checkText(rest.restaurant.average_cost_for_two)}</p>
	<p>Cuisine: ${checkText(rest.restaurant.cuisines)}</p>
	</div>
	<div class="col-6">
	<form action="https://www.google.com/maps/place/${checkText(rest.restaurant.location.latitude)},${checkText(rest.restaurant.location.longitude)}" target="_blank">
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