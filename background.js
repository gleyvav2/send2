chrome.contextMenus.create({
  "id":"sendtodoc",
  "title": "Send2",
  "contexts": ["selection"],
})

chrome.contextMenus.onClicked.addListener(function(info){
  info.selectionText
  chrome.storage.local.get('dpselectset', function(result) {
    let top1 = result.dpselectset
    console.log(top1)
  if (top1 == "on"){
  chrome.storage.local.get(['key','key2'], function(result) {
    gg = result.key
    title = result.key2
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
          chrome.notifications.clear('success', function (){})
          chrome.notifications.create(
            'success',{   
            type: 'basic', 
            iconUrl: 'send2.png', 
            title: "Send2", 
            message: "Your message has been sent to the following document: " +title ,
            silent:true,
            priority:0 
            },
        function(){});
        chrome.notifications.clear('success', function (){}) });
           })})}})})


           chrome.contextMenus.onClicked.addListener(function(info){
            info.selectionText
            chrome.storage.local.get('dpselectset', function(result) {
              let top1 = result.dpselectset
            console.log(top1)
             if (top1 =="off"){
            chrome.storage.local.get(['key','key2'], function(result) {
              gg = result.key
              title = result.key2
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
                        "endOfSegmentLocation": {
                          "segmentId": ""
                        },
                        "text":"\n" +info.selectionText
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
                    chrome.notifications.clear('success', function (){})
                    chrome.notifications.create(
                      'success',{   
                      type: 'basic', 
                      iconUrl: 'send2.png', 
                      title: "Send2", 
                      message: "Your message has been sent to the following document: " +title ,
                      silent:true,
                      priority:0 
                      },
                  function(){});
                  chrome.notifications.clear('success', function (){}) });
                     })})}})})