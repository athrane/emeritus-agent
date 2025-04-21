import { TypeUtils } from '../../internal.js';
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
     */
    constructor(name, position) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureInstanceOf(position, Position);
        this.name = name;
        this.position = position;
    }

    /**
     * Get the name of the location.
     * @returns {string} The name of the location.
     */
    getName() {
        return this.name;
    }

    /**
     * Get the position of the location.
     * @returns {Position} The position of the location.
     */
    getPosition() {
        return this.position;
    }

    /**
     * Creates a copy of the current location.
     *
     * @returns {Location} A new Location object with the same properties as the original.
     */
    copy() {
        return new Location(this.name, this.position);
    }

    /**
     * Creates a new Location object from a name and a Position object.
     *
     * @param {string} name The name of the location.
     * @param {Position} position The Position object representing the coordinates of the location. The location is relative to the room. The location takes a copy of the position.
     * @returns {Location} A new Location object with the specified name and coordinates.
     */
    static create(name, position) {
        return new Location(name, position);
    }

}