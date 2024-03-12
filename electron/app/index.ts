import { BrowserWindow } from "electron";
import { app } from "electron";
import { createWindow, activate, windowAllClosed } from "./listeners";

export let win: BrowserWindow | null;

export const configureApp = () => {
  app.whenReady().then(() => {
    win = createWindow(win);
  });

  app.on("window-all-closed", () => windowAllClosed(app));

  app.on("activate", () => activate(win));
};
