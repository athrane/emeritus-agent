import { TypeUtils } from '../../internal.js';
import { Room } from '../../internal.js';
import { Location } from '../../internal.js';

/**
 * Class representing a manager for rooms and locations.
 * 
 * This class is responsible for creating rooms, adding locations to them,
 * and finding paths between rooms.
 */
export class RoomManager {
    constructor() {
        this.rooms = new Map();
    }

    /**
     * Creates a new room.
     *
     * @param {string} name The name of the room.
     * @param {number} x The x-coordinate of the room. Coordinate defined upper left corner.
     * @param {number} y The y-coordinate of the room. Coordinate defined upper left corner.
     * @param {number} width The width of the room.   
     * @param {number} height The height of the room.
     * @returns {Room} The created Room object.
     */  
    createRoom(name, x, y, width, height) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureNumber(x);
        TypeUtils.ensureNumber(y);
        TypeUtils.ensureNumber(width);
        TypeUtils.ensureNumber(height);
        const room = new Room(name, x, y, width, height);
        this.rooms.set(name, room);
        return room;
    }
    /**
     * Gets all rooms.
     *
     * @returns {Array<Room>} An array of all Room objects.
     */

    /**
     * Gets a room by its name.
     *
     * @param {string} name The name of the room.
     * @returns {Room} The Room object, or undefined if not found.
     */
    getRoom(name) {
        TypeUtils.ensureString(name);
        return this.rooms.get(name);
    }

    /**
     * Creates a new location and adds it to the specified room.
     *
     * @param {string} name The name of the location.
     * @param {number} x The x-coordinate of the location.
     * @param {number} y The y-coordinate of the location.
     * @param {string} roomName The name of the room to add the location to.
     * @returns {Location} The created Location object.
     */
    createLocation(name, x, y, roomName) {
        const location = new Location(name, x, y);
        location.roomName = roomName;
        const room = this.getRoom(roomName);
        if (room) {
            room.addLocation(location);
        }
        return location;
    }

    /**
     * Finds the shortest path between two rooms using BFS or A*.
     *
     * @param {string} startRoomName The name of the starting room.
     * @param {string} endRoomName The name of the ending room.
     * @returns {Array<string>} An array of room names representing the path.
     */
    findShortestPath(startRoomName, endRoomName) {
        // Implement BFS or A* here
        // This is a placeholder
        return [startRoomName, endRoomName];
    }
}