let fetched ;
document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('authenticate').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
          'contentType': 'json'
      };

      fetch(
          'https://www.googleapis.com/drive/v3/files?key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8',
          init)
          .then((response) => response.json())
          .then(function(data) {
          console.log(data)
          fetched = data.files[0].id
          console.log(fetched)
          });
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('execute');
checkPageButton.addEventListener('click', function() {
console.log('2') })},);
chrome.runtime.onInstalled.addListener(function(){
chrome.contextMenus.create({
  "id":"sendtodoc",
  "title": "Send2",
  "contexts": ["selection"],
})})
chrome.contextMenus.onClicked.addListener(function(info){
  info.selectionText
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    let init = {
      method: 'POST',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "requests": [
          {
            "insertText": {
              "location": {
                "index": 1
              },
              "text":   info.selectionText + "\n"
            }
          }
        ]
      }),
      'contentType': 'json'
    };

    fetch(
        "https://docs.googleapis.com/v1/documents/"+ fetched +":batchUpdate?access_token=yes&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8",
        init)
        .then((response) => response.json())
        .then(function(data) {
          console.log(data)
          console.log(fetched)
        });
  });
})