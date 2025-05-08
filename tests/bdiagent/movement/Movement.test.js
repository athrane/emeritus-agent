import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Movement } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";

describe('create', () => {
    let initialLocation;
    let initialPosition;
    let movement;
    let scene;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        const testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should be able to create movement instance', () => {
        expect(movement).toBeInstanceOf(Movement);
    });

    it('should initialize with the correct position', () => {
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
    });

    it('should initialize with the correct speed', () => {
        expect(movement.speed).toBe(5);
    });

    it('should initialize with the correct scene', () => {
        expect(movement.scene).toBe(scene);
    });

    it('should initialize with the correct destination - null destination', () => {
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    it('should initialize with the correct path', () => {
        expect(movement.path).toBeInstanceOf(Path);
        expect(movement.path.isEmpty()).toBe(true);
    });

    it('should initialize with the correct path index', () => {
        expect(movement.path.getCurrentIndex()).toBe(0);
    });

    it('should initialize with the correct target position', () => {
        expect(movement.getTargetPosition()).toBeNull();
    });

    it('should initialize with the correct moving state - no movement', () => {
        expect(movement.isMoving()).toBe(false);
    });

    it('should initialize with the correct room', () => {
        expect(movement.getRoom()).toBe(initialLocation.getRoom());
    });

});

describe('getPosition', () => {
    let initialLocation;
    let initialPosition;
    let movement;
    let scene;
    let testRoom;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should return the current position', () => {
        const position = movement.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBe(initialPosition.getX());
        expect(position.getY()).toBe(initialPosition.getY());
    });

    it('should return the current position after moving along x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        const position = movement.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBeCloseTo(5);
        expect(position.getY()).toBeCloseTo(0);
    });

    it('should return the current position after moving along y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        const position = movement.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBeCloseTo(0);
        expect(position.getY()).toBeCloseTo(5);
    });

});

describe('getDestination', () => {
    let initialLocation;
    let initialPosition;
    let movement;
    let scene;
    let testRoom;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should return the initial destination', () => {
        const position = movement.getDestination();
        expect(position).toBe(Movement.NULL_LOCATION);
    });

    it('should return the current destination after moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        const actualLocation = movement.getDestination();
        expect(actualLocation).toBeInstanceOf(Location);
        expect(actualLocation.getName()).toBe(destLocation.getName());
        const actualPosition = actualLocation.getPhysicalPosition();
        expect(actualPosition.getX()).toBe(destPosition.getX());
        expect(actualPosition.getY()).toBe(destPosition.getY());
    });

    it('should return the current destination after moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        const actualLocation = movement.getDestination();
        expect(actualLocation).toBeInstanceOf(Location);
        expect(actualLocation.getName()).toBe(destLocation.getName());
        const actualPosition = actualLocation.getPhysicalPosition();
        expect(actualPosition.getX()).toBe(destPosition.getX());
        expect(actualPosition.getY()).toBe(destPosition.getY());
    });

});


