chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token', token)
});

chrome.identity.getProfileUserInfo(function(cb) {
  console.log('identity', cb)
})

$(document).ready(function() {
  let id =  "elisabeth.seite" ;
  $.get("http://localhost:8080/api/links/" + id, function(result){
    result.forEach((element, index) => {
      let myLink = `https://${element.url}`;
      let display = element.url.split('.')
      let from = element.sender;
      let $newDiv = $(`<div class='data' id='${index}'><b>${from}</b><br><div class='link'><a target="_newtab" href=${myLink}>${display[1]}</a></div></div>`)
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

  // $('.link a').on('click','a', function(){
  //   let thisurl = $(this).attr('href')
  //   chrome.tabs.create({url: thisurl}, function(){
  //     console.log('success')
  //   });
  //   // return false;
  // });
})

