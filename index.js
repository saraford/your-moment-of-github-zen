'use strict'
require('dotenv').config();
const ipcRenderer = require('electron').ipcRenderer;

const wireUpButtons = () => {

  let quitAppButton = document.getElementById('quit-app-button');
//  let closeButton = document.getElementById('close-window-button');
  let zenButton = document.getElementById('zen-button');

  quitAppButton.addEventListener('click', function() {
    ipcRenderer.send('quit-app');
  });

  // closeButton.addEventListener('click', function() {
  //   ipcRenderer.send('close-window');
  // });

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

document.addEventListener('DOMContentLoaded', function() {
  wireUpButtons();
});
