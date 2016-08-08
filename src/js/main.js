
$(document).on('ready', function() {
  console.log('so far, so good!');
});

$("form").on("submit", function(e) {
  e.preventDefault();

  console.log("caught submit data");
  var destination = $('#destination').val();
  console.log(destination);
  var key ="AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw"

  var url = 'https://maps.googleapis.com/maps/api/directions/json?' + key;

  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: url
  }).done(function (results) {
    console.log("finished");
  });
});



$('#openOptions').on('change', function (e) {
  // console.log('!');
  $(".extraOptions").toggle();
})

$('#savedLocation').on('change', function (e) {
  // console.log('Change saved location!');
  $(".savedLocations").toggle();
  $("#destination").toggle();
  $("#saveThisLoc").toggle();
})

$('#saveThisLoc').on('change', function (e) {
  // console.log('Changes something again!');
  $("#newLocName").toggle();
})


//google navigation API request parameters:
//departure_time (either 'now' or an integer in seconds. )


// google api interface sample request  URL:https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw
