const { app, BrowserWindow, globalShortcut, protocol } = require('electron');

const path = require('path');
const url = require('url');
const cpuValues = require('./cpuValues');
const trayIcon = require('./trayIcon');

let mainWindow = null;
const base = app.getAppPath();
const scheme = 'app';

{
  /* Protocol */
  // Registering must be done before app::ready fires
  // (Optional) Technically not a standard scheme but works as needed
  protocol.registerSchemesAsPrivileged([
    { scheme: scheme, privileges: { standard: true, secure: true } }
  ]);

  // Create protocol
  require('./create-protocol')(scheme, base);
}

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let startSendCpuValues = () => {
  setInterval(() => {
    cpuValues.getCPUUsage(percentage => {
      console.log('sending to ipc channel: ' + percentage);
      if (mainWindow) {
        mainWindow.webContents.send(
          'newCpuValue',
          (percentage * 100).toFixed(2)
        );
      }
    });
  }, 1000);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true }
  });

  // mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
  });

  trayIcon.buildTrayIcon(mainWindow);
  startSendCpuValues();
};

app.isReady() ? createWindow() : app.on('ready', createWindow);
