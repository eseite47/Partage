//let userId = "";

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token', token)
});

let PartageId = "";

function getLinks(id){
  $.get("http://localhost:8080/api/links/" + id, function(result){
    result.forEach((element, index) => {
      let myLink = element.url
      let display = element.url.split('//')
      let from = element.sender;
      let $newDiv = $(`<div class='data' id='${index}'><b>${from}</b><br><div class='link'><a target="_newtab" href=${myLink}>${display[1]}</a></div></div>`)
      return $('#div1').append($newDiv)
    })
  })
}

function getFriends(id){
  $.get(`http://localhost:8080/api/users/friends/`, function(result){
    result.forEach((friend, index) => {
      let $newDiv = $(`<option id='${index}' value=${friend}>${friend}</option>`)
      return $('#mySelect').append($newDiv)
    })
  })
}

function getIdentity(){
  chrome.identity.getProfileUserInfo(function(cb) {
    console.log(cb.email)
    // = cb.email
    //$('#div').append(`<p>Welcome ${cb.email}</p>`)
    console.log(cb.email)
    PartageId = cb.email
    getLinks(PartageId)
    getFriends(PartageId)
    return cb.email
  })
}

$(document).ready(function() {

  getIdentity()
  //getFriends()
  $('#submit').on('click',function(){

    let body = {
      sender: PartageId,
      receiver: $('option').val(),
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

