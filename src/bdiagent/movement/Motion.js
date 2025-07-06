/**
 * Abstract base class/interface for motion systems
 */
export class Motion {
    /**
     * The speed of the agent.
     * @returns {number}
     */
    getSpeed() { throw new Error('Not implemented'); }

    /**
     * Gets the current position of the agent.
     * @returns {Position}
     */
    getPosition() { throw new Error('Not implemented'); }

    /**
     * Gets the current destination location of the agent.
     * @returns {Location}
     */
    getDestination() { throw new Error('Not implemented'); }

    /**
     * Gets the current room the agent is in or moving toward.
     * @returns {Room}
     */
    getRoom() { throw new Error('Not implemented'); }

    /**
     * Checks if the agent is within the current room.
     * @returns {boolean}
     */
    isWithinRoom() { throw new Error('Not implemented'); }

    /**
     * Checks if the agent is currently moving.
     * @returns {boolean}
     */
    isMoving() { throw new Error('Not implemented'); }

    /**
     * Checks if the agent has a target position defined.
     * @returns {boolean}
     */
    isTargetPositionDefined() { throw new Error('Not implemented'); }

    /**
     * Checks if the agent can reach the target position in the current step.
     * @returns {boolean}
     */
    canReachTargetPosition() { throw new Error('Not implemented'); }

    /**
     * Gets the target position.
     * @returns {Position}
     */
    getTargetPosition() { throw new Error('Not implemented'); }

    /**
     * Checks if the agent has reached its final destination.
     * @returns {boolean}
     */
    hasReachedFinalDestination() { throw new Error('Not implemented'); }

    /**
     * Gets the path the agent is following.
     * @returns {Path}
     */
    getPath() { throw new Error('Not implemented'); }

    /**
     * Initiate motion to a specified destination.
     * @param {Location} destination
     */
    moveTo(destination) { throw new Error('Not implemented'); }

    /**
     * Checks if the given location is within a reasonable range.
     * @param {Location} location
     * @returns {boolean}
     */
    isWithinReasonableRange(location) { throw new Error('Not implemented'); }

    /**
     * Updates the agent's position based on its speed and destination.
     * @returns {boolean}
     */
    update() { throw new Error('Not implemented'); }
}
