
$(document).on('ready', function() {
  console.log('so far, so good!');
});

$('form').on('submit', function(e) {
  e.preventDefault();

  console.log('caught submit data');
  var destination = $('#destination').val();
  // console.log(destination);
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

//This is my query to google, finding out the length of the trip with traffic. The following variables will go into the query:
const KEY = '&key=AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw';
//google navigation API request parameters:
//departure_time (either 'now' or an integer in seconds since 1970)
//I need to export the selected future times to inHours:
var inHours = 0;
var departTime;
nowPlus = function(inHours) {
  departTime = ((Date.now()) + (3600000 * (inHours)));
  return departTime;
};
console.log(departTime);
console.log(Date.now());
console.log ('nowPlus: ' + nowPlus(inHours));
// console.log('current time in ms: ' + timeNow);
var departureTime = '&departure_time=' + departTime;
var traffic = '&traffic_model=best_guess';
//Origin is my house on Allison and destination is Galvanize in this example
var originPrefix = 'origin=';
var origin = '39.799395,-105.085765';
var destPrefix = '&destination=';
var destination = '39.733594,-104.992604';
var mapsUrl = 'http://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?' + originPrefix + origin + destPrefix + destination + departureTime + traffic + KEY;
// console.log(url);

$.ajax({
  method: 'GET',
  // jsonp: 'callback',
  // dataType: 'jsonp',
  url: mapsUrl
}).done(function (results) {
  duration = results.routes[0].legs[0].duration.text;
  console.log('Average trip duration: ' + duration);

  durationInTraffic = results.routes[0].legs[0].duration_in_traffic.text;
  console.log('Duration in current traffic: ' + durationInTraffic);
  // return durationInTraffic;

  //parse the results and make another AJAX call here (itunes and wunderground) I'll need to nest the AJAX call inside this function or I won't have access to the duration and durationInTraffic values.

  //This is the iTunes API Call. Looks like it works!
  const ITUNES_URL = 'https://itunes.apple.com/search';
  //XXX change inputs for these two parameters
  var artist = 'stuffyoushouldknow';
  // var milliseconds = 10000000;
  var milliseconds = (parseInt(durationInTraffic) * 60000);
  console.log('Your trip will currently have a duration of ' + milliseconds + ', searching for podcasts that match your commute.');
  var queryString = '?term=' + artist + '&kind=podcast';
  const ITUNES_QUERY = ITUNES_URL + queryString;
  // console.log(URL);
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    dataType: 'jsonp',
    url: ITUNES_QUERY
  }).done(function (results) {
    // console.log(results);
    //trying to sort the results and collect a few with acceptable length
    for (var i = 0; i < results.length; i++) {
      // console.log('test' + results.results[i].trackTimeMillis);
      if (results.results[i].trackTimeMillis > 1000000) {
        console.log('working so far!');
      }
      // console.log(results.results[8].trackTimeMillis);
    }
  });
  //Wunderground API call for destination weather:
  var destWeather;
  var destTemp;
  var destWeatherImg;

  const WEATHER_URL = 'http://api.wunderground.com/api/903be07b671ce816/conditions/q/' + destination + '.json';
  const WUNDERKEY = '903be07b671ce816';
  console.log();
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    dataType: 'jsonp',
    url: WEATHER_URL
  }).done(function (results) {
    destTemp = results.current_observation.feelslike_f;
    destWeather = results.current_observation.weather;
    destWeatherImg = results.current_observation.icon_url;
    console.log('Your destination is currently ' + destWeather + ' and ' + destTemp + ' degrees. ');
  });

});