describe('Direct Movement (No Pathfinding Required)', () => {
    // This test suite focuses on direct movement within a single room
    let testRoom;
    let scene;
    let initialLocation;
    let initialPosition;
    let movement;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 200, 200);
        initialLocation = testRoom.createLocation("Start", 0, 0);
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should set a destination when starting movement', () => {
        // Create destination location within the same room
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());

        movement.moveTo(destLocation);
        expect(movement.getDestination()).toBe(destLocation);
    });

    it('should update the movement state when starting movement', () => {
        // Create destination location within the same room
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());

        movement.moveTo(destLocation);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the target position when starting movement', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        expect(movement.getTargetPosition()).toEqual(destLocation.getPhysicalPosition());
    });

    it('should update the position correctly - when moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(5);
        expect(movement.getPosition().getY()).toBeCloseTo(0);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the position correctly - when moving along the x axis #2', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(10);
        expect(movement.getPosition().getY()).toBeCloseTo(0);
        expect(movement.isMoving()).toBe(false);
    });

    it('should update the position correctly - when moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(0);
        expect(movement.getPosition().getY()).toBeCloseTo(5);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the position correctly - when moving along the y axis #2', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(0);
        expect(movement.getPosition().getY()).toBeCloseTo(10);
        expect(movement.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached - when moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        movement.update();
        expect(movement.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached - when moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        movement.update();
        expect(movement.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached', () => {
        const destPosition = Position.create(30, 30);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);

        let reached = false;
        for (let i = 0; i < 15; i++) { // Increased loop count slightly for diagonal
            reached = movement.update();
            if (reached) break;
        }

        expect(reached).toBe(true); // Make sure it actually reported reaching
        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
        //expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    it('should clear destination when reached', () => {
        const destPosition = Position.create(5, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        movement.update();
        movement.update(); // Move to destination
        const actualDestination = movement.getDestination();
        expect(actualDestination.getName()).toBe(Movement.NULL_LOCATION.getName()); // Destination should be cleared 
    });

    it('should not report move if not moving', () => {
        const reached = movement.update(); // Should return true if not moving
        expect(reached).toBe(true);
        expect(movement.isMoving()).toBe(false);
    });

    it('should not update position if not moving', () => {
        const reached = movement.update(); // Should return true if not moving
        expect(reached).toBe(true);
        const actualPosition = movement.getPosition();
        expect(actualPosition.getX()).toBe(initialPosition.getX());
        expect(actualPosition.getY()).toBe(initialPosition.getY());
    });

    it('should stop immediately reach destination if it is close enough', () => {
        const destPosition = Position.create(4, 0); // Distance < speed (5)
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        const reached = movement.update();
        expect(reached).toBe(true);
        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
    });

    it('should handle diagonal movement correctly', () => {
        const destPosition = Position.create(10, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        movement.moveTo(destLocation);
        let reached = false;
        // Loop enough times to guarantee arrival (sqrt(10^2 + 10^2) approx 14.14 / speed 5 = ~3 steps)
        for (let i = 0; i < 5; i++) {
            reached = movement.update();
            if (reached) break;
        }

        expect(reached).toBe(true);
        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
    });
});

describe('Pathfinding Movement', () => {
    let scene;
    let movement;
    let locHallway, locLivingRoom, locKitchen, locLivingRoom2;
    let hallway, livingRoom, kitchen; // Define rooms

    // Helper function to calculate room center
    const getRoomCenter = (room) => {
        const roomPos = room.getPosition();
        const roomSize = room.getSize();
        return Position.create(
            roomPos.getX() + roomSize.getX() / 2,
            roomPos.getY() + roomSize.getY() / 2
        );
    };

    beforeEach(() => {
        // Setup scene with rooms and connections
        scene = new Scene();
        hallway = scene.createRoom('Hallway', 0, 0, 10, 10); // x:0-10, y:0-10
        livingRoom = scene.createRoom('Living Room', 10, 0, 10, 10); // x:10-20, y:0-10
        kitchen = scene.createRoom('Kitchen', 20, 0, 10, 10); // x:20-30, y:0-10

        // Define locations within rooms with relevantive coordinates
        locHallway = hallway.createLocation("Start Hall", 5, 5);
        locLivingRoom = livingRoom.createLocation("Sofa", 5, 5); 
        locLivingRoom2 = livingRoom.createLocation("TV", 7, 5); 
        locKitchen = kitchen.createLocation("Stove", 5, 5); 

        // Define adjacency
        hallway.addAdjacentRoom(livingRoom.getName());
        livingRoom.addAdjacentRoom(hallway.getName());
        livingRoom.addAdjacentRoom(kitchen.getName());
        kitchen.addAdjacentRoom(livingRoom.getName());

        // Initial location is in the hallway
        movement = new Movement(locHallway, 5, scene);
    });

    it('should have been initialised correct in hallway', () => {
        expect(movement.getRoom().getName()).toBe(hallway.getName());
        expect(movement.getPosition().getX()).toBe(5);
        expect(movement.getPosition().getY()).toBe(5);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        expect(movement.isMoving()).toBe(false);
        expect(movement.path).toBeInstanceOf( Path);
        expect(movement.path.isEmpty()).toBe(true);
        expect(movement.getTargetPosition()).toBeNull();
        expect(movement.path.getCurrentIndex()).toBe(0);
        expect(movement.path.getLength()).toBe(0);
        expect(movement.getTargetPosition()).toBeNull();
        expect(movement.isTargetPositionDefined()).toBe(false);
    });   

    it('should set a destination when starting movement - to next room', () => {
        movement.moveTo(locLivingRoom);
        expect(movement.getDestination()).toBe(locLivingRoom);
    });

    it('should set the movement state when starting movement - to next room', () => {
        movement.moveTo(locLivingRoom);
        expect(movement.isMoving()).toBe(true);
    });

    it('should calculate path when starting movement - to next room', () => {
        movement.moveTo(locLivingRoom);
        expect(movement.path).toBeInstanceOf(Path);
        expect(movement.path.getCurrentIndex()).toBe(0);
        expect(movement.path.getLength()).toBe(2); // 2 rooms in the path
        expect(movement.path.getRoomAt(0)).toBe(hallway.getName());
        expect(movement.path.getRoomAt(1)).toBe(livingRoom.getName());    
    });

    it('should start in expteced room when starting movement - to next room', () => {
        movement.moveTo(locLivingRoom);
        expect(movement.getRoom().getName()).toBe(hallway.getName());    
    });

    it('should calculate target position in expteced room when starting movement - to next room', () => {
        movement.moveTo(locLivingRoom);
        expect(movement.getTargetPosition()).toEqual(getRoomCenter(hallway));
    });    
    
    it('should update the position correctly - when moving to next room', () => {
        movement.moveTo(locLivingRoom);
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(10);
        expect(movement.getPosition().getY()).toBeCloseTo(5);
        expect(movement.isMoving()).toBe(true);
    });

    it('should update the position correctly - when moving to next room', () => {
        const destPosition = getRoomCenter(livingRoom);
        movement.moveTo(locLivingRoom);
        movement.update();
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
    });

    it('should update the movement state correctly - when moving to next room', () => {
        const destPosition = getRoomCenter(livingRoom);
        movement.moveTo(locLivingRoom);
        movement.update();
        movement.update();
        expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(movement.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached - when moving to next room', () => {
        movement.moveTo(locLivingRoom);
        movement.update();
        movement.update();
        expect(movement.isMoving()).toBe(false);
    });         



});
