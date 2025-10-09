const { app, BrowserWindow, ipcMain, session } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // expose ipc
      contextIsolation: true,
      webviewTag: true, // ✅ allows <webview> in your HTML
      nodeIntegration: false,
    }
  });

  const ses = session.defaultSession;
  ses.setPermissionRequestHandler((webContents, permission, callback, details) => {
    console.log("Permission requested:", permission, "from", details.requestingOrigin);

    // Allow both camera & microphone access
    if (["media", "microphone", "camera"].includes(permission)) {
      callback(true);
    } else {
      callback(false);
    }
  });

   mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();    // maximize window
    mainWindow.setFullScreen(true); // and enter fullscreen mode
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
