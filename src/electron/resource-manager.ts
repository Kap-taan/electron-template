import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";
import { ipcSendHandler } from "./utils.js";


const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
    setInterval(async () => {
        const cpuUsage = await getCPUUsage();
        const ramUsage = getRamUsage();
        const diskUsage = getStorageData().usage;
        ipcSendHandler(mainWindow, "statistics", () => { return {cpuUsage, ramUsage, diskUsage}});
    }, POLLING_INTERVAL);
}

export function getStaticResources() : SystemData {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage, cpuModel, totalMemoryGB
    };
}

function getCPUUsage() : Promise<number> {
    return new Promise((resolve, reject) => {
        osUtils.cpuUsage(resolve);
    })
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? "C://" : "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    
    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - (free / total)
    };

}