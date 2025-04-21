import { TypeUtils } from "../../internal.js";
import { Location } from "../../internal.js";
import { LocationFactory } from "../../internal.js";
import { RoomManager } from "../../internal.js";

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
     * @param {RoomManager} roomManager The room manager for the agent.
     * @throws {Error} If the provided agent is not an instance of Agent or if speed is not a number.
     */
    constructor(initialLocation, speed, roomManager) {
        TypeUtils.ensureInstanceOf(initialLocation, Location);
        TypeUtils.ensureNumber(speed);
        TypeUtils.ensureInstanceOf(roomManager, RoomManager);
        this.speed = speed;
        this.location = initialLocation;
        this.destination = Movement.NULL_LOCATION;
        this.isAgentMoving = false;
        this.roomManager = roomManager;
    }

    /**
     * Gets the current location of the agent.
     * 
     * @returns {Location} The current location.
     */
    getLocation() {
        return this.location;
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
        const dx = this.destination.x - this.location.x;
        const dy = this.destination.y - this.location.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // handle case where the agent is already at the destination
        if (dist <= this.speed) {
            this.location.x = this.destination.x;
            this.location.y = this.destination.y;
            this.isAgentMoving = false;
            this.destination = Movement.NULL_LOCATION;
            return true; 
        }

        // Still moving
        const angle = Math.atan2(dy, dx);
        this.location.x += this.speed * Math.cos(angle);
        this.location.y += this.speed * Math.sin(angle);
        return false; 

    }
}