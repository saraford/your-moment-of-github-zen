'use strict'

const getZenPhrase = () => {
  let zenButton = document.getElementById('zen-button');

  zenButton.addEventListener('click', function (event) {

   const url = 'https://api.github.com/zen';

   window.fetch(url, { method: 'get'
     }).then(function(response) {
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
