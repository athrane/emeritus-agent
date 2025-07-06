import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { WalkMotion } from "../../../src/bdiagent/movement/WalkMotion.js";
import { Scene } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";

describe('create', () => {
    let initialLocation;
    let initialPosition;
    let walkMotion;
    let scene;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        const testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        walkMotion = new WalkMotion(initialLocation, 5, scene);
    });

    it('should be able to create walkMotion instance', () => {
        expect(walkMotion).toBeInstanceOf(WalkMotion);
    });

    it('should initialize with the correct position', () => {
        expect(walkMotion.getPosition().getX()).toBe(0);
        expect(walkMotion.getPosition().getY()).toBe(0);
    });

    it('should initialize with the correct speed', () => {
        expect(walkMotion.getSpeed()).toBe(5);
    });

    it('should initialize with the correct scene', () => {
        expect(walkMotion.scene).toBe(scene);
    });

    it('should initialize with the correct destination - null destination', () => {
        expect(walkMotion.getDestination()).toBe(WalkMotion.NULL_LOCATION);
    });

    it('should initialize with the correct path', () => {
        expect(walkMotion.getPath()).toBeInstanceOf(Path);
        expect(walkMotion.getPath().isEmpty()).toBe(true);
    });

    it('should initialize with the correct path index', () => {
        expect(walkMotion.getPath().getCurrentIndex()).toBe(0);
    });

    it('should initialize with the correct target position', () => {
        expect(walkMotion.getTargetPosition()).toBeNull();
    });

    it('should initialize with the correct moving state - no movement', () => {
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should initialize with the correct room', () => {
        expect(walkMotion.getRoom()).toBe(initialLocation.getRoom());
    });
});

describe('Pathfinding Movement', () => {
    let scene;
    let walkMotion;
    let locHallway, locLivingRoom, locKitchen, locLivingRoom2;
    let hallway, livingRoom, kitchen;

    const calculateTargetPosition = (room) => {
        const roomPos = room.getPosition();
        const roomSize = room.getSize();
        const targetX = roomPos.getX() + roomSize.getX() / 2;
        const targetY = roomPos.getY() + 0.1; // Use same Y as Movement.TARGET_POS_Y
        return Position.create(targetX, targetY);
    };

    beforeEach(() => {
        scene = new Scene();
        hallway = scene.createRoom('Hallway', 0, 0, 10, 10);
        livingRoom = scene.createRoom('Living Room', 10, 0, 10, 10);
        kitchen = scene.createRoom('Kitchen', 20, 0, 10, 10);
        locHallway = hallway.createLocation("Start Hall", 5, 5);
        locLivingRoom = livingRoom.createLocation("Sofa", 5, 5);
        locLivingRoom2 = livingRoom.createLocation("TV", 7, 5);
        locKitchen = kitchen.createLocation("Stove", 5, 5);
        hallway.addAdjacentRoom(livingRoom.getName());
        livingRoom.addAdjacentRoom(hallway.getName());
        livingRoom.addAdjacentRoom(kitchen.getName());
        kitchen.addAdjacentRoom(livingRoom.getName());
        walkMotion = new WalkMotion(locHallway, 5, scene);
    });

    it('should have been initialised correct in hallway', () => {
        expect(walkMotion.getRoom().getName()).toBe(hallway.getName());
        expect(walkMotion.getPosition().getX()).toBe(5);
        expect(walkMotion.getPosition().getY()).toBe(5);
        expect(walkMotion.getDestination()).toBe(WalkMotion.NULL_LOCATION);
        expect(walkMotion.isMoving()).toBe(false);
        expect(walkMotion.path).toBeInstanceOf(Path);
        expect(walkMotion.path.isEmpty()).toBe(true);
        expect(walkMotion.getTargetPosition()).toBeNull();
        expect(walkMotion.path.getCurrentIndex()).toBe(0);
        expect(walkMotion.path.getLength()).toBe(0);
        expect(walkMotion.getTargetPosition()).toBeNull();
        expect(walkMotion.isTargetPositionDefined()).toBe(false);
    });

    it('should set a destination when starting movement - to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        expect(walkMotion.getDestination()).toBe(locLivingRoom);
    });

    it('should set the movement state when starting movement - to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        expect(walkMotion.isMoving()).toBe(true);
    });

    it('should calculate path when starting movement - to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        expect(walkMotion.path).toBeInstanceOf(Path);
        expect(walkMotion.path.getCurrentIndex()).toBe(0);
        expect(walkMotion.path.getLength()).toBe(2);
        expect(walkMotion.path.getRoomAt(0)).toBe(hallway.getName());
        expect(walkMotion.path.getRoomAt(1)).toBe(livingRoom.getName());
    });

    it('should start in expected room when starting movement - to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        expect(walkMotion.getRoom().getName()).toBe(hallway.getName());
    });

    it('should calculate target position in expected room when starting movement - to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        expect(walkMotion.getTargetPosition()).toEqual(calculateTargetPosition(hallway));
        expect(walkMotion.getTargetPosition().getX()).toBeCloseTo(5);
        expect(walkMotion.getTargetPosition().getY()).toBeCloseTo(0.1);
    });

    it('should update the position correctly - when moving to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(9.489);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(2.3);
    });

    it('should update the position correctly - when moving to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(13.979);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(4.5);
    });

    it('should update the movement state correctly - when moving to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.isMoving()).toBe(true);
    });

    it('should stop moving when the destination is reached - when moving to next room', () => {
        walkMotion.moveTo(locLivingRoom);
        walkMotion.update();
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(locLivingRoom.getPhysicalPosition().getX());
        expect(walkMotion.getPosition().getY()).toBeCloseTo(locLivingRoom.getPhysicalPosition().getY());
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should return the current path with getPath', () => {
        expect(walkMotion.getPath()).toBe(walkMotion.path);
    });

    it('should return the current speed with getSpeed', () => {
        expect(walkMotion.getSpeed()).toBe(5);
    });
});

