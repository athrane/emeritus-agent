import { TypeUtils } from '../../internal.js';

/**
 * Represents a location in the simulation.
 * A location is defined by its name and coordinates (x, y).
 * A location is used to represent a specific point in the environment within a room.
 * Object are mutable.
 */
export class Location {
    
    /**
     * Constructor for the Location class.
     * 
     * @param {string} name The name of the location.
     * @param {number} x The x-coordinate of the location.
     * @param {number} y The y-coordinate of the location.
     */
    constructor(name, x, y) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureNumber(x);
        TypeUtils.ensureNumber(y);        
        this.name = name;
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a copy of the current location.
     *
     * @returns {Location} A new Location object with the same properties as the original.
     */
    copy() {
        return new Location(this.name, this.x, this.y);
    }
    
    /**
     * Calculates the distance to another location.
     * 
     * @param {Location} otherLocation The other location to calculate the distance to.
     * @returns {number} The Euclidean distance to the other location.
     */
    distanceTo(otherLocation) {
        TypeUtils.ensureInstanceOf(otherLocation, Location);
        return Math.sqrt(
            Math.pow(this.x - otherLocation.x, 2) +
            Math.pow(this.y - otherLocation.y, 2)
        );
    }

}