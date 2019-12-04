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


getmani = chrome.runtime.getManifest()
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

      // The Client ID obtained from the Google API Console. Replace with your own Client ID.
      var clientId = "481015228871-q4rf7lfga87fu752pr2tnrgc49tmrv1h.apps.googleusercontent.com";

      // Scope to use to access user's photos.
      var scope = 'https://www.googleapis.com/auth/drive.file';



var pickerApiLoaded = false;


// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
  gapi.load('auth2', onAuthApiLoad);
  gapi.load('picker', onPickerApiLoad);
}
function onAuthApiLoad() {
  var authBtn = document.getElementById('execute');  
  authBtn.addEventListener('click', function() {
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

// Create and render a Picker object for picking from Google Photos.
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCUMENTS).
        setOAuthToken(oauthToken).
        setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
    picker.setVisible(true);
  }
}

// A simple callback implementation.
function pickerCallback(data) {
  var url = 'nothing';
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    url = doc[google.picker.Document.ID];
    chrome.storage.local.set({key: url}, function() {
      console.log('Value is set to ' + url);
    })
  }
}
