import { app, BrowserWindow, ipcMain } from "electron";
import Path from 'path';
import { ipcHandler, isDev } from "./utils.js";
import { getStaticResources, pollResources } from "./resource-manager.js";
import { getPreloadPath } from "./path-resolver.js";

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        title: "Electron template",
        webPreferences: {
            preload: getPreloadPath()
        }
    });
    if(isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(Path.join(app.getAppPath(), "dist-react", "index.html"));
    }

    // This will call after rendering the window
    pollResources(mainWindow);
    ipcHandler("getStaticData", getStaticResources);

})