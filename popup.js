chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token', token)
});

// function click(){
//   $('#div1').click(function(){
//     console.log('i was clicked!')
//     $.ajax({url: "http://localhost:8080/api/messages", success: function(result){
//       const val = result[0].content;
//       console.log('ajax call was successful', val)
//       $('#div1').html(val)
//     }}
//   )})
// }

chrome.identity.getProfileUserInfo(function(cb) {
  console.log('identity', cb)
})

$(document).ready(function() {

  $.get("http://localhost:8080/api/channels", function(result){
    result.forEach((element, index) => {
      let myLink = element.name;
      let $newDiv = $(`<div class='link' id='${index}'>${myLink}</div>`)
      return $('#div1').append($newDiv)
    })
    // myLinks = result[0].content;
    // console.log('ajax call was successful', myLinks)
    // return $('#div1').html(myLinks)
  }),

  $('.clickme').click(function(){
    $(this).html('i was clicked')
  });
})

// document.addEventListener('DOMContentLoaded', init);
