import { BrowserWindow, app, screen } from "electron";
import path from "node:path";
import { loadDatabases, setSubjectsPath } from "../../database";

export function createWindow(win: BrowserWindow | null) {
  if (!process.env.VITE_PUBLIC || !process.env.DIST) {
    throw new Error("Missing environment variables");
  }

  const splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  splash.loadFile(path.join(process.env.VITE_PUBLIC, "splash.html"));
  splash.center();

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    show: false,
    width: screen.getPrimaryDisplay().workAreaSize.width / 1.2,
    height: screen.getPrimaryDisplay().workAreaSize.height - 50,
  });

  if (process.env["VITE_DEV_SERVER_URL"]) {
    win.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  const subjectsPath = path.join(app.getPath("userData"), "subjects");

  setSubjectsPath(subjectsPath);
  loadDatabases();

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  setTimeout(() => {
    splash.close();
    win?.show();
  }, 3000);

  return win;
}
