import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";
import { Location } from "../../internal.js";

/**
 * Represents a movement system for an agent.
 */
export class Movement {
    /**
     * Constructor for the Movement class.
     * 
     * @param {Agent} agent The agent associated with this movement system.
     * @param {Location} initialLocation The initial location of the agent.
     * @param {number} speed The speed of the agent.
     * @throws {Error} If the provided agent is not an instance of Agent or if speed is not a number.
     */
    constructor(agent, initialLocation, speed) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        TypeUtils.ensureInstanceOf(initialLocation, Location);
        TypeUtils.ensureNumber(speed);
        this.agent = agent;
        this.speed = speed;
        this.location = initialLocation;
        this.destination = null;
        this.isMoving = false;
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
     * Moves the agent to a specified destination.
     * 
     * @param {Location} destination The destination location.
     * @throws {Error} If the provided destination is not an instance of Location.
     */
    moveTo(destination) {
        TypeUtils.ensureInstanceOf(destination, Location);
        this.destination = destination;
        this.isMoving = true;
    }

    /** 
     * Updates the agent's position based on its speed and destination.
     *
     * @returns {boolean} True if the agent has reached its destination, false otherwise.
     */
    update() {
        if (!this.isMoving || !this.destination) {
            return true; // Not moving or no destination
        }

        // get agent's current location
        const currentLocation = this.agent.location;

        // Calculate the distance to the destination
        const dx = this.destination.x - currentLocation.x;
        const dy = this.destination.y - currentLocation.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // handle case where the agent is already at the destination
        if (dist <= this.speed) {
            this.currentLocation.x = this.destination.x;
            this.currentLocation.y = this.destination.y;
            this.isMoving = false;
            this.destination = null;
            return true; // Reached destination
        }

        // Still moving
        const angle = Math.atan2(dy, dx);
        this.currentLocation.x += this.speed * Math.cos(angle);
        this.currentLocation.y += this.speed * Math.sin(angle);
        return false; // Still moving

    }
}