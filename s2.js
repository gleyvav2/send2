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
         'https://www.googleapis.com/drive/v3/files?corpora=user&&q=mimeType%3D%22application%2Fvnd.google-apps.document%22and%20trashed%3Dfalse&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8',
          init)
          .then((response) => response.json())
          .then(function(data) {
          console.log(data)
          value = data.files[0].id
          console.log(value)
          chrome.runtime.sendMessage({greeting: value}, function(response) {
          });
          })
    });
  });
});



document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('execute');
checkPageButton.addEventListener('click', function() {
console.log('2')})});
