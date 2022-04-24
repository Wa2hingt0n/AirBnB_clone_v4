$(document).ready(function () {
  // Dictionary of amenities with key = 'amenity_ID', value = 'amenity_name'
  const amenityDict = {};
  // List of amenity names
  const amList = [];
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data_name');
      amList.push($(this).attr('data-name')).join(', ');
    } else {
      delete amenityDict[$(this).attr('data-id')];
      amList.splice(amList.indexOf($(this).attr('data-name')), 1);
    }
    $('.amenities h4').text(amList);
  });
});
