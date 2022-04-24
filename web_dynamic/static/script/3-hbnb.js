$(document).ready(function () {
  // Checking API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Dictionary of amenities with key = 'amenity_ID', value = 'amenity_name'
  const amenityDict = {};
  // List of amenity names
  const amList = [];
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data_name');
      amList.push($(this).attr('data-name'));
    } else {
      delete amenityDict[$(this).attr('data-id')];
      amList.splice(amList.indexOf($(this).attr('data-name')), 1);
    }
    $('.amenities h4').text(amList.join(', '));
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
});
