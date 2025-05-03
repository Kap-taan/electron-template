import { app, BrowserWindow } from "electron";
import Path from 'path';
import { isDev } from "./utils.js";

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    if(isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(Path.join(app.getAppPath(), "dist-react", "index.html"));
    }
})