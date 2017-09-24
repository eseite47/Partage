//let userId = "";

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token', token)
});

let PartageId = "";
let User = "";
let UserFriends = []

function getLinks(){
  $.get("http://localhost:8080/api/links/" + PartageId, function(result){
    if (!result.length){
      let $newDiv = $(`<p id='empty'>You are up to date!</p>`)
      return $('#div1').append($newDiv)
    }
    result.forEach(element => {
      let linkId = element.id;
      let myLink = element.url;
      let from = element.sender;
      let message = element.message
      if (UserFriends.includes(from)){
        $.get('http://localhost:8080/api/users/' + from, function(sender){
          let name = sender.name || from;
          let color = sender.color || 'black';
          let $newDiv = $(`
          <div>
            <div class='data' id='${linkId}'>
              <button class="delete">X</button>
              <b class='sender' title=${from} style="color:${color};">${name}</b>
              <br>
              <div class='link'>
                <p>${message}<br />
                <a target="_newtab" href=${myLink}>${myLink}</a></p>
              </div>
            </div>
          </div>`)
          return $('#div1').append($newDiv)
        })
      }
    })
  })
}

function getFriends(){
  UserFriends.forEach((friend, index) => {
    $.get('http://localhost:8080/api/users/' + friend, function(friendProfile){
      let $newDiv = $(`<option id='${index}' value=${friendProfile.email}>${friendProfile.name}</option>`)
      return $('#mySelect').append($newDiv)
    })
  })
}

function getUser(){
  $.get(`http://localhost:8080/api/users/` + PartageId, function(result){
    User = result.name
    let UserColor = result.color
    UserFriends = result.friends
    let $editfunction = $(`
    <p>
    UserName<br />
    <input class="editBox" id="username" placeholder='${User}'></input><br />
    Display Color<br />
    <input class="editBox" id="color" placeholder='${UserColor}'></input><br />
    Add Friends<br />
    <input class="editBox" id="newfriend" placeholder='emails'></input>
   <br />
    Remove Friends<br />
    <input class="editBox" id="deletefriend" placeholder='emails'></input>
    <br />
    <button id='submitEdits'>Make Changes</button></p>
    `)
    $('#edit').append($editfunction)
    getLinks(PartageId)
    getFriends(PartageId)
  })
}

function getIdentity(){
  chrome.identity.getProfileUserInfo(function(cb) {
    PartageId = cb.email
    getUser()
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

  $('#edit').on('click', '#submitEdits', function(){
    let editBody = {}
    editBody.email = PartageId;
    if($('#username').val()){
      editBody.name = $('#username').val();
    }
    if($('#color').val()){
      editBody.color = $('#color').val();
    }
    if($('#newfriend').val()){
      let newFriends = $('#newfriend').val().split(', ')
      editBody.friends = UserFriends.concat(newFriends);
    }
    if($('#deletefriend').val()){
      let oldFriends = $('#deletefriend').val().split(', ')
      let newfriendsArray = editBody.friends || UserFriends
      oldFriends.forEach(email => {
        let index = UserFriends.indexOf(email)
        newfriendsArray.splice(index, 1)
      })
      editBody.friends = newfriendsArray;
    }

    console.log('editBody', editBody)
    $.ajax({
      url: 'http://localhost:8080/api/users/' + PartageId,
      type: 'PUT',
      data: editBody,
      success: function() {
        $('#edit').slideUp()
      }
    });
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

