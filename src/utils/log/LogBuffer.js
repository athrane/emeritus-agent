import { TypeUtils } from '../../internal.js';

export class LogBuffer {
    constructor() {
        this.logs = []; // Array to store log messages
    }

    /**
     * Adds a log message to the buffer.
     * @param {string} message - The log message to add.
     */
    addLog(message) {
        TypeUtils.ensureString(message);
        this.logs.push(message);
    }

    /**
     * Retrieves all log messages from the buffer.
     * @returns {string[]} An array of log messages.
     */
    getLogs() {
        return this.logs;
    }

    /**
     * Clears all log messages from the buffer.
     */
    clearLogs() {
        this.logs = [];
    }
}