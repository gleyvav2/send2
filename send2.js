document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('authenticate');
  checkPageButton.addEventListener('click', function() {
console.log('1'),authenticate() })},)
document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('execute');
checkPageButton.addEventListener('click', function() {
console.log('2'),execute() })},)

var body = document.getElementsByTagName('body')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://apis.google.com/js/api.js";
body.appendChild(script);