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
        this.position = initialLocation.getPosition();
        this.destination = Movement.NULL_LOCATION;
        this.isAgentMoving = false;
        this.scene = scene;
        this.currentRoom = initialLocation.getRoom(); 

        // initalize pathfinding
        this.currentPath = Path.createEmpty(); // Store the Path object 
        this.currentPathIndex = -1; // Index of the next room/waypoint in the path
        this.currentTargetPosition = null; // The specific Position the agent is moving towards in the current step
    }

    /**
     * Gets the current location of the agent.
     * 
     * @returns {Location} The current location.
     * @deprecated
     */
    getLocation() {
        return Location.create("Current Location", this.position, Room.createNullRoom());
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

        // Get current location
        const startLocation = this.getLocation();

        // calculate path
        this.currentPath = this.scene.findShortestPath(startLocation, destination);
        this.currentPathIndex = 0; // reset path index

        // Check if the path is empty or if the start and end locations are the same
        if (this.currentPath.isEmpty()) { //
            this.isAgentMoving = false;
            this.currentTargetPosition = null;

            // if start/end rooms are the same but locations differ, set target position
            if (this.scene.getRoomForLocation(startLocation) === this.scene.getRoomForLocation(destination)) {
                this.currentTargetPosition = destination.getPosition();
                this.isAgentMoving = true;
            }

            return;
        }

        // Determine the first intermediate target position
        this.updateCurrentTargetPosition(destination);
        this.isAgentMoving = true;

        // The final destination field might become redundant or represent the *final* goal
        // For now, let's keep it but prioritize currentTargetPosition
        this.destination = destination;
    }

    /**
     * Updates the current target position based on the path index and final destination.
     * 
     * @param {Location} finalDestination The final destination location.
     */
    updateCurrentTargetPosition(finalDestination) {
        TypeUtils.ensureInstanceOf(finalDestination, Location);

        // exit if the path is empty
        if (this.currentPath.isEmpty()) { 
            this.currentTargetPosition = null;
            this.isAgentMoving = false;
            return;
        }

        // exit if the path index is out of bounds
        if (this.currentPathIndex < 0) {
            this.currentTargetPosition = null;
            this.isAgentMoving = false;
            return;            
        }
        // exit if the path index is out of bounds
        if (this.currentPathIndex >= this.currentPath.getLength()) {
            this.currentTargetPosition = null;
            this.isAgentMoving = false;
            return;
        }

        // Get the next room name from the path
        const nextRoomName = this.currentPath.getRoomAt(this.currentPathIndex); 
        const nextRoom = this.scene.getRoom(nextRoomName); 

        // set the current room - even though the agent is not in the room yet
        this.currentRoom = nextRoom;

        // Check if this is the last room in the path
        if (this.currentPathIndex === this.currentPath.getLength() - 1) {
            // Last step: target is the final destination's position
            this.currentTargetPosition = finalDestination.getPosition();
        } else {
            // Intermediate step: target the center of the next room (simplistic approach) 
            const roomPos = nextRoom.getPosition(); 
            const roomSize = nextRoom.getSize();
            // Calculate center position (adjust as needed for better navigation later)
            const centerX = roomPos.getX() + roomSize.getX() / 2;
            const centerY = roomPos.getY() + roomSize.getY() / 2;
            this.currentTargetPosition = Position.create(centerX, centerY);
        }
        this.isAgentMoving = this.currentTargetPosition !== null;
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

        // exit if the target position isn't defined 
        if (!this.currentTargetPosition) {
            return true;
        }

        // exit if destination is null location
        if (this.destination == Movement.NULL_LOCATION) {
            return true;
        }

        // Calculate the distance to the destination
        //const dist = this.position.distanceTo(this.destination.getPosition());
        const dist = this.position.distanceTo(this.currentTargetPosition);

        // handle case where the agent is already at the destination
        if (dist <= this.speed) {
            //this.position = this.position.set2(this.destination.getPosition());
            this.position = this.position.set2(this.currentTargetPosition);

            // Check if this was the final destination
            if (this.currentTargetPosition === this.destination.getPosition()) {
                this.isAgentMoving = false;
                this.currentPath = Path.createEmpty();
                this.currentPathIndex = -1;
                this.currentTargetPosition = null;
                this.destination = Movement.NULL_LOCATION;
                return true;
            }

            // Reached an intermediate waypoint, advance path
            this.currentPathIndex++;
            this.updateCurrentTargetPosition(this.destination); 
            // Continue moving in the same tick if a new target is set
            return this.update(); 
        }

        // Move towards currentTargetPosition (existing logic)
        const dx = this.currentTargetPosition.getX() - this.position.getX();
        const dy = this.currentTargetPosition.getY() - this.position.getY();
        const angle = Math.atan2(dy, dx);
        const x = this.position.getX() + this.speed * Math.cos(angle);
        const y = this.position.getY() + this.speed * Math.sin(angle);
        this.position = this.position.set(x, y); //
        return false; // Still moving towards current target        

        // Still moving
        //const dx = this.destination.getPosition().getX() - this.position.getX();
        //const dy = this.destination.getPosition().getY() - this.position.getY();
        //const angle = Math.atan2(dy, dx);
        //const x = this.position.getX() + this.speed * Math.cos(angle);
        //const y = this.position.getY() + this.speed * Math.sin(angle);
        //this.position = this.position.set(x, y);
    }
}