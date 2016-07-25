'use strict';

const {app, BrowserWindow} = require('electron');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 300,
        width: 400
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
