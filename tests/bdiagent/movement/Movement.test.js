import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Movement } from "../../../src/internal.js";
import { RoomManager } from "../../../src/internal.js";


describe('Movement', () => {
    let initialLocation;
    let initialPosition
    let movement;
    let scene;

    beforeEach(() => {
        scene = new Scene(); 
        initialPosition = Position.create(0, 0);
        initialLocation = Location.create("Start", initialPosition);
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should be able to create movement instance', () => {
        expect(movement).toBeInstanceOf(Movement);
    });

    it('should initialize with the correct location and speed', () => {
        expect(movement.getLocation().name).toBe("Start");
        expect(movement.getLocation().getPosition().getX()).toBe(0);
        expect(movement.getLocation().getPosition().getY()).toBe(0)
        expect(movement.speed).toBe(5);
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    it('should set a destination and start moving', () => {
        const destPosition = Position.create(10, 10);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);
        expect(movement.getDestination()).toBe(destination);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the location when moving', () => {
        const destPosition = Position.create(10, 10);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);
        movement.update();
        expect(movement.getLocation().getx).toBeGreaterThan(0);
        expect(movement.getLocation().y).toBe(0);
        expect(movement.isMoving()).toBe(true);
    });

    it('should stop moving when the destination is reached', () => {
        const destination = new Location("D1", 3, 4);
        movement.moveTo(destination);

        // Multiple updates to reach destination
        let reached = false;
        for (let i = 0; i < 10; i++) {
            reached = movement.update();
            if (reached) break;
        }

        expect(movement.getLocation().x).toBe(destination.x);
        expect(movement.getLocation().y).toBe(destination.y);
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(reached).toBe(true);
    });

    it('should not move if not moving', () => {
        const initialX = movement.getLocation().x;
        const initialY = movement.getLocation().y;
        movement.update();
        expect(movement.getLocation().x).toBe(initialX);
        expect(movement.getLocation().y).toBe(initialY);
    });

    it('should immediately reach destination if it is close enough', () => {
        const destination = new Location("D1", 4, 0); // Distance is less than speed (5)
        movement.moveTo(destination);
        const reached = movement.update();
        expect(movement.getLocation().x).toBe(destination.x);
        expect(movement.getLocation().y).toBe(destination.y);
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(reached).toBe(true);
    });

    it('should not move if destination is NULL_LOCATION', () => {
        movement.destination = Movement.NULL_LOCATION;
        movement.isAgentMoving = true;
        const initialX = movement.getLocation().x;
        const initialY = movement.getLocation().y;
        movement.update();
        expect(movement.getLocation().x).toBe(initialX);
        expect(movement.getLocation().y).toBe(initialY);
        expect(movement.isMoving()).toBe(true); // Should still be false as update should exit early
    });

    it('should handle diagonal movement correctly', () => {
        const destination = new Location("D1", 10, 10);
        movement.moveTo(destination);

        let reached = false;
        for (let i = 0; i < 10; i++) {
            reached = movement.update();
            if (reached) break;
        }

        expect(movement.getLocation().x).toBeCloseTo(destination.x);
        expect(movement.getLocation().y).toBeCloseTo(destination.y);
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(reached).toBe(true);
    });
});