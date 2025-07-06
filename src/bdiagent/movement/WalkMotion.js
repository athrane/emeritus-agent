import { Motion } from "../../internal.js";
import { TypeUtils } from "../../internal.js";
import { Location } from "../../internal.js";
import { Scene } from "../../internal.js";
import { Path } from "../../internal.js";
import { Position } from "../../internal.js";
import { Intention } from "../../internal.js";

/**
 * Implements walking motion for agents (man/cat).
 */
export class WalkMotion extends Motion {

    /**
     * The Y coordinate offset for target position.
     * This is used to ensure the agent's target position is slightly above the ground level.
     */
    static TARGET_POS_Y = 0.1;

    /**
     * Represents a null location for the agent.
     * This is used when the agent is not moving or has no destination.
     */
    static NULL_LOCATION = Location.createNullLocation();

    /**
     * Creates a new WalkMotion instance.
     * @param {Location} initialLocation - The initial location of the agent.
     * @param {number} speed - The speed of the agent.
     * @param {Scene} scene - The scene where the agent resides.
     * @throws {Error} If the initialLocation is not an instance of Location,
     *                 speed is not a number, or scene is not an instance of Scene.
     */
    constructor(initialLocation, speed, scene) {
        super();
        TypeUtils.ensureInstanceOf(initialLocation, Location);
        TypeUtils.ensureNumber(speed);
        TypeUtils.ensureInstanceOf(scene, Scene);
        this.speed = speed;
        this.scene = scene;
        this.isAgentMoving = false;
        this.position = initialLocation.getPhysicalPosition();
        this.destination = WalkMotion.NULL_LOCATION;
        this.currentRoom = initialLocation.getRoom();
        this.path = Path.createEmpty();
        this.targetPosition = null;
    }

    /**
     * Gets the speed of the agent.
     * @returns {number} The speed of the agent.
     */
    getSpeed() { return this.speed; }

    /**
     * Gets the current position of the agent.
     * @returns {Position} The current position of the agent.
     */
    getPosition() { return this.position; }

    /**
     * Gets the current destination location of the agent.
     * @returns {Location} The current destination location of the agent.
     */
    getDestination() { return this.destination; }

    /**
     * Gets the current room the agent is in or moving toward.
     * @returns {Room} The current room of the agent.
     */
    getRoom() { return this.currentRoom; }

    /**
     * Checks if the agent is within the current room.
     * @returns {boolean} True if the agent is within the current room, false otherwise.
     */
    isWithinRoom() { return this.currentRoom.isWithinRoom(this.position); }

    /**
     * Checks if the agent is currently moving.
     * @returns {boolean} True if the agent is moving, false otherwise.
     */
    isMoving() { return this.isAgentMoving; }

    /**
     * Checks if the agent has a target position defined.
     * @returns {boolean} True if the target position is defined, false otherwise.
     */
    isTargetPositionDefined() { return this.targetPosition != null; }

    /**
     * Checks if the agent can reach the target position.
     * @returns {boolean} True if the agent can reach the target position, false otherwise.
     */
    canReachTargetPosition() {
        const dist = this.position.distanceTo(this.targetPosition);
        return dist <= this.speed;
    }

    /**
     * Gets the target position.
     * @returns {Position} The target position of the agent.
     */
    getTargetPosition() { return this.targetPosition; }

    /**
     * Checks if the agent has reached the final destination.
     * @returns {boolean} True if the agent has reached the final destination, false otherwise.
     */
    hasReachedFinalDestination() {
        return this.targetPosition.isEqual(this.destination.getPhysicalPosition());
    }

    /**
     * Gets the current path of the agent.
     * @returns {Path} The path the agent is currently following.
     */
    getPath() { return this.path; }

    /**
     * Moves the agent to a specified destination.
     * @param {Location} destination - The destination location to move the agent to.
     * @throws {TypeError} If the destination is not an instance of Location.
     */
    moveTo(destination) {
        TypeUtils.ensureInstanceOf(destination, Location);

        //console.log(`moveTo-CP1: Agent is moving from current room ${this.currentRoom.name} to destination location: ${destination.name}`);

        // calculate path
        this.path = this.scene.findShortestPath(this.currentRoom, destination.getRoom());
        //console.log(`moveTo-CP2: Path length: ${this.path.getLength()}`);
        //console.log(`moveTo-CP2: Calculated path: ${this.path.getRoomNames()}`);

        //  if the path is empty then stop motion and exit
        if (this.path.isEmpty()) {
            //console.log("moveTo-CP3: Path is empty, stopping motion.");
            this.isAgentMoving = false;
            this.targetPosition = null;
            this.destination = WalkMotion.NULL_LOCATION;
            return;
        }

        // set motion state for motion 
        this.isAgentMoving = true;
        this.destination = destination;

        // if start and end rooms are the same, set target position
        if (this.path.getLength() === 1) {
            //console.log("moveTo-CP4: Path length is 1, setting target position.");
            this.targetPosition = destination.getPhysicalPosition();
            return;
        }

        // calculate the first intermediate target position
        this.targetPosition = this.calculateTargetPosition(destination);
    }

    /**
     * Calculates the target position based on the current path and destination.
     * @param {Location} finalDestination - The final destination location.
     * @returns {Position} The calculated target position.
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

        // Calculate target position (adjust as needed for better navigation later)
        const targetX = roomPos.getX() + roomSize.getX() / 2;
        const targetY = roomPos.getY() + WalkMotion.TARGET_POS_Y;
        return Position.create(targetX, targetY);
    }

    /**
     * Checks if the given location is within a reasonable range of the agent's current position.
     * @param {Location} location - The location to check.
     * @returns {boolean} True if the location is within a reasonable range, false otherwise.
     * @throws {TypeError} If the location is not an instance of Location.
     */
    isWithinReasonableRange(location) {
        TypeUtils.ensureInstanceOf(location, Location);
        const locPosition = location.getPhysicalPosition();
        return this.position.distanceTo(locPosition) <= Intention.EXECUTION_RANGE;
    }

    /**
     * Updates the agent's position based on its speed and target position. 
     * @returns {boolean} True if the agent has reached its final destination, false otherwise.
     */
    update() {
        // exit if the agent is not moving
        if (!this.isMoving()) return true;

        // exit if the target position isn't defined 
        if (!this.isTargetPositionDefined()) return true;

        // exit if destination is null location
        if (this.destination == WalkMotion.NULL_LOCATION) return true;

        // Check if agent can reach target position in this step
        if (this.canReachTargetPosition()) {

            // move to target position
            this.position = Position.create2(this.targetPosition);

            // if final destination is reached, stop moving
            if (this.hasReachedFinalDestination()) {
                //console.debug("update-CP5a: Agent has reached FINAL DESTINATION...");
                this.isAgentMoving = false;
                this.targetPosition = null;
                this.destination = WalkMotion.NULL_LOCATION;
                this.path = Path.createEmpty();
                return true;
            }

            // Reached an intermediate waypoint, advance path
            this.path.advanceIndex();
            this.targetPosition = this.calculateTargetPosition(this.destination);

            // Continue moving in the same tick if a new target is set
            //return this.update(); // TODO: update with distance move this update
        }

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
