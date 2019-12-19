loadScript('https://apis.google.com/js/api.js?onload=onApiLoad');
function loadScript(url){
  var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}
		if(request.status !== 200){
			return;
		}
		eval(request.responseText);
	};
	request.open('GET', url);
	request.send();
}
var developerKey = "AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8";
var clientId = "481015228871-q4rf7lfga87fu752pr2tnrgc49tmrv1h.apps.googleusercontent.com";
var scope = 'https://www.googleapis.com/auth/drive.file';
var pickerApiLoaded = false;

function onApiLoad() {
  gapi.load('auth2', onAuthApiLoad);
  gapi.load('picker', onPickerApiLoad);
}
function onAuthApiLoad() {
  var authBtn = document.getElementById('authenticate');  
  authBtn.addEventListener('click', function() {
    document.getElementById('main').style.width="800px";
    document.getElementById('main').style.height="600px";

    chrome.identity.getAuthToken({interactive: true}, function(token){ token
    var picker = new google.picker.PickerBuilder().
    addView(google.picker.ViewId.DOCUMENTS).
    setOAuthToken(token).
    setDeveloperKey(developerKey).
    setCallback(pickerCallback).
    build();
picker.setVisible(true);
  })});
}
var oauthToken;

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCUMENTS).
        enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED	).
        setOAuthToken(oauthToken).
        setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
    picker.setVisible(true);
  }
}
function pickerCallback(data) {
  var url ;
  var title;
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    url = doc[google.picker.Document.ID];
    title = doc[google.picker.Document.NAME]
    chrome.storage.local.set({key:url,key2:title}, function() {
      });   
      chrome.notifications.create(
        'selecteddoc',{   
        type: 'basic', 
        iconUrl: 'send2.png', 
        title: "Send2", 
        message: "Your doc has been selected: " +title ,
        silent:true,
        priority:0 
        },
      )
      document.getElementById('main').style.width="250px";
    document.getElementById('main').style.height="250px";
    setTimeout("window.close()",100);

    }
  else if 
  (data[google.picker.Response.ACTION] == google.picker.Action.CANCEL){
    window.close()
  }
  else if (closeme == 1 ){    window.close()
  }
}
document.addEventListener('DOMContentLoaded', function () {
addEventListener('change', function(){
dpselect = document.getElementById('dropdown').value;
chrome.storage.local.set({"dpselectset":dpselect}, function() {
})
})})


document.addEventListener('DOMContentLoaded', function () {
chrome.storage.local.get('dpselectset', function(result) {
  if (result.dpselectset == "on")
  {document.getElementById('dropdown').value="on"}
  else if (result.dpselectset == "off"){
  document.getElementById('dropdown').value="off"
}
})})

document.addEventListener('DOMContentLoaded', function () {
var donatebtn = document.getElementById('donate');  
donatebtn.addEventListener('click', function() {
    var newURL = "https://ko-fi.com/send22";
    chrome.tabs.create({ url: newURL });
  })})

document.addEventListener('DOMContentLoaded', function () {
    var donatebtn = document.getElementById('tutorial');  
    donatebtn.addEventListener('click', function() {
        var newURL = "./tutorial/tutorial.html";
        chrome.tabs.create({ url: newURL });
      })})

      
document.addEventListener('DOMContentLoaded', function () {
  var phone = document.getElementById('phone');  
  phone.addEventListener('click', function() {

    var data = {
    'to': '16197271386',
    'from':'16192899915',
    'Body': 'Hola'}

    var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.twilio.com/2010-04-01/Accounts/AC7c0420605b10b3bc1ec2bafc071553d9/Messages.json", true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent("AC7c0420605b10b3bc1ec2bafc071553d9" + ':' + "4beb056670936962dcebc9e26db3500a"))))
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            console.log(xhr.responseText);
          }
        }
        xhr.send(JSON.stringify(data));
    })})


document.addEventListener('DOMContentLoaded', function () {
  var currentUrl = document.getElementById('currentUrl');  
  currentUrl.addEventListener('click', function() { console.log("gg")
    chrome.tabs.getSelected(null,function(tab) {
      chrome.storage.local.get(['key','key2'], function(result) {
        gg = result.key
        title = result.key2
      var tablink = tab.url;
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
                  "text":tablink+"\n"
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
      console.log(tablink)
  });
              }))})})})})})})
