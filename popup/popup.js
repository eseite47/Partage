//let userId = "";
const server = 'https://arcane-ocean-79878.herokuapp.com/api/'

let PartageId = '';
let User = '';
let UserFriends = []

function getLinks(){
  $.get(server + 'links/' + PartageId, function(result){
    if (!result.length){
      let $newDiv = $(`<p id='empty'>You are up to date!</p>`)
      return $('#div1').append($newDiv)
    }
    console.log('HOW MANY RESULTS FOR REAL???', result)
    let counter = 0
    result.forEach(element => {
      let linkId = element.id;
      let myLink = element.url;
      let from = element.sender;
      let message = element.message
      if (UserFriends.includes(from)){
        counter++
        $.get(server + 'users/' + from, function(sender){
          let name;
          if (sender.name){
            name = sender.name;
          }
          else {
            name = from;
          }

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
      chrome.browserAction.setBadgeText({text: `${counter}`});
    })
  })
}

function getFriends(){
  UserFriends && UserFriends.forEach((friend, index) => {
    $.get(server + 'users/' + friend, function(friendProfile){
      let sender = '';
      if (friendProfile.name){
        sender = friendProfile.name
      }
      else {
        sender = friendProfile.email
      }
      let $newDiv = $(`<option id='${index}' value=${friendProfile.email}>${sender}</option>`)
      return $('#mySelect').append($newDiv)
    })
  })
}

function getUser(){
  $.get(server + `users/` + PartageId, function(result){
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
    //console.log('CALLBACK', cb)
    PartageId = cb.email
    getUser()
    return cb.email
  })
  chrome.identity.getOathToken(function(cb) {
    console.log('CALLBACK', cb)
    //PartageId = cb.email
    // getUser()
    // return cb.email
  })
}

$(document).ready(function() {
  //initial set up
  $('#edit').slideUp()
  // $('#shareInputs').slideUp()
  getIdentity()
  var socket = io.connect('https://arcane-ocean-79878.herokuapp.com/');
  socket.on('connect', function() {
    console.log('Client connected');
  });

  //Send Link
  $('#submit').on('click', function(){

    let body = {
      sender: PartageId,
      receiver: $('#mySelect option:selected').val(),
      url: $('#link').val(),
      message: $('#message').val()
    }
    $.ajax({
      type: 'POST',
      url: server + 'links/',
      data: body,
      success: function() {
        $('#submit').html('link sent!')
        setTimeout( function(){
          $('#shareInputs').slideUp()}, 1000)
      }
    })
    socket.emit('new-link', body)
  });

  //delete link
  $('#div1').on('click', '.delete', function(){
    let $this = $(this)
    let deleteId = $(this).closest('.data').attr('id')
    $.ajax({
      url: server + 'links/' + deleteId,
      type: 'DELETE',
      data: {action: 'delete'},
      success: function() {
        $this.closest('.data').slideUp()
      }
    });
  })

  //edit profile
  $('#edit').on('click', '#submitEdits', function(){
    let editBody = {}
    editBody.email = PartageId;
    if ($('#username').val()){
      editBody.name = $('#username').val();
    }
    if ($('#color').val()){
      editBody.color = $('#color').val();
    }
    if ($('#newfriend').val()){
      let newFriends = $('#newfriend').val().split(', ')
      if (UserFriends){
        editBody.friends = UserFriends.concat(newFriends);
      }
      else {
        editBody.friends = newFriends;
      }

    }
    if ($('#deletefriend').val()){
      let oldFriends = $('#deletefriend').val().split(', ')
      let newfriendsArray = editBody.friends || UserFriends
      oldFriends.forEach(email => {
        let index = UserFriends.indexOf(email)
        newfriendsArray.splice(index, 1)
      })
      editBody.friends = newfriendsArray;
    }
    $.ajax({
      url: server + 'users/' + PartageId,
      type: 'PUT',
      data: editBody,
      success: function() {
        $('#edit').slideUp()
      }
    });
  })

  //edit menu toggle
  $('#editButton').on('click', function(){
    $('#edit').slideToggle()
  })

  //share a link menu toggle
  $('#share').on('click', function(){
    $('#shareInputs').slideToggle()
  })

  //auto-populate URL to send
  chrome.tabs.getSelected(null, function(tab) {
    const tabUrl = tab.url;
    console.log('This totally works', tabUrl)
    $('#link').val(tabUrl)
});


  //socket for live editing
  socket.on('new-link', element => {
    let myLink = element.url;
    let from = element.sender;
    let message = element.message
    if (UserFriends.includes(from)){
      $.get(server + 'users/' + from, function(sender){
        let name;
        if (sender.name){
          name = sender.name;
        }
        else {
          name = from;
        }
        let color = sender.color || 'black';
        let $newDiv = $(`
        <div>
          <div class='data'>
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
    }}
  )
})

