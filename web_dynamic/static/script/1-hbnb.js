$(document).ready(function() {
    // Dictionary of amenities with key = 'amenity_ID', value = 'amenity_name'
    let amenity_dict = {};
    // List of amenity names
    let am_list = [];
    $('input[type="checkbox"]').change(function () {
	if ($(this).is(':checked')) {
	    amenity_dict[$(this).attr('data-id')] = $(this).attr('data_name');
	    am_list.push($(this).attr('data-name')).join(', ');
	} else {
	    delete amenity_dict[$(this).attr('data-id')];
	    am_list.splice(am_list.indexOf($(this).attr('data-name')), 1);
	}
	    $('.amenities h4').text(am_list);
    });
});
