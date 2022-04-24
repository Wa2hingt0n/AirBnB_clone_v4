$(document).ready(function() {
    // Checking API status
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if(data.status === "OK") {
	$("div#api_status").addClass("available");
    } else {
	$("div#api_status").removeClass("available");
    }
    });

    // Dictionary of amenities with key = 'amenity_ID', value = 'amenity_name'
    let amenity_dict = {};
    // List of amenity names
    let am_list = [];
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenity_dict[$(this).attr('data-id')] = $(this).attr('data_name');
            am_list.push($(this).attr('data-name'));
        } else {
            delete amenity_dict[$(this).attr('data-id')];
            am_list.splice(am_list.indexOf($(this).attr('data-name')), 1);
        }
            $('.amenities h4').text(am_list.join(', '));
    });

    // POST request to http://0.0.0.0:5001/api/v1/places_search/
    $.ajax({
	url: http://0.0.0.0:5001/api/v1/places_search/,
	headers: {
	    Content-Type: application/json
	},
	method: 'POST',
	data: {},
	success: function (data) {
	    for (let i = 0; i < data.length; i++)
		$("section.places").append(
		    "<article>
  <div class=\"title_box\">
    <h2>" + data[i].name + "</h2>
    <div class=\"price_by_night\">" + data[i].price_by_night + "</div>
  </div>
  <div class=\"information\">
    <div class=\"max_guest\">" + data[i].max_guest + "Guests</div>
    <div class=\"number_rooms\">" + data[i].number_rooms + "Rooms</div>
    <div class=\"number_bathrooms\">" + data[i].number_bathrooms + "</div>
  </div>
  <!-- <div class=\"user\"> -->
  <!-- </div> -->
  <div class=\"description\">" + data[i].description + "</div> </article>
"
	}
    });
});
