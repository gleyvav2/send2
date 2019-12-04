
chrome.contextMenus.create({
  "id":"sendtodoc",
  "title": "Send2",
  "contexts": ["selection"],
})
chrome.contextMenus.onClicked.addListener(function(info){
  info.selectionText
  chrome.storage.local.get(['key'], function(result) {
    gg = result.key
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
        "https://docs.googleapis.com/v1/documents/"+ gg +":batchUpdate?access_token=yes&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8",
        init)
        .then((response) => response.json())
        .then(function(data) {
          console.log(data)
        });
  });
});

})