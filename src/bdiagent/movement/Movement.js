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
        this.position = initialLocation.getPhysicalPosition();
        this.destination = Movement.NULL_LOCATION;
        this.isAgentMoving = false;
        this.scene = scene;
        this.currentRoom = initialLocation.getRoom();

        // initalize pathfinding
        this.path = Path.createEmpty();
        this.pathTargetPosition = null; // The specific Position the agent is moving towards in the current step
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
        return this.pathTargetPosition != null;
    }

    /**
     * Checks if the agent can reach the target position in the current step.
     * 
     * @returns {boolean} True if the agent can reach the target position in the current step, false otherwise.
     */
    canReachTargetPosition() {
        const dist = this.position.distanceTo(this.pathTargetPosition);
        return dist <= this.speed;
    }

    /**
     * Checks if the agent has reached its final destination.
     * 
     * @returns {boolean} True if the agent has reached its final destination, false otherwise.
     */
    hasReachedFinalDestination() {
        return this.pathTargetPosition.isEqual(this.destination.getPhysicalPosition());
    }

    /** 
     * Moves the agent to a specified destination.
     * 
     * @param {Location} destination The destination location.
     * @throws {Error} If the provided destination is not an instance of Location.
     */
    moveTo(destination) {
        TypeUtils.ensureInstanceOf(destination, Location);

        // calculate path
        this.path = this.scene.findShortestPath(this.currentRoom, destination.getRoom());

        //  if the path is empty then exit
        if (this.path.isEmpty()) {
            this.setStateForStopping();
            return;
        }

        // if start and end rooms are the same, but position and end location positions differ set target position
        if (this.currentRoom.getName() === destination.getRoom().getName()) {
            this.setStateForMovementWithinSingleRoom(destination);
            return;
        }

        // Determine the first intermediate target position
        this.calculateTargetPositionForPathSegment(destination);
        this.isAgentMoving = true;
        this.destination = destination; // TOOD: Can the be removed?
    }

    /**
     * Sets the state for movement within a single room.
     */ 
    setStateForMovementWithinSingleRoom(destination) {
        this.isAgentMoving = true;
        this.pathTargetPosition = destination.getPhysicalPosition();
        this.destination = destination;
    }

    /**
     * Sets the state for stopping the agent's movement.
     */
    setStateForStopping() {
        this.isAgentMoving = false;
        this.pathTargetPosition = null;
        this.destination = Movement.NULL_LOCATION;
    }

    /**
     * Set target position and room based on the current path segment (index and final destination).
     * Will update the current room - when movement towards it starts as part of path navigation.
     *  
     * @param {Location} finalDestination The final destination location.
     */
    calculateTargetPositionForPathSegment(finalDestination) {
        TypeUtils.ensureInstanceOf(finalDestination, Location);

        // Get the next room name from the path
        const nextRoomName = this.path.getRoomAt(this.path.getCurrentIndex());
        const nextRoom = this.scene.getRoom(nextRoomName);

        // set the current room - even though the agent is not in the room yet
        this.currentRoom = nextRoom;

        // Check if this is the last room in the path
        if (this.path.getCurrentIndex() === this.path.getLength() - 1) {
            // Last step: target is the final destination's position
            this.pathTargetPosition = finalDestination.getPhysicalPosition();
        } else {
            // Intermediate step: target the center of the next room (simplistic approach) 
            const roomPos = nextRoom.getPosition();
            const roomSize = nextRoom.getSize();
            // Calculate center position (adjust as needed for better navigation later)
            const centerX = roomPos.getX() + roomSize.getX() / 2;
            const centerY = roomPos.getY() + roomSize.getY() / 2;
            this.pathTargetPosition = Position.create(centerX, centerY);
        }

        //this.isAgentMoving = this.pathTargetPosition !== null; // TODO: Can this be removed
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

        // exit if the agent is not moving
        if (!this.isMoving()) {
            return true;
        }

        // exit if the target position isn't defined 
        if (!this.isTargetPositionDefined()) {
            return true;
        }

        // exit if destination is null location
        if (this.destination == Movement.NULL_LOCATION) {
            return true;
        }

        // Check if agent reaches target position in this step
        if (this.canReachTargetPosition()) {
            // agent reaches the target position - move exactly to target
            this.position = Position.create2(this.pathTargetPosition);

            // if final destination is reached, stop moving
            if (this.hasReachedFinalDestination()) {
                this.setStateForStopping();
                this.path = Path.createEmpty();
                return true;
            }

            // Reached an intermediate waypoint, advance path
            this.path.advanceIndex();
            this.calculateTargetPositionForPathSegment(this.destination);

            // Continue moving in the same tick if a new target is set
            //return this.update(); // TODO: update with distance move this update
        }

        // Move towards currentTargetPosition (existing logic)
        const dx = this.pathTargetPosition.getX() - this.position.getX();
        const dy = this.pathTargetPosition.getY() - this.position.getY();
        const angle = Math.atan2(dy, dx);
        const x = this.position.getX() + this.speed * Math.cos(angle);
        const y = this.position.getY() + this.speed * Math.sin(angle);
        this.position = this.position.set(x, y); //
        return false; // Still moving towards current target        
    }
}