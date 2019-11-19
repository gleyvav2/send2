document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('authenticate').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      authon = 0
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
                "text": unos.selectionText + "\n"
              }
            }
          ]
        }),
        'contentType': 'json'
      };

      fetch(
          'https://docs.googleapis.com/v1/documents/19fH2thVHfNWOZxXa7P6GvmIF5ajtjtSusbkymZKJeaM:batchUpdate?access_token=yes&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8',
          init)
          .then((response) => response.json())
          .then(function(data) {
            console.log(data)
          });
    });
  });
})


document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('execute');
checkPageButton.addEventListener('click', function() {
console.log("gg" ) })},);



chrome.contextMenus.onClicked.addListener(getword);
chrome.runtime.onInstalled.addListener(function() {
var contexts = ["page","selection","link","editable"];
var title = "Send2";

chrome.contextMenus.create({
 "title": title,
 "contexts": contexts,
 "id": "main_parent"
 });
});

function getword(pito,tab) {
   pito.selectionText;
   console.log(typeof pito)
   unos = pito
 }

 let unos ;