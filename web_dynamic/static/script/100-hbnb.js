$(document).ready(function () {
  // Checking API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    method: 'POST',
    //    data: JSON.stringify({}),
    data: '{}',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append('<article> <div class="title_box"> <h2>' + data[i].name + '</h2> <div class="price_by_night">' + data[i].price_by_night + '</div> </div> <div class="information"> <div class="max_guest">' + data[i].max_guest + ' Guests</div> <div class="number_rooms">' + data[i].number_rooms + ' Rooms</div> <div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathrooms </div> </div> <!-- <div class="user"> --> <!-- </div> --> <div class="description">' + data[i].description + '</div> </article>'
        );
      }
    }
  });

  // Amenity checkboxes listening function
  let amenityDict = {};  //Dictionary of 'amenity_ID': 'amenity_name'
  let amList = [];       // List of amenity names
  let amListId = [];     // List of amenity IDs
  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data_name');
      amList.push($(this).attr('data-name'));
      amListId.push($(this).attr('data-id'));
    } else {
      delete amenityDict[$(this).attr('data-id')];
      amList.splice(amList.indexOf($(this).attr('data-name')), 1);
    }
    $('.amenities h4').text(amList.join(', '));
  });

  // States checkboxes listening function
  let statesDict = {};  //Dictionary of 'state_ID': 'state_name'
  let statesList = [];  // List of state names
  let statesListId = [];    // List of state IDs
  $('.locations .state input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      statesDict[$(this).attr('data-id')] = $(this).attr('data_name');
      statesList.push($(this).attr('data-name'));
      statesListId.push($(this).attr('data-id'));
    } else {
      delete statesDict[$(this).attr('data-id')];
      statesList.splice(statesList.indexOf($(this).attr('data-name')), 1);
    }
    $('.locations h4').text(statesList.join(', '));
  });

  // Cities checkboxes listening function
  let citiesDict = {};  //Dictionary of 'cities_ID': 'cities_name'
  let citiesList = [];  // List of cities names
  let citiesListId = [];    // List of cities IDs
  $('.locations .city input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      citiesDict[$(this).attr('data-id')] = $(this).attr('data_name');
      citiesList.push($(this).attr('data-name'));
      citiesListId.push($(this).attr('data-id'));
    } else {
      delete citiesDict[$(this).attr('data-id')];
      citiesList.splice(citiesList.indexOf($(this).attr('data-name')), 1);
    }
    $('.locations h4').text(citiesList.join(', '));
  });

  // Serach-box click event function
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      method: 'POST',
	data: JSON.stringify({
	    'amenities': amListId,
	    'states': statesListID,
	    'cities': citiesListID
	}),
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
            $('section.places').empty();
            $('section.places').append('<article> <div class="title_box"> <h2>' + data[i].name + '</h2> <div class="price_by_night">' + data[i].price_by_night + '</div> </div> <div class="information"> <div class="max_guest">' + data[i].max_guest + ' Guests</div> <div class="number_rooms">' + data[i].number_rooms + ' Rooms</div> <div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathrooms </div> </div> <!-- <div class="user"> --> <!-- </div> --> <div class="description">' + data[i].description + '</div> </article>'
            );
        }
      }
    });
  });
});
