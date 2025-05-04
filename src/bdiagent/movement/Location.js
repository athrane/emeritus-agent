import { TypeUtils } from '../../internal.js';
import { Room } from '../../internal.js';
import { Position } from '../../internal.js';

/**
 * Represents a location in the simulation.
 * 
 * A location is defined by its name and coordinates (x, y).
 * A location is used to represent a specific point in the environment within a room.
 * The coordinate are relative to a room.
 * Object are mutable.
 */
export class Location {

    /**
     * Constructor for the Location class.
     * 
     * @param {string} name The name of the location.
     * @param {Position} position The Position object representing the coordinates of the location. The location is relative to the room. 
     * @param {Room} room The room in which the location is located.
     */
    constructor(name, position, room) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureInstanceOf(position, Position);
        TypeUtils.ensureInstanceOf(room, Room);
        this.name = name;
        this.position = position;
        this.room = room; 
    }

    /**
     * Get the name of the location.
     * @returns {string} The name of the location.
     */
    getName() {
        return this.name;
    }

    /**
     * Get the relative position of the location within the room.
     * @returns {Position} relative position of the location within the room.
     */
    getRelativePosition() {
        return this.position;
    }

    /**
     * Get the physical position of the location in the room.
     * The physical position is the sum of the room's position and the location's position.
     * @returns {Position} The physical position of the location in the room.
     */
    getPhysicalPosition() {
        return this.room.getPosition().add(this.position);
    }
    
    /**
     * Get the room in which the location is located.
     * @returns {Room} The room in which the location is located.
     */
    getRoom() {
        return this.room;
    }

    /**
     * Creates a new Location object from a name and a Position object.
     *
     * @param {string} name The name of the location.
     * @param {Position} position The Position object representing the coordinates of the location. The location is relative to the room. The location takes a copy of the position.
     * @param {Room} room The room in which the location is located. 
     * @returns {Location} A new Location object with the specified name and coordinates.
     */
    static create(name, position, room) {
        return new Location(name, position, room);
    }

    /**
     * Creates a null location with coordinates (0,0).
     * 
     * @returns {Location} A Location instance representing a null location.
     */
    static createNullLocation() {
        return Location.create("NULL Location (0,0)", Position.create(0, 0), Room.createNullRoom());;
    }

}