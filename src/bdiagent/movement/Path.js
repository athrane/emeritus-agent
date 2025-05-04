import { TypeUtils } from '../../internal.js';

/**
 * Represents a sequence of rooms forming a path between two locations.
 */
export class Path {
    /** @type {string[]} */
    roomNames; // Private field to hold the room names

    /**
     * Creates a new Path instance.
     * @param {string[]} roomNames - An array of room names representing the path.
     */
    constructor(roomNames) {
        TypeUtils.ensureArray(roomNames);
        roomNames.forEach(name => TypeUtils.ensureString(name));
        this.roomNames = [...roomNames]; // Store a copy
    }

    /**
     * Gets the sequence of room names in the path.
     * @returns {string[]} A copy of the room names array.
     */
    getRoomNames() {
        return [...this.roomNames]; // Return a copy to maintain immutability
    }

    /**
     * Checks if the path is empty (contains no rooms).
     * @returns {boolean} True if the path is empty, false otherwise.
     */
    isEmpty() {
        return this.roomNames.length === 0;
    }

    /**
     * Gets the number of rooms (steps) in the path.
     * @returns {number} The length of the path.
     */
    getLength() {
        return this.roomNames.length;
    }

    /**
     * Gets the name of the room at a specific index.
     * @param {number} index - The index of the room in the path.
     * @returns {string} The name of the room at the specified index.
     * @throws {RangeError} If the index is out of bounds.
     */
    getRoomAt(index) {
        TypeUtils.ensureNumber(index);
        if (index < 0 || index >= this.roomNames.length) {
            throw new RangeError(`Index ${index} is out of bounds`);
        }
        return this.roomNames[index];
    }

    getStartRoom() {
        if (this.isEmpty()) {
            throw new Error("Path is empty");
        }
        return this.getRoomAt(0);
    }

    getEndRoom() {
        if (this.isEmpty()) {
            throw new Error("Path is empty");
        }
        return this.getRoomAt(this.roomNames.length - 1);
    }

    // Add more methods later as needed (e.g., getStartRoomName, getEndRoomName)

    /**
     * 
     * Creates a new Path instance from an array of room names.
     * @param {string[]} roomNames - An array of room names.
     * @returns {Path} A new Path object.
     */
    static create(roomNames) {
        return new Path(roomNames);
    }

    /**
     * Creates an empty Path instance.
     * @returns {Path} A new Path object with no rooms.
     */ 
    static createEmpty() {
        return new Path([]);
    }
}
