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


// Use the API Loader script to load google.picker and gapi.auth.
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
  console.log(url)
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    url = doc[google.picker.Document.ID];
    title = doc[google.picker.Document.NAME]
    chrome.storage.local.set({key:url,key2:title}, function() {
    })
    window.close()
  }
  else if 
  (data[google.picker.Response.ACTION] == google.picker.Action.CANCEL){
    window.close()
  }
}
