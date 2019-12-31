//Handles selected doc menu highlighter
(function () {
  var lastTitle = "send2 doc";
  function checkTitle() {
      if (lastTitle == document.title) {
          document.addEventListener('DOMContentLoaded', function () {
          docs = document.getElementById('docs')
          docs.style.backgroundColor  = "#77aca2"
          docs.style.color = "white"
      })}
     else if (lastTitle !== document.title) {
      document.addEventListener('DOMContentLoaded', function () {
      docs = document.getElementById('sms')
      docs.style.backgroundColor  = "#77aca2"
      docs.style.color = "white"
  })
    }
  };
  checkTitle();
})();

chrome.storage.local.get('globalcount', function(result) {
  var finalcount = result.globalcount
chrome.storage.local.get('currentdaystring', function(result) {
  if (result.currentdaystring != currentdaystring ){
    finalcount = 0
  }})
  var showstopper;


chrome.identity.getAuthToken({interactive: false}, function(token) {
var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  dailylimitchecker = 0
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    var licenseStatus;
if (license.result && license.accessLevel == "FULL") {
  licenseStatus = "FULL";
if (licenseStatus == "FULL") { dailylimitchecker = 120
}
} else if (license.result && license.accessLevel == "FREE_TRIAL") {
    licenseStatus = "FREE_TRIAL";
    if (licenseStatus == "FREE_TRIAL") { dailylimitchecker = 10
      console.log
}  
}
  }
chrome.storage.local.set({"dailylimitchecker":dailylimitchecker}, function() {})
}
req.send()

chrome.storage.local.get('dailylimitchecker', function(result) {
if (finalcount > result.dailylimitchecker ) { 
  showstopper = 1
}else  {showstopper = 0 }
chrome.storage.local.set({"showstopper":showstopper}, function() {})
})})})

function counter(){chrome.storage.local.get('globalcount', function(result) {
var finalcount = result.globalcount
var globalcount1 = finalcount || 0 
globalcount1++
chrome.storage.local.set({"globalcount":globalcount1}, function() {})
})}
function stopped(){chrome.storage.local.get('showstopper', function(result) {
  if(result.showstopper == 1){
    var w = 550;
    var h = 440;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2); 


    chrome.windows.create({'url': 'upgrade.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} , function(window) {
 },)}})}


//Handles selected doc menu functions
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('docs').addEventListener('click', function() {
    window.location = "/sendto.html";
  })})

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sms').addEventListener('click', function() {
      window.location = "/sendtosms.html";
    })})


var developerKey = "AIzaSyBM02Za0vpbuW8Kcim_xJpLVo4fzevX4m8";
var clientId = "481015228871-q4rf7lfga87fu752pr2tnrgc49tmrv1h.apps.googleusercontent.com";
var scope = 'https://www.googleapis.com/auth/drive.file';


document.addEventListener('DOMContentLoaded', function () {
var donatebtn = document.getElementById('donate');  
donatebtn.addEventListener('click', function() {
    var newURL = "https://ko-fi.com/send22";
    chrome.tabs.create({ url: newURL });
  })})


  document.addEventListener('DOMContentLoaded', function () {
    var Upgrade = document.getElementById('Upgrade');  
    Upgrade.addEventListener('click', function() {
      var w = 550;
      var h = 440;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2); 
  
  
      chrome.windows.create({'url': 'upgrade.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} );
      })})

document.addEventListener('DOMContentLoaded', function () {
    var donatebtn = document.getElementById('tutorial');  
    donatebtn.addEventListener('click', function() {
        var newURL = "./tutorial/tutorial.html";
        chrome.tabs.create({ url: newURL });
      })})

document.addEventListener('DOMContentLoaded', function () {
  btnsubmit = document.getElementById('btnsubmit');
  btnsubmit.addEventListener('click', function(){
    btnsubmit1 = document.getElementById("submitvalue").value;
    chrome.storage.local.set({'btnsubmit':btnsubmit1}, function() {
      document.getElementById("saved").innerHTML = "Saved";
      window.setTimeout(partB,500);
      function partB(){      location.reload()
      }
  })
  })})

  chrome.storage.local.get('btnsubmit', function(result) { 
    document.getElementById("submitvalue").value=result.btnsubmit;
    if (result.btnsubmit === undefined){
      document.getElementById("submitvalue").value="" }

  })


  
//Send current page SMS
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('btnsubmit', function(result) { 

  var phone = document.getElementById('phone');  
  phone.addEventListener('click', function() {
    chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;

    var clientId = "AC7c0420605b10b3bc1ec2bafc071553d9";
    var clientSecret = "4beb056670936962dcebc9e26db3500a";
    var authorizationBasic = window.btoa(clientId + ':' + clientSecret);
    var tonumber = result.btnsubmit
 
    var request = new XMLHttpRequest();
    request.open('POST',"https://api.twilio.com/2010-04-01/Accounts/AC7c0420605b10b3bc1ec2bafc071553d9/Messages.json" , true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send("Body="+"Sent using Send2 "+tablink+"&From=+16192899915&To=1"+tonumber+"");
    request.onreadystatechange = function () {    var checkrequest = request.status
        if (checkrequest == 200){chrome.notifications.create(
          'success',{   
          type: 'basic', 
          iconUrl: 'send2.png', 
          title: "Send2", 
          message: "Please Authorize the app or select a document" ,
          silent:true,
          priority:2 
          })}
          else if (checkrequest == 201){
            chrome.notifications.clear('success', () => {counter()
            chrome.notifications.create(
              'success',{   
              type: 'basic', 
              iconUrl: 'send2.png', 
              title: "Send2", 
              message: "Your message has been sent to the following number:"+tonumber+"",
              silent:true,
              priority:0 
            })})}}})})})})  
