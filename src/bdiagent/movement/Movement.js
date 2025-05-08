import { Room, TypeUtils } from "../../internal.js";
import { Location } from "../../internal.js";
import { Scene } from "../../internal.js";
import { Path } from "../../internal.js";
import { Position } from "../../internal.js";
import { Intention } from "../../internal.js";

/**
 * Represents a movement system for an agent.
 */
export class Movement {

    /**
     * A constant representing a null location.
     */
    static NULL_LOCATION = Location.createNullLocation();

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
        this.scene = scene;
        this.isAgentMoving = false;

        // set the initial positioning
        this.position = initialLocation.getPhysicalPosition();
        this.destination = Movement.NULL_LOCATION;
        this.currentRoom = initialLocation.getRoom();

        // initalize pathfinding
        this.path = Path.createEmpty();
        this.targetPosition = null; // The specific Position the agent is moving towards in the current step
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
     * Gets the current destination location of the agent.
     * 
     * @returns {Location} The destination location, or the null destination if not moving.
     */
    getDestination() {
        return this.destination;
    }

    /**
     * Gets the current room that the agent is moving towards or is in.
     * 
     * @returns {Room} The current that the agent is moving towards or is in.
     */
    getRoom() {
        return this.currentRoom;
    }

    /**
     * Checks if the agent is within the current room.
     * 
     * @returns {boolean} True if the agent is within the current room, false otherwise.
     */
    isWithinRoom() {
        // check if the agent position is within absolute coordinates of the room
        return this.currentRoom.isWithinRoom(this.position);
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
     * Checks if the agent has a target position defined as part of its path finding / movement.
     *
     * @returns {boolean} True if the agent has a target position defined as part of its path finding / movement. 
     * Returns false is the value is null or undefined. 
     */
    isTargetPositionDefined() {
        return this.targetPosition != null;
    }

    /**
     * Checks if the agent can reach the target position in the current step.
     * 
     * @returns {boolean} True if the agent can reach the target position in the current step, false otherwise.
     */
    canReachTargetPosition() {
        const dist = this.position.distanceTo(this.targetPosition);
        return dist <= this.speed;
    }

    /**
     * Get agent target position defined as part of its path finding / movement.
     *
     * @returns {Position} The path target position. Can be null if the agent is not moving.
     */
    getTargetPosition() {
        return this.targetPosition;
    }

    /**
     * Checks if the agent has reached its final destination.
     * 
     * @returns {boolean} True if the agent has reached its final destination, false otherwise.
     */
    hasReachedFinalDestination() {
        return this.targetPosition.isEqual(this.destination.getPhysicalPosition());
    }

    /** 
     * Initiate movement to a specified destination.
     * 
     * @param {Location} destination The destination location.
     * @throws {Error} If the provided destination is not an instance of Location.
     */
    moveTo(destination) {
        TypeUtils.ensureInstanceOf(destination, Location);

        console.debug("moveTo-CP0: Start ");

        // calculate path
        this.path = this.scene.findShortestPath(this.currentRoom, destination.getRoom());
        console.debug("moveTo-CP1: Path calculated...");

        //  if the path is empty then stop movement and exit
        if (this.path.isEmpty()) {
            console.debug("moveTo-CP2: Path is empty, stopping movement...");
            this.isAgentMoving = false;
            this.targetPosition = null;
            this.destination = Movement.NULL_LOCATION;
            return;
        }

        // set movement state for movement 
        this.isAgentMoving = true;
        this.destination = destination; 

        // if start and end rooms are the same, set target position
        if( this.path.getLength() === 1) {
            console.debug("moveTo-CP3: Path length is 1, setting target position...");
            this.targetPosition = destination.getPhysicalPosition();
            return;
        }

        // calculate the first intermediate target position
        this.targetPosition = this.calculateTargetPosition(destination);
    }

    /**
     * Calculate target position and room based on the current path segment (index and final destination).
     * Will update the current room - when movement towards it starts as part of path navigation.
     *  
     * @param {Location} finalDestination The final destination location.
     * @returns {Position} The target position for the current path segment.
     */
    calculateTargetPosition(finalDestination) {
        TypeUtils.ensureInstanceOf(finalDestination, Location);

        // Get the current room from the path
        const nextRoomName = this.path.getRoom();
        this.currentRoom = this.scene.getRoom(nextRoomName);
        
        // if last room in the path, set the final destination
        if (this.path.getRoom() === this.path.getEndRoom()) {
            return finalDestination.getPhysicalPosition();
        }

        // Intermediate step: target the center of the next room (simplistic approach) 
        const roomPos = this.currentRoom.getPosition();
        const roomSize = this.currentRoom.getSize();

        // Calculate center position (adjust as needed for better navigation later)
        const centerX = roomPos.getX() + roomSize.getX() / 2;
        const centerY = roomPos.getY() + roomSize.getY() / 2;
        return Position.create(centerX, centerY);
    }

    /**
     * Checks if the given location is within a reasonable range of the agent's position.
     * 
     * @param {Location} location The location to check.
     * @returns {boolean} True if the location is within a reasonable range, false otherwise.
     */
    isWithinReasonbleRange(location) {
        TypeUtils.ensureInstanceOf(location, Location);
        const locPosition = location.getPhysicalPosition();
        return this.position.distanceTo(locPosition) <= Intention.EXECUTION_RANGE;
    }

    /** 
     * Updates the agent's position based on its speed and destination.
     *
     * @returns {boolean} True if the agent has reached its destination, false otherwise.
     */
    update() {
        console.debug("update-CP0: Start ");
        // exit if the agent is not moving
        if (!this.isMoving()) {
            return true;
        }
        console.debug("update-CP1: Agent is moving...");

        // exit if the target position isn't defined 
        if (!this.isTargetPositionDefined()) {
            return true;
        }
        console.debug("update-CP2: Target position is defined...");

        // exit if destination is null location
        if (this.destination == Movement.NULL_LOCATION) {
            return true;
        }
        console.debug("update-CP3: Destination is not null location...");

        // Check if agent can reach target position in this step
        if (this.canReachTargetPosition()) {
            console.debug("update-CP4a: Agent can reach target position...");

            // move to target position
            this.position = Position.create2(this.targetPosition);

            // if final destination is reached, stop moving
            if (this.hasReachedFinalDestination()) {
                console.debug("update-CP5a: Agent has reached FINAL DESTINATION...");
                this.isAgentMoving = false;
                this.targetPosition = null;
                this.destination = Movement.NULL_LOCATION;
                this.path = Path.createEmpty();
                return true; 
            }
            console.debug("update-CP5b: Agent has not reached final destination, just an intermediate waypoint...");

            // Reached an intermediate waypoint, advance path
            this.path.advanceIndex();
            this.targetPosition = this.calculateTargetPosition(this.destination);

            console.debug("update-CP6: Agent has advanced path index...");

            // Continue moving in the same tick if a new target is set
            //return this.update(); // TODO: update with distance move this update
        }

        console.debug("update-CP7: Moves towards target position...");

        // Move towards target position
        const dx = this.targetPosition.getX() - this.position.getX();
        const dy = this.targetPosition.getY() - this.position.getY();
        const angle = Math.atan2(dy, dx);
        const x = this.position.getX() + this.speed * Math.cos(angle);
        const y = this.position.getY() + this.speed * Math.sin(angle);
        this.position = Position.create(x, y); 
        return false; // Still moving towards current target        
    }
}