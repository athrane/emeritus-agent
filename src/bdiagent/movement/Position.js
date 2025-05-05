import { TypeUtils } from '../../internal.js';

/**
 * Represents a position in the simulation.
 * A position is defined by coordinates (x, y).
 * Object are immutable.
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
            Math.pow(this.x - otherPosition.getX(), 2) +
            Math.pow(this.y - otherPosition.getY(), 2)
        );
    }

    /**
     * Sets the x-coordinate of the position.
     * 
     * @param {number} x The new x-coordinate.
     * @param {number} y The new y-coordinate.
     * @returns {Position} A new Position object with the updated coordinates.
     */
    set(x,y) {
        TypeUtils.ensureNumber(x);
        TypeUtils.ensureNumber(y);
        this.x = x;
        this.y = y;
        return new Position(x, y);
    }

    /**
     * Sets the x-coordinate of the position.
     * 
     * @param {number} x The new x-coordinate.
     * @returns {Position} A new Position object with the updated x-coordinate.
     */
    setX(x) {
        TypeUtils.ensureNumber(x);
        return new Position(x, this.y);
    }

    /**
     * Sets the y-coordinate of the position.
     * 
     * @param {number} y The new y-coordinate.
     * @returns {Position} A new Position object with the updated y-coordinate.
     */
    setY(y) {
        TypeUtils.ensureNumber(y);
        return new Position(this.x, y);
    }

    /**
     * Adds another Position to the current position.
     * Does not modify the current position, as it is immutable.
     * 
     * @param {Position} position The position to add.
     * @returns {Position} A new Position object with the updated coordinates.
     */
    add(position) {
        TypeUtils.ensureInstanceOf(position, Position);
        return new Position(this.x + position.getX(), this.y + position.getY());
    }

    /**
     * Compares this position with another position.
     * 
     * @param {Position} position The position to compare with.
     * @returns {boolean} True if the positions are equal, equality is based on coordinates.
     */ 
    isEqual(position) {
        TypeUtils.ensureInstanceOf(position, Position);
        return this.x === position.getX() && this.y === position.getY();
    }    

    /**
     * Creates a new Position object from x and y coordinates.
     *
     * @param {number} x The x-coordinate of the position.
     * @param {number} y The y-coordinate of the position.
     * @returns {Position} A new Position object.   
     */ 
    static create(x, y) {
        return new Position(x, y);
    }

    /**
     * Creates a new Position object from another Position object.
     * 
     * @param {Position} position The position to copy.
     */
    static create2(position) {
        TypeUtils.ensureInstanceOf(position, Position);
        return new Position(position.getX(), position.getY());
    }
   
}