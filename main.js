const { app, BrowserWindow } = require("electron");
const path = require("path");
const electronLocalshortcut = require("electron-localshortcut");

function createWindow() {
  const win = new BrowserWindow({
    alwaysOnTop: true, // enable always on top to prevent other windows from appearing above it
    kiosk: true, // enable kiosk mode, makes it full screen and what not
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
  });

  electronLocalshortcut.register(win, "Alt+Tab", () => {
    console.log("Windows Button pressed");
    return false;
  });

  win.loadURL("https://kaptiva-backend.herokuapp.com");

  win.setMenu(null);
  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
