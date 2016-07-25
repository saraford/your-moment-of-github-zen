const zenButton = document.getElementById('zen-button');

zenButton.addEventListener('click', function (event) {
 const url = 'https://api.github.com/zen';
window.fetch(url, { method: 'get'
 }).then(function(response) {
   return response.text();
 }).then(function(text) {
   document.querySelector('#zen-phrase').textContent = text;
 });
})
