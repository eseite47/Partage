
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

function init(){

  $('#div1').on('click',
    console.log('i was clicked!')
    // $.ajax({url: "http://localhost:8080/api/messages", success: function(result){
    //   const val = result[0].content;
    //   console.log('ajax call was successful', val)
    //   $('#div1').html(val)
    // }}


)}

document.addEventListener('DOMContentLoaded', init);
