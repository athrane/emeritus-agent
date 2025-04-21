import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Movement } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";


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

    it('should get current location', () => {
        expect(movement.getLocation().name).toBe("Current Location");
    });

    it('should initialize with the correct position', () => {
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
    });

    it('should initialize with the correct location and speed', () => {
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
        expect(movement.getLocation().getPosition().getX()).toBe(0);
        expect(movement.getLocation().getPosition().getY()).toBe(0)
        expect(movement.speed).toBe(5);
    });

    it('should initialize with null destination and no movement', () => {
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

    it('should update the position correctly when moving', () => {
        const destPosition = Position.create(10, 0);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(5); 
        expect(movement.getPosition().getY()).toBe(0);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the position correctly when moving #2', () => {
        const destPosition = Position.create(10, 0);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);
        movement.update();
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(10); 
        expect(movement.getPosition().getY()).toBe(0);
        expect(movement.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached', () => {
        const destPosition = Position.create(30, 30);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);

        // Multiple updates to reach destination
        let reached = false;
        for (let i = 0; i < 10; i++) {
            reached = movement.update();
            if (reached) break;
        }

        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY())
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(reached).toBe(true);
    });

    it('should not move if not moving', () => {
        movement.update();
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    it('should stop immediately reach destination if it is close enough', () => {
        const destPosition = Position.create(4, 0);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);
        const reached = movement.update();
        expect(reached).toBe(true);
        expect(movement.getPosition().getY()).toBe(destPosition.getY());
        expect(movement.getLocation().getPosition().getX()).toBe(destPosition.getX());
        expect(movement.getLocation().getPosition().getY()).toBe(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    it('should not move if destination is NULL_LOCATION', () => {
        movement.destination = Movement.NULL_LOCATION;
        movement.isAgentMoving = true;
        const initialX = movement.getPosition().getX();
        const initialY = movement.getPosition().getY();
        movement.update();
        expect(movement.getPosition().getX()).toBe(initialX);
        expect(movement.getPosition().getX()).toBe(initialY);
        expect(movement.isMoving()).toBe(true); // Should still be false as update should exit early
    });

    it('should handle diagonal movement correctly', () => {
        const destPosition = Position.create(10, 10);
        const destination = Location.create("D1", destPosition);
        movement.moveTo(destination);

        let reached = false;
        for (let i = 0; i < 10; i++) {
            reached = movement.update();
            if (reached) break;
        }

        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(reached).toBe(true);
    });
});