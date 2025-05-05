import { BrowserWindow, ipcMain } from "electron"

export function isDev(): boolean {
    return process.env.NODE_ENV === "development"
}

export function ipcHandler<Key extends keyof EventPayloadMapping>(key: Key, handler: () => EventPayloadMapping[Key]) {
    ipcMain.handle(key, (event) => handler());
}

export function ipcSendHandler<Key extends keyof EventPayloadMapping>(browserWindow: BrowserWindow, key: Key, callback: () => EventPayloadMapping[Key]) {
    browserWindow.webContents.send(key, callback());
}