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
    var donatebtn = document.getElementById('tutorial');  
    donatebtn.addEventListener('click', function() {
        var newURL = "./tutorial/tutorial.html";
        chrome.tabs.create({ url: newURL });
      })})

//Send current page SMS
document.addEventListener('DOMContentLoaded', function () {
  var phone = document.getElementById('phone');  
  phone.addEventListener('click', function() {
    chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;

    var clientId = "AC7c0420605b10b3bc1ec2bafc071553d9";
    var clientSecret = "4beb056670936962dcebc9e26db3500a";
    var authorizationBasic = window.btoa(clientId + ':' + clientSecret);
    var tonumber = "+16197271386"
    
    var request = new XMLHttpRequest();
    request.open('POST',"https://api.twilio.com/2010-04-01/Accounts/AC7c0420605b10b3bc1ec2bafc071553d9/Messages.json" , true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send("Body="+tablink+" Sent using Send2"+"&From=+16192899915&To="+tonumber+"");
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
            chrome.notifications.clear('success', () => {
            chrome.notifications.create(
              'success',{   
              type: 'basic', 
              iconUrl: 'send2.png', 
              title: "Send2", 
              message: "Your message has been sent to the following number:"+tonumber+"",
              silent:true,
              priority:0 
            })})}}})})})  
