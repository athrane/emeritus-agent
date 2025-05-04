import { TypeUtils } from '../../internal.js';
import { Position } from '../../internal.js';
import { Room } from '../../internal.js';
import { Location } from '../../internal.js';
import { Path } from '../../internal.js';

/**
 * Class representing a scene consisting of rooms and locations.
 * 
 * This class is responsible for creating rooms, adding locations to them,
 * and finding paths between rooms.
 */
export class Scene {

    /**
     * Constructor for the RoomManager class.
     * Initializes an empty map to store rooms.
     */
    constructor() {
        this.rooms = new Map();
    }

    /**
     * Creates and stores a new room in the scene.
     *
     * @param {string} name The name of the room.
     * @param {number} x The x-coordinate of the room. Coordinate defined upper left corner.
     * @param {number} y The y-coordinate of the room. Coordinate defined upper left corner.
     * @param {number} width The width of the room.   
     * @param {number} height The height of the room.
     * @returns {Room} The created Room object.
     * @throws {Error} If creation of the room fails.
     */
    createRoom(name, x, y, width, height) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureNumber(x);
        TypeUtils.ensureNumber(y);
        TypeUtils.ensureNumber(width);
        TypeUtils.ensureNumber(height);

        // Check if room already exists
        if (this.rooms.has(name)) {
            throw new Error(`Room ${name} already exists`);
        }

        // Check if room dimensions are valid
        if (width <= 0 || height <= 0) {
            throw new Error(`Room dimensions must be positive`);
        }

        // create room
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
     * @throws {Error} If the room is not found.
     */
    getRoom(name) {
        TypeUtils.ensureString(name);

        // throw error if room doesn't exists
        if (!this.rooms.has(name)) {
            throw new Error(`Room ${name} not found`);
        }

        // return room
        return this.rooms.get(name);
    }

    /**
     * Finds the shortest path between two locations using BFS.
     *
     * @param {Location} startLocation The starting location.
     * @param {Location} endLocation The ending location.
     * @returns {Path} A Path object representing the shortest path of room names, or an empty Path if no path exists.
     * 
     * @deprecated
     */
    findShortestPath(startLocation, endLocation) {
        TypeUtils.ensureInstanceOf(startLocation, Location);
        TypeUtils.ensureInstanceOf(endLocation, Location);
        const startRoom = this.getRoomForLocation(startLocation);
        const endRoom = this.getRoomForLocation(endLocation);

        // throw error if start location isn't in a room
        if (!startRoom) {
            throw new Error(`Start location ${startLocation.getName()} not found in any room`);
        }

        // throw error if start location isn't in a room
        if (!endRoom) {
            throw new Error(`End location ${startLocation.getName()} not found in any room`);
        }

        // return path if start and end room are the same  
        if (startRoom === endRoom) {
            return Path.create([startRoom.getName()]);
        }

        const queue = [{ room: startRoom, path: [startRoom.getName()] }];
        const visited = new Set([startRoom.getName()]);

        while (queue.length > 0) {
            const { room, path } = queue.shift();

            if (room === endRoom) {
                return Path.create(path);
            }

            const adjacentRooms = room.getAdjacentRooms();            
            for (const adjacentRoomName of adjacentRooms) {
                if (!visited.has(adjacentRoomName)) {
                    visited.add(adjacentRoomName);
                    const adjacentRoom = this.getRoom(adjacentRoomName);
                    queue.push({ room: adjacentRoom, path: [...path, adjacentRoom.getName()] });
                }
            }
        }

        // Return empty Path object        
        return Path.createEmpty();
    }

    /**
     * Finds the shortest path between two rooms using BFS.
     *
     * @param {Room} start The starting room.
     * @param {Room} end The destination room.
     * @returns {Path} A Path object representing the shortest path of room names, or an empty Path if no path exists.
     */
    findShortestPath2(start, end) {
        TypeUtils.ensureInstanceOf(start, Room);
        TypeUtils.ensureInstanceOf(end, Room);

        // return path if start and end room are the same  
        if (start === end) {
            return Path.create([start.getName()]);
        }

        const queue = [{ room: start, path: [start.getName()] }];
        const visited = new Set([start.getName()]);

        while (queue.length > 0) {
            const { room, path } = queue.shift();

            if (room === end) {
                return Path.create(path);
            }

            const adjacentRooms = room.getAdjacentRooms();            
            for (const adjacentRoomName of adjacentRooms) {
                if (!visited.has(adjacentRoomName)) {
                    visited.add(adjacentRoomName);
                    const adjacentRoom = this.getRoom(adjacentRoomName);
                    queue.push({ room: adjacentRoom, path: [...path, adjacentRoom.getName()] });
                }
            }
        }

        // Return empty Path object        
        return Path.createEmpty();
    }

    /**
     * Helper function to get the room a location belongs to.
     *
     * @param {Location} location The location.
     * @returns {Room | undefined} The room containing the location, or undefined if not found.
     * @deprecated
     */
    getRoomForLocation(location) {
        TypeUtils.ensureInstanceOf(location, Location);

        for (const room of this.rooms.values()) {
            // Basic bounding box check (can be made more sophisticated)
            const roomPos = room.getPosition();
            const roomSize = room.getSize();
            const locPos = location.getPhysicalPosition();

            if (
                locPos.getX() >= roomPos.getX() &&
                locPos.getX() <= roomPos.getX() + roomSize.getX() &&
                locPos.getY() >= roomPos.getY() &&
                locPos.getY() <= roomPos.getY() + roomSize.getY()
            ) {
                return room;
            }
        }
        return undefined;
    }

    /**
     * Gets a location by its name from any room in the scene.
     * @param {string} locationName The name of the location.
     * @returns {Location} The Location object.
     * @throws {Error} If the location is not found in any room.
     */
    getLocation(locationName) {
        TypeUtils.ensureString(locationName);
        for (const room of this.rooms.values()) {
            
            // Check if the room has the location
            if (!room.hasLocation(locationName)) {
                continue;
            }
        
            // Get the location from the room
            return room.getLocation(locationName);
        }
        throw new Error(`Location ${locationName} not found in scene`);
    }
}