describe('getPosition', () => {
    let initialLocation;
    let initialPosition;
    let walkMotion;
    let scene;
    let testRoom;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        walkMotion = new WalkMotion(initialLocation, 5, scene);
    });

    it('should return the current position', () => {
        const position = walkMotion.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBe(initialPosition.getX());
        expect(position.getY()).toBe(initialPosition.getY());
    });

    it('should return the current position after moving along x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        const position = walkMotion.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBeCloseTo(5);
        expect(position.getY()).toBeCloseTo(0);
    });

    it('should return the current position after moving along y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        const position = walkMotion.getPosition();
        expect(position).toBeInstanceOf(Position);
        expect(position.getX()).toBeCloseTo(0);
        expect(position.getY()).toBeCloseTo(5);
    });
});

describe('getDestination', () => {
    let initialLocation;
    let initialPosition;
    let walkMotion;
    let scene;
    let testRoom;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        walkMotion = new WalkMotion(initialLocation, 5, scene);
    });

    it('should return the initial destination', () => {
        const position = walkMotion.getDestination();
        expect(position).toBe(WalkMotion.NULL_LOCATION);
    });

    it('should return the current destination after moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        const actualLocation = walkMotion.getDestination();
        expect(actualLocation).toBeInstanceOf(Location);
        expect(actualLocation.getName()).toBe(destLocation.getName());
        const actualPosition = actualLocation.getPhysicalPosition();
        expect(actualPosition.getX()).toBe(destPosition.getX());
        expect(actualPosition.getY()).toBe(destPosition.getY());
    });

    it('should return the current destination after moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        const actualLocation = walkMotion.getDestination();
        expect(actualLocation).toBeInstanceOf(Location);
        expect(actualLocation.getName()).toBe(destLocation.getName());
        const actualPosition = actualLocation.getPhysicalPosition();
        expect(actualPosition.getX()).toBe(destPosition.getX());
        expect(actualPosition.getY()).toBe(destPosition.getY());
    });
});

