const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => ipcOn("statistics", callback), // accept a callback and call that callback in the body of the function
    getStaticData: () => ipcInvoke("getStaticData")
} satisfies Window["electron"]);

// Cannot put in utils.ts (because how electron builder handle this stuff)
function ipcInvoke<Key extends keyof EventPayloadMapping>(key: Key): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key)
}

function ipcOn<Key extends keyof EventPayloadMapping>(key: Key, callback: (data: EventPayloadMapping[Key]) => void) {
    electron.ipcRenderer.on(key, (event: any, data: EventPayloadMapping[Key]) => {
        callback(data);
    })
}