const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setBaseUrl: (url) => ipcRenderer.send("set-base-url", url),
  getSystemSerial: async () => {
    return "DUMMY-SERIAL"; // bisa diset apa aja
  }
});
