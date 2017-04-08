const { app, BrowserWindow, globalShortcut, Menu, Tray, Notification } = require('electron');

const path = require('path');
const url = require('url');

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    nodeIntegration: false,
    icon: path.join(__dirname, 'icon-16x16.png')
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
  });

  // buildTrayIcon();
});

let buildTrayIcon = () => {
  let trayIconPath = path.join(__dirname, 'icon-16x16.png');

  trayApp = new Tray(trayIconPath);
  trayApp.setToolTip('Angular FoodChooser');
};
