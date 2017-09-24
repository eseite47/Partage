//let userId = "";

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token', token)
});

let PartageId = "";

function getLinks(id){
  $.get("http://localhost:8080/api/links/" + id, function(result){
    result.forEach((element, index) => {
      let linkId = element.id;
      let myLink = element.url;
      let from = element.sender;
      let message = element.message
      $.get('http://localhost:8080/api/users/' + from, function(sender){
        let name = sender.name || from;
        let color = sender.color || 'black';
        let $newDiv = $(`
        <div>
          <div class='data' id='${linkId}'>
            <button class="delete">X</button>
            <b class='sender' style="color:${color};">${name}</b>
            <br>
            <div class='link'>
              <p>${message}<br />
              <a target="_newtab" href=${myLink}>${myLink}</a></p>
            </div>
          </div>
        </div>`)
        return $('#div1').append($newDiv)
      })
      // let $newDiv = $(`<div class='data' id='${index}'><b>${from}</b><br><div class='link'><a target="_newtab" href=${myLink}>${display[1]}</a></div></div>`)

    })
  })
}

function getFriends(id){
  $.get(`http://localhost:8080/api/users/friends/`, function(result){
    result.forEach((friend, index) => {
      $.get('http://localhost:8080/api/users/' + friend, function(friend){
      let $newDiv = $(`<option id='${index}' value=${friend.email}>${friend.name}</option>`)
      return $('#mySelect').append($newDiv)
      })
    })
  })
}

function getIdentity(){
  chrome.identity.getProfileUserInfo(function(cb) {
    PartageId = cb.email
    getLinks(PartageId)
    getFriends(PartageId)
    return cb.email
  })
}

$(document).ready(function() {
  $('#edit').slideUp()
  $('#shareInputs').slideUp()
  getIdentity()
  //getFriends()
  $('#submit').on('click',function(){

    let body = {
      sender: PartageId,
      receiver: $('option').val(),
      url: $('#link').val(),
      message: $('#message').val()
    }
    console.log('this is what I am posting', body)
    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/api/links/",
      data: body,
      success: function() {
        $('#submit').html("link sent!")
        setTimeout( function(){
          $('#shareInputs').slideUp()}, 1000)
      }
    })

  });

  $('#div1').on('click', '.delete', function(){
    let $this = $(this)
    let deleteId = $(this).closest('.data').attr('id')
    console.log('desperate attempt', deleteId)
    $.ajax({
      url: 'http://localhost:8080/api/links/' + deleteId,
      type: 'DELETE',
      data: {'action': 'delete'},
      success: function() {
        $this.closest('.data').slideUp()
      }
    });
    //$('#test').text(something)
  })

  $('#editButton').on('click', function(){
    $('#edit').slideToggle()
  })

  $('#share').on('click', function(){
    $('#shareInputs').slideToggle()
  })
  // $('.link a').on('click','a', function(){
  //   let thisurl = $(this).attr('href')
  //   chrome.tabs.create({url: thisurl}, function(){
  //     console.log('success')
  //   });
  //   // return false;
  // });
})

