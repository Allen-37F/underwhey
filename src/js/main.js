$(document).on('ready', function() {
  console.log('so far, so good!');
});

$('#openOptions').on('change', function(e) {
  $('.extraOptions').toggle();
});

$('.submitBtn').on('click', function(e) {
  $('.resultsForm').toggle();
  $('.mainForm').toggle();
  $('.footer1').toggle();
  $('.footer2').toggle();

});

$('#savedLocation').on('change', function(e) {
  $('.savedLocations').toggle();
  $('#destination').toggle();
  $('#saveThisLoc').toggle();
});

$('#saveThisLoc').on('change', function(e) {
  $('#newLocName').toggle();
});

$('form').on('submit', function(e) {
  e.preventDefault();
  console.log('caught submit data');
  //raw form data:
  var destinationUnparsed = $('#destination').val();
  var familyComing = $('#familyComing').val();
  console.log('family coming: ' + familyComing);

  var inHours = parseInt($('#leavingHours').val()) || 0;

  //manipulating the raw form data so I can work with it a bit better:
  var destination = destinationUnparsed.split(' ').join('+');

  //This is my query to google, finding out the length of the trip with traffic. The following variables will go into the query:
  const KEY = '&key=AIzaSyDpCDHuCq0nnxnIIqkSlk--DU5sZ6lIBFw';
  var departTime;
  nowPlus = function(hours) {
    departTime = ((Date.now()) + (3600000 * (hours)));
    return departTime;
  };
  nowPlus(inHours);

  var departureTime = '&departure_time=' + departTime;
  var traffic = '&traffic_model=best_guess';
  //Origin is my house on Allison and destination is Galvanize in this example
  var originPrefix = 'origin=';
  var origin = '39.799395,-105.085765';
  var destPrefix = '&destination=';
  var destLatLong;
  var destTitle;
  var mapsUrl = 'http://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?' + originPrefix + origin + destPrefix + destination + departureTime + traffic + KEY;

  $.ajax({
    method: 'GET',
    // jsonp: 'callback',
    // dataType: 'jsonp',
    url: mapsUrl
  }).done(function(results) {
    let dest = results.routes[0].legs[0];
    duration = dest.duration.text;
    // console.log('Average trip duration: ' + duration);
    durationInTraffic = dest.duration_in_traffic.text;
    console.log('Duration in current traffic: ' + durationInTraffic);
    destLatLong = dest.end_location.lat + ',' + dest.end_location.lng;
    destTitle = dest.end_address.substring(0, dest.end_address.indexOf(','));
    console.log('title of destination: ' + destTitle);

    //I probably should parse some results?

    //This is the iTunes API Call. Looks like it works!
    const ITUNES_URL = 'https://itunes.apple.com/search';
    //XXX change inputs for these two parameters
    var artist = 'stuffyoushouldknow';
    var queryString = '?term=' + artist + '&kind=podcast';
    const ITUNES_QUERY = ITUNES_URL + queryString;
    // console.log(URL);
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      dataType: 'jsonp',
      url: ITUNES_QUERY
    }).done(function(results) {
      //DurationInTraffic isn't right if the trip is more than an hour long because parsing; perhaps suggest the user listen to anything he/she wants?
      var milliseconds = (parseInt(durationInTraffic) * 60000);
      console.log('Your trip will currently have a duration of ' + milliseconds + ', searching for podcasts that match your commute.');
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

    const WEATHER_URL = 'http://api.wunderground.com/api/903be07b671ce816/conditions/q/' + destLatLong + '.json';
    const WUNDERKEY = '903be07b671ce816';
    console.log();
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      dataType: 'jsonp',
      url: WEATHER_URL
    }).done(function(results) {
      destTemp = results.current_observation.feelslike_f;
      destWeather = results.current_observation.weather;
      destWeatherImg = results.current_observation.icon_url;
      console.log('Your destination is currently ' + destWeather + ' and ' + destTemp + ' degrees. ');
    });
  });
});
