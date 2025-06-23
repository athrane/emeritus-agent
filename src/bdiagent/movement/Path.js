import { TypeUtils } from '../../internal.js';

/**
 * Represents a sequence of rooms forming a path between two locations.
 */
export class Path {

    /**
     * An array of room names representing the path. 
     * @type {string[]} 
     */
    roomNames; 
    
    /**
     * The current index in the path.
     * @type {number}
     */
    currentIndex;

    /**
     * Creates a new Path instance.
     * 
     * @param {string[]} roomNames - An array of room names representing the path.
     */
    constructor(roomNames) {
        TypeUtils.ensureArray(roomNames);
        roomNames.forEach(name => TypeUtils.ensureString(name));
        this.roomNames = [...roomNames]; // Store a copy
        this.currentIndex = 0; // Default to 0 (start at the beginning)
    }

    /**
     * Gets the sequence of room names in the path.
     * 
     * @returns {string[]} A copy of the room names array.
     */
    getRoomNames() {
        return [...this.roomNames]; // Return a copy to maintain immutability
    }

    /**
     * Checks if the path is empty (contains no rooms).
     * 
     * @returns {boolean} True if the path is empty, false otherwise.
     */
    isEmpty() {
        return this.roomNames.length === 0;
    }

    /**
     * Gets the number of rooms (steps) in the path.
     * 
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

    /**
     * Gets the name of the current room in the path.
     * 
     * @returns {string} The name of the current room.
     * @throws {Error} If the path is empty.
     */
    getRoom() {
        if (this.isEmpty()) {
            throw new Error("Path is empty");
        }
        return this.getRoomAt(this.currentIndex);
    }

    /**
     * Gets the name of the first room in the path.
     * 
     * @returns {string} The name of the first room.
     * @throws {Error} If the path is empty.
     */ 
    getStartRoom() {
        if (this.isEmpty()) {
            throw new Error("Path is empty");
        }
        return this.getRoomAt(0);
    }

    /**
     * Gets the name of the last room in the path.
     * 
     * @returns {string} The name of the last room.
     * @throws {Error} If the path is empty.
     */
    getEndRoom() {
        if (this.isEmpty()) {
            throw new Error("Path is empty");
        }
        return this.getRoomAt(this.roomNames.length - 1);
    }

    /**
     * Gets the current index in the path.
     * 
     * @returns {number}
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Advances the current index by 1.
     * If the current index is already at or past the end of the path, it does nothing.
     */
    advanceIndex() {
        if (this.currentIndex < this.roomNames.length - 1) {
            this.currentIndex++;
        }
    }

    /**
     * Checks if the current index is at or past the end of the path.
     * if the path is empty, function will return true.
     * 
     * @returns {boolean}
     */
    isAtEnd() {
        if(this.isEmpty()) return true;         
        return this.currentIndex == (this.roomNames.length - 1);
    }
    
    /**
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
