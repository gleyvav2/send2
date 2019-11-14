window.onload = function() {
    document.getElementById('authenticate').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        let init = {
          method: 'Post',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: application/json,
            'Content-Type': 'application/json',
            "resource": {
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
              }
            
          },

          };
        fetch(
            'https://docs.googleapis.com/v1/documents/19fH2thVHfNWOZxXa7P6GvmIF5ajtjtSusbkymZKJeaM:batchUpdate?key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8',
            init)

            .then((response) => response.json())
            .then(function(data) {
              console.log(data)
              .then 
            });
      });
    });
  };



  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('execute');
    checkPageButton.addEventListener('click', function() {
    console.log('2') })},);