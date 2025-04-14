import { TypeUtils } from '../../internal.js';

/**
 * Represents a position in the simulation.
 * A position is defined by coordinates (x, y).
 * Object are mutable.
 */
export class Position {
    
    /**
     * Constructor for the Position class.
     * 
     * @param {number} x The x-coordinate of the location.
     * @param {number} y The y-coordinate of the location.
     */
    constructor(x, y) {
        TypeUtils.ensureNumber(x);
        TypeUtils.ensureNumber(y);        
        this.x = x;
        this.y = y;
    }

    /**
     * Gets the x-coordinate of the position.
     * @returns {number} The x-coordinate.
     */
    getX() {
        return this.x;
    }

    /**
     * Gets the y-coordinate of the position.
     * @returns {number} The y-coordinate.
     */
    getY() {
        return this.y;
    }   

    /**
     * Creates a copy of the current position.
     *
     * @returns {Position} A new Position object with the same properties as the original.
     */
    copy() {
        return new Position(this.x, this.y);
    }
    
    /**
     * Calculates the distance to another Position.
     * 
     * @param {Position} otherPosition The other location to calculate the distance to.
     * @returns {number} The Euclidean distance to the other position.
     */
    distanceTo(otherPosition) {
        TypeUtils.ensureInstanceOf(otherPosition, Position);
        return Math.sqrt(
            Math.pow(this.x - otherPosition.x, 2) +
            Math.pow(this.y - otherPosition.y, 2)
        );
    }

}