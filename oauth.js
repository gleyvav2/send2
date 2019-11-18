window.onload = function() {
    document.getElementById('authenticate').addEventListener('click', function() {
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
                  "text": "Test"
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
  };



  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('execute');
    checkPageButton.addEventListener('click', function() {
    console.log('2') })},);