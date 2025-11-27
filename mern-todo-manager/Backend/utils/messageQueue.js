class MessageQueue {
    constructor() {
        this.queue = [];
        this.handlers = {};
    }

    publish(topic, message) {
        if (!this.queue[topic]) {
            this.queue[topic] = [];
        }
        this.queue[topic].push(message);
        console.log(`[Queue] Message published to ${topic}:`, message);

        // Trigger handler if exists (simulating worker)
        if (this.handlers[topic]) {
            const msg = this.queue[topic].shift();
            this.handlers[topic](msg);
        }
    }

    subscribe(topic, handler) {
        this.handlers[topic] = handler;
        console.log(`[Queue] Subscribed to ${topic}`);
    }
}

const messageQueue = new MessageQueue();

module.exports = messageQueue;
