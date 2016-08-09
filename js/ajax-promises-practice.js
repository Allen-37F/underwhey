// // add scripts
//
// $(document).on('ready', function() {
//   console.log('sanity check!');
// });
//
//
//
// //this is the simplest AJAX request to iTunes which returns an array of 50 sysk episodes. This works.
// // const BASE_URL = "https://itunes.apple.com/search"
// // var artist = 'stuffyoushouldknow';
// // var queryString = '?term=' + artist + "&kind=podcast"
// // const URL = BASE_URL + queryString;
// // console.log(URL);
// //
// // function getData() {
// //   $.ajax({
// //     url: URL,
// //     jsonp: 'callback',
// //     dataType: 'jsonp',
// //   })
// //   .done(function(data) {
// //     console.log(data);
// //   })
// //   .fail(function(err){
// //     console.log(err);
// //   });
// // }
// // getData()
//
//
// //This is nesting the above function in a promise. It doesn't work right now, for some reason...
// // const BASE_URL = "https://itunes.apple.com/search"
// // var artist = 'stuffyoushouldknow';
// // var queryString = '?term=' + artist + "&kind=podcast"
// // const URL = BASE_URL + queryString;
// // console.log(URL);
// //
// // function getData() {
// //   return new Promise(function(resolve, reject) {
// //     $.ajax({
// //       url: URL,
// //       jsonp: 'callback',
// //       dataType: 'jsonp',
// //     })
// //     .done(function(data) {
// //       resolve(data);
// //     })
// //     .fail(function(err){
// //       reject(err);
// //     });
// //   });
// //   }
// // getData()
// // function parseData(data) {
// //   console.log(data);
// // }
//
//
// //nested API call without promises
// const BASE_URL = "https://itunes.apple.com/search"
// var artist = 'stuffyoushouldknow';
// var queryString = '?term=' + artist + "&kind=podcast"
// const URL = BASE_URL + queryString;
// console.log(URL);
// function getTracks(trackObject, millisecondDuration) {
//   var time = millisecondDuration;
//   var arr = trackObject.results;
//   var sum = 0;
//   console.log(arr);
//   for (var i = 0; i < arr.length; i++) {
//     console.log(arr[i].trackTimeMillis);
//   }
// }
//
// function getData() {
//   $.ajax({
//     url: URL,
//     jsonp: 'callback',
//     dataType: 'jsonp',
//   })
//   .done(function(data) {
//     getTracks(data, 99999999)
//     console.log(data);
//
//   })
//   .fail(function(err){
//     console.log(err);
//   });
// }
// getData()
