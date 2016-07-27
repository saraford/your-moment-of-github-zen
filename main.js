'use strict';

const {app, BrowserWindow, ipcMain, Tray} = require('electron');

var tray = undefined;
var mainWindow = undefined;

app.on('ready', function() {
    createTray();
    createWindow();
});

ipcMain.on('close-app', function () {
    app.quit();
});

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
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return {x: x, y: y}
}

const createWindow = () => {

  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    height: 400,
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
