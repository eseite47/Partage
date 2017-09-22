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
  let id =  "elisabeth.seite" ;
  $.get("http://localhost:8080/api/links/" + id, function(result){
    result.forEach((element, index) => {
      let myLink = element.url;
      let from = element.sender;
      let $newDiv = $(`<div class='link' id='${index}'><b>${from}</b><br>${myLink}<br></div>`)
      return $('#div1').append($newDiv)
    })
  })

  $('#submit').on('click',function(){

    let body = {
      sender: "elisabeth.seite@gmail.com",
      receiver: $('#receiver').val(),
      url: $('#link').val()
    }

    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/api/links/",
      data: body,
      success: function() {
        $('#submit').html("link sent!")
      }
    })
  });
})

