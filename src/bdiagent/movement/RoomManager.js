import { TypeUtils } from '../../internal.js';
import { Position } from '../../internal.js';
import { Room } from '../../internal.js';
import { Location } from '../../internal.js';

/**
 * Class representing a manager for rooms and locations.
 * 
 * This class is responsible for creating rooms, adding locations to them,
 * and finding paths between rooms.
 */
export class RoomManager {

    /**
     * Constructor for the RoomManager class.
     * Initializes an empty map to store rooms.
     */
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
        const position = Position.create(x, y);
        const size = Position.create(width, height);
        const room = Room.create(name, position, size);
        this.rooms.set(name, room);
        return room;
    }

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
     * @param {Position} position The poistion of the location.
     * @param {string} roomName The name of the room to add the location to.
     * @returns {Location} The created Location object.
     */
    createLocation(name, position, roomName) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureInstanceOf(position, Position);
        TypeUtils.ensureString(roomName);
        const location = Location.create(name, position);

        // throw error if room not found
        const aRoom = this.getRoom(roomName);
        if (!aRoom) {
            throw new Error(`Room ${roomName} not found`);
        }

        // throw error if location already exists
        if (aRoom.hasLocation(name)) {
            throw new Error(`Location ${name} already exists in room ${roomName}`);
        }
        
        // add location to room        
        aRoom.addLocation(location);

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