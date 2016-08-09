
$(document).on('ready', function() {
  console.log('so far, so good!');
});

$('form').on('submit', function(e) {
  e.preventDefault();

  console.log('caught submit data');
  var destination = $('#destination').val();
  console.log(destination);
});

$('#openOptions').on('change', function (e) {
  // console.log('!');
  $('.extraOptions').toggle();
});

$('#savedLocation').on('change', function (e) {
  // console.log('Change saved location!');
  $('.savedLocations').toggle();
  $('#destination').toggle();
  $('#saveThisLoc').toggle();
});

$('#saveThisLoc').on('change', function (e) {
  // console.log('Changes something again!');
  $('#newLocName').toggle();
});


var key ='AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw'
var url = 'http://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=39.799395,-105.085765&destination=Universal+Studios+Hollywood4&key=' + key;
console.log(url);
 $.ajax({
  method: 'GET',
  // jsonp: 'callback',
  // dataType: 'jsonp',
  url: url
}).done(function (results) {
   console.log(results);
   console.log(results.routes[0].legs[0].duration.text);
   //parse the results and make another AJAX call here (itunes and wunderground)
 })

//google navigation API request parameters:
//departure_time (either 'now' or an integer in seconds since 1970)
// var key ='AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw'




//let's try a call to Google's API for podcasts by length. I don't have high hopes... nope CORS problem again, apparently.
// var $xhr = $.getJSON('https://itunes.apple.com/search?entity=podcast');
// $xhr.done(function(data) {
//     if ($xhr.status !== 200) {
//         return;
//     }
//     console.log(data);
// });
// $xhr.fail(function(err) {
//     console.log(err);
// });
