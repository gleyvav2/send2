var myDate = new Date();
var next_date = new Date(myDate.getTime() + 86400000);
currentdaystring = myDate.toLocaleDateString()
nextdaystring = next_date.toLocaleDateString()
chrome.storage.local.set({"currentdaystring":currentdaystring}, function() {
})
let showstopper = 0 // This needs to reset daily
//One time run on install //
chrome.runtime.onInstalled.addListener(function(){
      var newURL = "./tutorial/tutorial.html";
      chrome.tabs.create({ url: newURL })})
//////////////////////////Start verifying license ////////////////
chrome.storage.local.get('globalcount', function(result) {
  console.log(result.globalcount)
  var finalcount = result.globalcount
chrome.storage.local.get('currentdaystring', function(result) {
console.log(result.currentdaystring), console.log(nextdaystring)})
  if (result.currentdaystring != nextdaystring ){
    finalcount = 0
    console.log("TimeOK")
  }
dailylimitchecker = 0 
dailylimitfree = 20
dailtlimitfull = 120
var showstopper;
if (finalcount >= dailylimitchecker ) { 
  showstopper = 1
}else {showstopper = 0}
chrome.storage.local.set({"showstopper":showstopper}, function() {})
chrome.identity.getAuthToken({interactive: false}, function(token) {
var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    console.log(license);
    var licenseStatus;
    var TRIAL_PERIOD_DAYS = 30
if (license.result && license.accessLevel == "FULL") {
  console.log("Fully paid & properly licensed.");
  licenseStatus = "FULL";
if (licenseStatus == "FULL") { dailylimitchecker = dailtlimitfull
  console.log("worked")
  
}
} else if (license.result && license.accessLevel == "FREE_TRIAL") {
  var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
    licenseStatus = "FREE_TRIAL";
    if (licenseStatus == "FREE_TRIAL") { dailylimitchecker = dailylimitfree
      console.log("Free")
}  
}
  }
}
req.send()

})


var globalcount1 = finalcount || 0 
globalcount1++
chrome.storage.local.set({"globalcount":globalcount1}, function() {
})})

   send2check = "Sent using Send2 "

///////////////////////////////Create right click//
chrome.contextMenus.create({
  "id":"sendtodoc",
  "title": "Send2",
  "contexts": ["selection","link"],
})
///////////////////////////////Send to top right click//
chrome.contextMenus.onClicked.addListener(function(info){
  chrome.storage.local.get('showstopper', function(result) {
  if (result.showstopper == 1){console.log("STOPPPPP")}
  else {
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
              "text":send2check+parsed + "\n"  
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
          })} else return (response.json().then(function(data) {counter()
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
            
          )})}))})
        })})}})
      }})})

///////////////////////////////Send to Bot right click//

chrome.contextMenus.onClicked.addListener(function(info){
  selectedtext = info.selectionText
  seletectedlink = info.linkUrl
  let parsed;
  if (selectedtext == undefined){parsed = info.linkUrl}
  if (seletectedlink == undefined){parsed = info.selectionText}
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
        "text":"\n" + send2check + parsed
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
    })} else return (response.json().then(function(data) {counter()
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
    
    })}))})})})}})})
  