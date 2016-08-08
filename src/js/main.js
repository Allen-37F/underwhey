// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$("form").on("submit", function(e) {
  e.preventDefault();
  var submit;
  console.log("caught submit data")
});

$('openOptions').on('check', function() {
  $('.extraOptions').classList.toggle('hidden')
})


// Location service, this should find the user's location, but I'm not sure how to implement it just yet... source: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
// function geoFindMe() {
//   var output = document.getElementById("out");
//   if (!navigator.geolocation){
//     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//     return;
//   }
//   function success(position) {
//     var latitude  = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
//     var img = new Image();
//     img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
//     output.appendChild(img);
//   };
//   function error() {
//     output.innerHTML = "Unable to retrieve your location";
//   };
//   output.innerHTML = "<p>Locating…</p>";
//   navigator.geolocation.getCurrentPosition(success, error);
// }