describe('Direct Movement (No Pathfinding Required)', () => {
    let testRoom;
    let scene;
    let initialLocation;
    let initialPosition;
    let walkMotion;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 200, 200);
        initialLocation = testRoom.createLocation("Start", 0, 0);
        walkMotion = new WalkMotion(initialLocation, 5, scene);
    });

    it('should set a destination when starting movement', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        expect(walkMotion.getDestination()).toBe(destLocation);
    });

    it('should update the movement state when starting movement', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        expect(walkMotion.isMoving()).toBe(true);
    });

    it('should update the target position when starting movement', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        expect(walkMotion.getTargetPosition()).toEqual(destLocation.getPhysicalPosition());
    });

    it('should update the position correctly - when moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(5);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(0);
        expect(walkMotion.isMoving()).toBe(true);
    });

    it('should update the position correctly - when moving along the x axis #2', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(10);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(0);
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should update the position correctly - when moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(0);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(5);
        expect(walkMotion.isMoving()).toBe(true);
    });

    it('should update the position correctly - when moving along the y axis #2', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.getPosition().getX()).toBeCloseTo(0);
        expect(walkMotion.getPosition().getY()).toBeCloseTo(10);
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached - when moving along the x axis', () => {
        const destPosition = Position.create(10, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached - when moving along the y axis', () => {
        const destPosition = Position.create(0, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        walkMotion.update();
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should stop moving when the destination is reached', () => {
        const destPosition = Position.create(30, 30);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        let reached = false;
        for (let i = 0; i < 15; i++) {
            reached = walkMotion.update();
            if (reached) break;
        }
        expect(reached).toBe(true);
        expect(walkMotion.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(walkMotion.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should clear destination when reached', () => {
        const destPosition = Position.create(5, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        walkMotion.update();
        walkMotion.update();
        const actualDestination = walkMotion.getDestination();
        expect(actualDestination.getName()).toBe(WalkMotion.NULL_LOCATION.getName());
    });

    it('should not report move if not moving', () => {
        const reached = walkMotion.update();
        expect(reached).toBe(true);
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should not update position if not moving', () => {
        const reached = walkMotion.update();
        expect(reached).toBe(true);
        const actualPosition = walkMotion.getPosition();
        expect(actualPosition.getX()).toBe(initialPosition.getX());
        expect(actualPosition.getY()).toBe(initialPosition.getY());
    });

    it('should stop immediately reach destination if it is close enough', () => {
        const destPosition = Position.create(4, 0);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        const reached = walkMotion.update();
        expect(reached).toBe(true);
        expect(walkMotion.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(walkMotion.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(walkMotion.isMoving()).toBe(false);
    });

    it('should handle diagonal movement correctly', () => {
        const destPosition = Position.create(10, 10);
        const destLocation = testRoom.createLocation("Destination", destPosition.getX(), destPosition.getY());
        walkMotion.moveTo(destLocation);
        let reached = false;
        for (let i = 0; i < 5; i++) {
            reached = walkMotion.update();
            if (reached) break;
        }
        expect(reached).toBe(true);
        expect(walkMotion.getPosition().getX()).toBeCloseTo(destPosition.getX());
        expect(walkMotion.getPosition().getY()).toBeCloseTo(destPosition.getY());
        expect(walkMotion.isMoving()).toBe(false);
    });
});

describe('Edge Cases and Error Handling', () => {
    let scene;
    let testRoom;
    let initialLocation;
    let initialPosition;
    let walkMotion;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        testRoom = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = testRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        walkMotion = new WalkMotion(initialLocation, 5, scene);
    });

    it('should throw if moveTo is called with null', () => {
        expect(() => walkMotion.moveTo(null)).toThrow();
    });

    it('should throw if moveTo is called with a non-Location', () => {
        expect(() => walkMotion.moveTo({})).toThrow();
    });

    it('should throw if constructed with invalid location', () => {
        expect(() => new WalkMotion(null, 5, scene)).toThrow();
    });

    it('should throw if constructed with invalid speed', () => {
        expect(() => new WalkMotion(initialLocation, 'fast', scene)).toThrow();
    });

    it('should throw if constructed with invalid scene', () => {
        expect(() => new WalkMotion(initialLocation, 5, null)).toThrow();
    });
});
