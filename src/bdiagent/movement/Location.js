import { TypeUtils } from '../../internal.js';

/**
 * Represents a location in the simulation.
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