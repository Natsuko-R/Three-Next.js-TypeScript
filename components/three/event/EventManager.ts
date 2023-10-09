type EventCallback = (...args: any[]) => void;

class EventManager {
    private events: { [eventName: string]: EventCallback[] } = {};

    addEventListener(eventName: string, callback: EventCallback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    removeEventListener(eventName: string, callback: EventCallback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    dispatchEvent(eventName: string, ...args: any[]) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...args);
            });
        }
    }
}

const eventManager = new EventManager();
export default eventManager;
