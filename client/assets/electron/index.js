const { app, BrowserWindow, globalShortcut } = require('electron');

const cpuValues = require('./cpuValues');
const trayIcon = require('./trayIcon');

let mainWindow = null;

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
