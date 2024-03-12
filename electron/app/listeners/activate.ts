import { BrowserWindow } from "electron";
import { createWindow } from "./createWindow";

export function activate(win: BrowserWindow | null) {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(win);
  }
}
