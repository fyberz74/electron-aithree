const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // expose ipc
      contextIsolation: true
    }
  });

  // start with fallback URL until renderer tells us
//   mainWindow.loadURL("https://avasphere-ai.kejaksaanri.id/");
    mainWindow.loadFile("index.html");
}

// listen for renderer to send new base URL from Firebase
ipcMain.on("set-base-url", (event, url) => {
  console.log("👉 Switching to:", url);
  if (mainWindow) {
    mainWindow.loadURL(url);
  }
});

app.whenReady().then(createWindow);
