// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 660,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Important for security
    }
  });

  // Load the index.html file
  win.loadFile('index.html');

  // Open the DevTools (optional, for development)
  // win.webContents.openDevTools();

  // Optional:  Navigate to a URL instead of loading a local file
  // win.loadURL('https://www.example.com');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});