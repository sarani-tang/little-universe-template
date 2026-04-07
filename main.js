const { app, BrowserWindow } = require('electron');
const path = require('path');

/* To change the window size, simply adjust the width and height here. */

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadFile('index.html'); 
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});