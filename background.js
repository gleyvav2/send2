chrome.runtime.onInstalled.addListener(function(){
      var newURL = "./tutorial/tutorial.html";
      chrome.tabs.create({ url: newURL })})

chrome.contextMenus.create({
  "id":"sendtodoc",
  "title": "Send2",
  "contexts": ["selection","link"],
})

chrome.contextMenus.onClicked.addListener(function(info){
  chrome.storage.sync.get('globalcount', function(result) {
    let globalcount1
    let globalcount;
    console.log(result.globalcount)
    selectedtext = info.selectionText
  seletectedlink = info.linkUrl
  let parsed;
  if (selectedtext == undefined){parsed = info.linkUrl}
  if (seletectedlink == undefined){parsed = info.selectionText}
  chrome.storage.local.get('dpselectset', function(result) {
    let top1 = result.dpselectset
  if (top1 == "on"){
  chrome.storage.local.get(['key','key2'], function(result) {
    gg = result.key
    title = result.key2
    if (title == null){console.log("nothing")}
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
              "text":parsed + "\n"  
            }
          },
          
        ]
      }),
      'contentType': 'json'
    };

    fetch(
        "https://docs.googleapis.com/v1/documents/"+ gg +":batchUpdate?access_token=yes&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8",
        init)
        .then((response) =>{if(response.status !== 200) {chrome.notifications.create(
          'success',{   
          type: 'basic', 
          iconUrl: 'send2.png', 
          title: "Send2", 
          message: "Please Authorize the app or select a document" ,
          silent:true,
          priority:2 
          })} else return (response.json().then(function(data) {
          chrome.notifications.clear('success', () => {
            chrome.storage.sync.set({'globalcount':globalcount1}, function() {
              globalcount1++
            }),          chrome.notifications.create(
            'success',{   
            type: 'basic', 
            iconUrl: 'send2.png', 
            title: "Send2", 
            message: "Your message has been sent to the following document: " +title ,
            silent:true,
            priority:0 
            },
            
          )})}))})
        })})}})})


           chrome.contextMenus.onClicked.addListener(function(info){
            info.selectionText
            chrome.storage.local.get('dpselectset', function(result) {
              let top1 = result.dpselectset
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
                  "https://docs.googleapis.com/v1/documents/"+ gg +":batchUpdate?access_token=yes&key=AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8",init)
                  .then((response) => {if(response.status !== 200) {chrome.notifications.create(
                    'success',{   
                    type: 'basic', 
                    iconUrl: 'send2.png', 
                    title: "Send2", 
                    message: "Please Authorize the app or select a document" ,
                    silent:true,
                    priority:2 
                    })} else return (response.json().then(function(data) {
                      chrome.notifications.clear('success', () => {
                      chrome.notifications.create(
                        'success',{   
                        type: 'basic', 
                        iconUrl: 'send2.png', 
                        title: "Send2", 
                        message: "Your message has been sent to the following document: " +title ,
                        silent:true,
                        priority:0 
                        
                      },
                      )
                    
                    })}))})})})}})})})