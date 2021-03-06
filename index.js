
function getCityIdByCityName(cityName, query) {
  const searchURL = `https://developers.zomato.com/api/v2.1/cities?q=${cityName}`;
  $.ajax({
    type: 'GET',
    url: searchURL,
    contentType: 'application/json',
    dataType: 'jsonp',
    responseType: 'application/json',
    data: {
      'key': '31a83692b8cfde09a94e3b299af8c46c',
      'apikey': '31a83692b8cfde09a94e3b299af8c46c',
    },
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      'user-key': '31a83692b8cfde09a94e3b299af8c46c',
      'X-Zomato-API-Key': '31a83692b8cfde09a94e3b299af8c46c',
    },
    success: function (data) {
      console.log(data);
      console.log(data.locationSuggestions[0].id);
      getRestaurantsByCityID(data.locationSuggestions[0].id, query);
    },
    error: function (error) {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    }
  });
}


function getRestaurantsByCityID(cityID, query) {
  const searchURL = `https://developers.zomato.com/api/v2.1/search?q=${query}&entity_id=${cityID}&entity_type=city`;
  $.ajax({
    type: 'GET',
    url: searchURL,
    contentType: 'application/json',
    dataType: 'jsonp',
    responseType: 'application/json',
    data: {
      'key': '31a83692b8cfde09a94e3b299af8c46c',
      'apikey': '31a83692b8cfde09a94e3b299af8c46c',
    },
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      'user-key': '31a83692b8cfde09a94e3b299af8c46c',
      'X-Zomato-API-Key': '31a83692b8cfde09a94e3b299af8c46c',
    },
    success: function (data) {
      console.log(data);
      renderResult(data, query);
    },
    error: function (error) {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    }
  });
}

function priceRange(inputPriceRange) {

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
  if (inputText === undefined) {
    outputText = '';
  } else {
    outputText = inputText;
  }
  return outputText;
}

function renderResult(result, query) {
  $('.js-search-results').html('');
  const outputElem = $('.js-search-results');
  let text = '';
  let text_noimage = '';
  for (let i = 0; i < result.restaurants.length; i++) {
    let rest = result.restaurants[i];


    text = `
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
      <p class="address">Address: ${checkText(rest.restaurant.location.address)}</p>
      <p class="price-range">${priceRange(rest.restaurant.priceRange)}</p>
      <p>Average Cost for Two: $${checkText(rest.restaurant.average_cost_for_two)}</p>
      <p>Cuisine: ${checkText(rest.restaurant.cuisines)}</p>
      </div>
      <div class="col-6">
      <form action="https://www.google.com/maps/place/${checkText(rest.restaurant.location.latitude)},${checkText(rest.restaurant.location.longitude)}" target="_blank">
      </form>
      <form action="${rest.restaurant.menuUrl}" target="_blank" >
      <button type="submit" class="result-btn menu">Menu <i class="fas fa-utensils"></i></button>
      </form>
      </div>
      </div>`;

    text_noimage = `
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
      <p class="price-range">${priceRange(rest.restaurant.priceRange)}</p>
      <p>Average Cost for Two: $${checkText(rest.restaurant.average_cost_for_two)}</p>
      <p>Cuisine: ${checkText(rest.restaurant.cuisines)}</p>
      </div>
      <div class="col-6">
      <form action="https://www.google.com/maps/place/${checkText(rest.restaurant.location.latitude)},${checkText(rest.restaurant.location.longitude)}" target="_blank">
      <button type="submit" class="result-btn">Directions <i class="fas fa-map-marked-alt"></i> </button><br>
      </form>
      <form action="${rest.restaurant.menuUrl}" target="_blank" >
      <button type="submit" class="result-btn">Menu <i class="fas fa-utensils"></i></button>
      </form>
      </div>
      </div>
      `;


    if (rest.restaurant.thumb == "") {
      $('.js-search-results').append(text_noimage);
    }
    else {
      $('.js-search-results').append(text);
    }
  }


  $('.js-search-results').removeClass('hidden');
  $('.search-box').addClass('hidden');
  $('.box').addClass('hidden');
  $('.top-bar').removeClass('hidden');
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const cityName = $('#js-cityName').val();
    const query = $('#js-query').val();
    console.log(cityName, query);
    getCityIdByCityName(cityName, query);
  });
}

$(watchSubmit);