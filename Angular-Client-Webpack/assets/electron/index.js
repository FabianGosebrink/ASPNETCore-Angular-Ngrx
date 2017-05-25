const { app, BrowserWindow, globalShortcut, Menu } = require('electron');

const path = require('path');
const url = require('url');
const cpuValues = require('./cpuValues');
const trayIcon = require('./trayIcon');

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('closed', () => {
    win = null;
  });

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
  });

  trayIcon.buildTrayIcon();
  startSendCpuValues();
});

app.on('window-all-closed', () => {
  app.quit()
})

let startSendCpuValues = () => {
  setInterval(() => {
    cpuValues.getCPUUsage((percentage) => {
      console.log("sending to ipc channel: " + percentage);
      if (mainWindow) {
        mainWindow.webContents.send('newCpuValue', (percentage * 100).toFixed(2));
      }
    });
  }, 1000);
}