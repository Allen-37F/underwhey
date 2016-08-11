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
  // $('#destination').toggle();
  $('#saveThisLoc').toggle();
});

$('#saveThisLoc').on('change', function(e) {
  $('#newLocName').toggle();
});

$('form').on('submit', function(e) {
  if (!$('#destination').val())  {
    alert('Please enter a valid destination');
    location.reload();
  }
  e.preventDefault();
  console.log('caught submit data');
  //raw form data:
  var destinationUnparsed = $('#destination').val();
  var familyComing = $('#familyComing').is(':checked');
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
  var originPrefix = 'origin=';
  originUnparsed = $('#home-address').parent().find('> span').html();
  var origin = originUnparsed.split(' ').join('+');
  var destPrefix = '&destination=';
  var destLatLong;
  var destTitle;
  var mapsUrl = 'http://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?' + originPrefix + origin + destPrefix + destination + departureTime + traffic + KEY;

  $.ajax({
    method: 'GET',
    url: mapsUrl
  }).done(function(results) {
    let dest = results.routes[0].legs[0];
    duration = dest.duration.text;
    // console.log('Average trip duration: ' + duration);
    durationInTraffic = dest.duration_in_traffic.text;
    destLatLong = dest.end_location.lat + ',' + dest.end_location.lng;
    destTitle = dest.end_address.substring(0, dest.end_address.indexOf(','));
    //Plugging a few things into the results form
    $('#yourDest').html(destTitle);
    $('#travelTime').html(durationInTraffic);

    //I probably should parse some results?

    //This is the iTunes API Call. Looks like it works, but I need to tweak it before I install it on the page!
    const ITUNES_URL = 'https://itunes.apple.com/search';
    //XXX change inputs for this parameter
    var artist = 'stuffyoushouldknow';
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
    }).done(function(results) {

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
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      dataType: 'jsonp',
      url: WEATHER_URL
    }).done(function(results) {
      destTemp = results.current_observation.feelslike_f;
      destWeather = results.current_observation.weather;
      destWeatherImg = results.current_observation.icon_url;

      //Plugging a few things into the results form
      $('#weather-img').attr('src', results.current_observation.icon_url);
      $('#temp').html(destTemp);
      $('#weath').html(' ' + destWeather);
      if (destWeather == 'Clear') {
        $('.packingList').append('<li>Sunglasses</li>');
        $('.packingList').append('<li>Sunscreen</li>');
      }
      if (destWeather === 'Overcast' || destWeather === 'Thunderstorms' || destWeather === 'Raining' || destWeather === 'Scattered Showers') {
        $('.packingList').append('<li>Umbrella</li>');
      }
      if (destTemp < 55 && destTemp > 30) {
        $('.packingList').append('<li>Jacket</li>');
      }
      if (destTemp < 30 || (destWeather === 'Snowing' || destWeather === 'SnowShowers')) {
        $('.packingList').append('<li>Warm coat</li>');
        $('.packingList').append('<li>Gloves and a toque</li>');
      }
      if (destTemp > 90) {
        $('.packingList').append('<li>Extra water</li>');
      }
      if (dest.duration_in_traffic.value > 4000) {
        $('.packingList').append('<li>Lickies and chewies for the trip</li>');

      }
      if (familyComing === true) {
        $('.packingList').append($('#family-member-items').html());
      }
      if (dest.duration_in_traffic.value > 3000) {
        $('#podcast-recs').html('This is going to be a long trip. Download a few interesting-looking podcast episodes; you\'ll have time!');
      }
      if (destination.indexOf('park') > -1) {
        $('.packingList').append('<li>Asthma inhaler</li>');
      }
      if (destination.indexOf('beach') > -1) {
        $('.packingList').append('<li>Swimsuit</li>');
        $('.packingList').append('<li>Towel</li>');
      }
      if (destination.indexOf('triangle') > -1) {
        $('.packingList').append('<li>Galvanize Keycard</li>');
        $('.packingList').append('<li>Laptop and charger</li>');
        $('.packingList').append('<li>Packed lunch</li>');
      }
      if (destination.indexOf('park') > -1) {
        $('.packingList').append('<li>Asthma inhaler</li>');
      }
    });
  });
});
