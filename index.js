'use strict'
require('dotenv').config();

const getZenPhrase = () => {
  let zenButton = document.getElementById('zen-button');

  zenButton.addEventListener('click', function (event) {

   const url = 'https://api.github.com/zen';
   var request = new Request(url, {
      method: 'GET',
      headers: new Headers({
          "User-Agent" : "saraford",
          "Authorization" : "token " + process.env.TOKEN,
         })
    });

     window.fetch(request).then(function(response) {
       return response.text();
     }).then(function(text) {
       document.querySelector('#zen-phrase').textContent = text;
     });
  })
}

var zenButton = null;

document.addEventListener('DOMContentLoaded', function() {
  getZenPhrase();
});
