import { TypeUtils } from "../../internal.js";
import { Location } from "../../internal.js";
import { LocationFactory } from "../../internal.js";
import { Scene } from "../../internal.js";

/**
 * Represents a movement system for an agent.
 */
export class Movement {

    /**
     * A constant representing a null location.
     */
    static NULL_LOCATION = LocationFactory.createNullLocation();

    /**
     * Constructor for the Movement class.
     * 
     * Destination is set to current location.
     * 
     * @param {Location} initialLocation The initial location of the agent.
     * @param {number} speed The speed of the agent.
     * @param {Scene} scene The scene for the agent.
     * @throws {Error} If the provided agent is not an instance of Agent or if speed is not a number.
     */
    constructor(initialLocation, speed, scene) {
        TypeUtils.ensureInstanceOf(initialLocation, Location);
        TypeUtils.ensureNumber(speed);
        TypeUtils.ensureInstanceOf(scene, Scene);
        this.speed = speed;
        this.position = initialLocation.getPosition();
        this.destination = Movement.NULL_LOCATION;
        this.isAgentMoving = false;
        this.scene = scene;
    }

    /**
     * Gets the current location of the agent.
     * 
     * @returns {Location} The current location.
     */
    getLocation() {
        return Location.create("Current Location", this.position);        
    }

    /**
     * Gets the current position of the agent.
     * 
     * @returns {Position} The current position.
     */
    getPosition() {
        return this.position;
    }

    /**
     * Gets the current destination of the agent.
     * 
     * @returns {Location | null} The destination location, or null if not moving.
     */
    getDestination() {
        return this.destination;
    }

    /**
       * Checks if the agent is currently moving.
       *
       * @returns {boolean} True if the agent is moving, false otherwise.
       */
    isMoving() {
        return this.isAgentMoving;
    }

    /** 
     * Moves the agent to a specified destination.
     * 
     * @param {Location} destination The destination location.
     * @throws {Error} If the provided destination is not an instance of Location.
     */
    moveTo(destination) {
        TypeUtils.ensureInstanceOf(destination, Location);
        this.destination = destination;
        this.isAgentMoving = true;
    }

    /**
     * Checks if the given location is within a reasonable range of the agent's position.
     * 
     * @param {Location} location The location to check.
     * @returns {boolean} True if the location is within a reasonable range, false otherwise.
     */
    isWithinReasonbleRange(location) {
        TypeUtils.ensureInstanceOf(location, Location);
        const locPosition = location.getPosition();
        return this.position.distanceTo(locPosition) <= Intention.EXECUTION_RANGE;
    }

    /** 
     * Updates the agent's position based on its speed and destination.
     *
     * @returns {boolean} True if the agent has reached its destination, false otherwise.
     */
    update() {
        
        // exit if the agent is not moving
        if (!this.isAgentMoving) {
            return true;
        }

        // exit if destination is null location
        if (this.destination == Movement.NULL_LOCATION) {
            return true; 
        }

        // Calculate the distance to the destination
        const dist = this.position.distanceTo(this.destination.getPosition());

        // handle case where the agent is already at the destination
        if (dist <= this.speed) {
            this.position = this.position.set2(this.destination.getPosition());
            this.isAgentMoving = false;
            this.destination = Movement.NULL_LOCATION;
            return true; 
        }

        // Still moving
        const dx = this.destination.getPosition().getX() - this.position.getX();
        const dy = this.destination.getPosition().getY() - this.position.getY();        
        const angle = Math.atan2(dy, dx);
        const x = this.position.getX() + this.speed * Math.cos(angle);
        const y = this.position.getY() + this.speed * Math.sin(angle);
        this.position = this.position.set(x, y);
    }
}