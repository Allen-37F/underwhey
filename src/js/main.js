
$(document).on('ready', function() {
  console.log('sanity check!');
});

$("form").on("submit", function(e) {
  e.preventDefault();
  var submit;
  console.log("caught submit data");
  var destination = $('#destination').val();
});


$('#openOptions').on('change', function (e) {
  console.log('!');
  $(".extraOptions").toggle();
})

$('#savedLocation').on('change', function (e) {
  console.log('Change saved location!');
  $(".savedLocations").toggle();
  $("#destination").toggle();
  $("#saveThisLoc").toggle();
})

$('#saveThisLoc').on('change', function (e) {
  console.log('Changes something again!');
  $("#newLocName").toggle();
})
