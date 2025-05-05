type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
};

type SystemData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
}

// these events should return these type of data only
type EventPayloadMapping = {
    statistics: Statistics, // these are the event names
    getStaticData: SystemData
}

interface Window {
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<SystemData>;
    }
}