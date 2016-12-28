'use strict';

const {app, BrowserWindow, ipcMain, Tray} = require('electron');
const electron = require('electron');

var tray = undefined;
var mainWindow = undefined;
var screen_size = undefined;

app.on('ready', function() {
    screen_size = electron.screen.getPrimaryDisplay().workAreaSize
    createTray();
    createWindow();
});

ipcMain.on('quit-app', function () {
    app.quit();
});

// ipcMain.on('close-window', function () {
// //  mainWindow.hide();
// });

const createTray = () => {
  tray = new Tray(__dirname + '/umbrellaTemplate.png');
  tray.on('click', function (event) {
    toggleWindow();
  });
}

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
}

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()

// place based on OS because tray is at different locations
  if (process.platform == 'darwin') {
    // place directly under the icon at the top 
    const trayBounds = tray.getBounds()

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    return {x: x, y: y}
  } 
  else {
    // place center on screen because my taskbar is docked to the right
    // instead of the usual at the bottom
    
    const x = Math.round((screen_size.width / 2) - (windowBounds.width / 2));
    const y = Math.round((screen_size.height / 2) - (windowBounds.height / 2));

    return {x: x, y: y}
  }
}

const createWindow = () => {

  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    transparent: true,
    height: 300,
    width: 350,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();


  // Hide the window when it loses focus
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })
}
