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
});
