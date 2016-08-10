
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
var timeNow = Date.now();
// nowPlus= function(hours) {
//   (timeNow + (3600000 * Number.hours));
// };
// console.log(nowPlus(2));
// console.log('current time in ms: ' + timeNow);
var departureTime = '&departure_time=' + timeNow;
var traffic = '&traffic_model=best_guess';
var duration = null;
var durationInTraffic = null;
//Origin is my house on Allison and destination is Galvanize in this example
var originPrefix = "origin="
var origin = '39.799395,-105.085765'
var destPrefix = '&destination='
var destination = '39.733594,-104.992604';
var url = 'http://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?'+originPrefix+ origin + destPrefix + destination + departureTime + traffic + KEY;
// console.log(url);
$.ajax({
  method: 'GET',
  // jsonp: 'callback',
  // dataType: 'jsonp',
  url: url
}).done(function (results) {
  duration = results.routes[0].legs[0].duration.text;
  // console.log('duration: ' + duration);
  // return duration;
  durationInTraffic = results.routes[0].legs[0].duration_in_traffic.text;
  // console.log('Duration in traffic: ' + durationInTraffic);
  // return durationInTraffic;

  //parse the results and make another AJAX call here (itunes and wunderground) I'll need tonest the AJAX call inside this function or I won't have access to the duration and durationInTraffic values.
});
// These are null in this position because I log them without waiting for the above ajax call to give them values.
// console.log('Duration in traffic: '+durationInTraffic);
// console.log('duration: ' + duration);

//google navigation API request parameters:
//departure_time (either 'now' or an integer in seconds since 1970)

//This is the iTunes API Call. Looks like it works!
const ITUNES_URL = 'https://itunes.apple.com/search';
//XXX change inputs for these two parameters
var artist = 'stuffyoushouldknow';
var milliseconds = 10000000;
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

  for (var i = 0; i < results.length; i++) {
    // console.log('test' + results.results[i].trackTimeMillis);
    if (results.results[i].trackTimeMillis > 1000000) {
      // console.log('working so far!');
    }
    // console.log(results.results[8].trackTimeMillis);
    //parse the results and make another AJAX call here (itunes and wunderground)
  }
});

//Wunderground API call for destination weather:
const WEATHER_URL =
console.log();
$.ajax({
  method: 'GET',
  jsonp: 'callback',
  dataType: 'jsonp',
  url: WEATHER_URL
}).done(function (results) {
  console.log(results);
});
