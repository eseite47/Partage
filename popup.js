chrome.contextMenus.create({
  "id": '47',
  "title": "Partage this page",
  "contexts": ["all"],
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url = tab.url;
  if (info.menuItemId == "47") {
      alert(url);
  }
});

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
});
