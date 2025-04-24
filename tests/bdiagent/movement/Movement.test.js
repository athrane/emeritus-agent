import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Movement } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";

describe('Basic movement tests', () => {
    let initialLocation;
    let initialPosition;
    let movement;
    let scene;

    beforeEach(() => {
        scene = new Scene(); 
        initialPosition = Position.create(0, 0);
        // Create a dummy room to hold the initial location for basic tests
        const dummyRoom = scene.createRoom("DummyRoomForStart", -100, -100, 200, 200);
        initialLocation = dummyRoom.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        movement = new Movement(initialLocation, 5, scene);
    });

    it('should be able to create movement instance', () => {
        expect(movement).toBeInstanceOf(Movement);
    });

    it('should get current location with the correct position', () => {
        const currentLocation = movement.getLocation();
        const currentPosition = movement.getPosition();
        expect(currentLocation).toBeInstanceOf(Location);
        expect(currentLocation.getName()).toBe("Current Location"); 
        expect(currentLocation.getPosition().getX()).toBe(currentPosition.getX());
        expect(currentLocation.getPosition().getY()).toBe(currentPosition.getY());
    });

    it('should initialize with the correct position', () => {
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
    });

    it('should initialize with the correct location and speed', () => {
        expect(movement.getPosition().getX()).toBe(initialLocation.getPosition().getX());
        expect(movement.getPosition().getY()).toBe(initialLocation.getPosition().getY());
        expect(movement.speed).toBe(5);
    });

    it('should initialize with null destination and no movement', () => {
        expect(movement.isMoving()).toBe(false);
        expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
    });

    describe('Direct Movement (No Pathfinding Required)', () => {
        // These tests assume moveTo sets currentTargetPosition directly
        // because the start/end are in the same room.

        let dummyRoom; // Define dummyRoom here to be accessible in tests

        beforeEach(() => {
            // Ensure the dummy room exists for these tests
            // Use a consistent room for these direct movement tests
            dummyRoom = scene.getRoom("DummyRoomForStart"); // Get the room created in the outer beforeEach
            // Reset movement to start at the initialLocation within this room
            initialLocation = dummyRoom.hasLocation("Start")
                ? dummyRoom.locations.find(loc => loc.getName() === "Start") // Get existing if already created
                : dummyRoom.createLocation("Start", 0, 0); // Or recreate if needed (e.g., if outer beforeEach changes)
            movement = new Movement(initialLocation, 5, scene);
        });

        it('should set a destination and start moving', () => {
            const destPosition = Position.create(10, 10);
            // Create destination within the same dummy room
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);
            expect(movement.getDestination()).toBe(destination);
            expect(movement.isMoving()).toBe(true);
            // Check that the target is the final destination directly because it's in the same room
            expect(movement.currentTargetPosition).toEqual(destination.getPosition());
        });

        it('should update the position correctly when moving', () => {
            const destPosition = Position.create(10, 0);
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);
            movement.update();
            expect(movement.getPosition().getX()).toBeCloseTo(5);
            expect(movement.getPosition().getY()).toBe(0);
            expect(movement.isMoving()).toBe(true);
        });

        it('should update the position correctly when moving #2', () => {
            const destPosition = Position.create(10, 0);
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);
            movement.update();
            movement.update();
            expect(movement.getPosition().getX()).toBeCloseTo(10);
            expect(movement.getPosition().getY()).toBe(0);
            expect(movement.isMoving()).toBe(false); // Should stop after reaching
        });

        it('should stop moving when the destination is reached', () => {
            const destPosition = Position.create(30, 30);
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);

            let reached = false;
            for (let i = 0; i < 15; i++) { // Increased loop count slightly for diagonal
                reached = movement.update();
                if (reached) break;
            }

            expect(reached).toBe(true); // Make sure it actually reported reaching
            expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX());
            expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY());
            expect(movement.isMoving()).toBe(false);
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        });

        it('should not move if not moving', () => {
            const reached = movement.update(); // Should return true if not moving
            expect(reached).toBe(true);
            expect(movement.getPosition().getX()).toBe(initialLocation.getPosition().getX()); // Should be initial position
            expect(movement.getPosition().getY()).toBe(initialLocation.getPosition().getY()); // Should be initial position
            expect(movement.isMoving()).toBe(false);
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        });

        it('should stop immediately reach destination if it is close enough', () => {
            const destPosition = Position.create(4, 0); // Distance < speed (5)
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);
            const reached = movement.update();

            expect(reached).toBe(true);
            expect(movement.getPosition().getX()).toBeCloseTo(destPosition.getX()); // Use closeTo
            expect(movement.getPosition().getY()).toBeCloseTo(destPosition.getY()); // Use closeTo
            // Check final state
            expect(movement.isMoving()).toBe(false);
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        });

        it('should not move if destination is NULL_LOCATION (even if isMoving was true)', () => {
            // This test checks the early exit condition in update()
            movement.destination = Movement.NULL_LOCATION;
            movement.isAgentMoving = true; // Force moving state
            movement.currentTargetPosition = Position.create(10,10); // Give it a target

            const initialX = movement.getPosition().getX();
            const initialY = movement.getPosition().getY();
            const reached = movement.update(); // Should exit early

            expect(reached).toBe(true); // Should report 'reached' because it exits
            expect(movement.getPosition().getX()).toBe(initialX);
            expect(movement.getPosition().getY()).toBe(initialY);
            // The update method doesn't reset isAgentMoving in this specific exit case.
            expect(movement.isMoving()).toBe(true);
        });

         it('should not move if currentTargetPosition is null (even if isMoving was true)', () => {
            // This test checks another early exit condition in update()
            const destPosition = Position.create(50,50);
            const destination = dummyRoom.createLocation("SomeDest", destPosition.getX(), destPosition.getY());
            movement.destination = destination; // Valid destination
            movement.isAgentMoving = true; // Force moving state
            movement.currentTargetPosition = null; // NO current target

            const initialX = movement.getPosition().getX();
            const initialY = movement.getPosition().getY();
            const reached = movement.update(); // Should exit early

            expect(reached).toBe(true); // Should report 'reached' because it exits
            expect(movement.getPosition().getX()).toBe(initialX);
            expect(movement.getPosition().getY()).toBe(initialY);
            expect(movement.isMoving()).toBe(true); // State isn't reset here
        });


        it('should handle diagonal movement correctly', () => {
            const destPosition = Position.create(10, 10);
            const destination = dummyRoom.createLocation("D1", destPosition.getX(), destPosition.getY());

            movement.moveTo(destination);

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
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
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
            hallway = scene.createRoom('Hallway', 0, 0, 10, 40); // x:0-10, y:0-40
            livingRoom = scene.createRoom('Living Room', 10, 10, 20, 20); // x:10-30, y:10-30
            kitchen = scene.createRoom('Kitchen', 10, 30, 20, 20); // x:10-30, y:30-50

            // Define locations within these rooms using room.createLocation
            locHallway = hallway.createLocation("Start Hall", 5, 5);
            locLivingRoom = livingRoom.createLocation("Sofa", 20, 20); // Center of Living Room
            locLivingRoom2 = livingRoom.createLocation("TV", 28, 28); // Another LR location
            locKitchen = kitchen.createLocation("Stove", 20, 40); // Center of Kitchen

            // Define adjacency
            hallway.addAdjacentRoom(livingRoom.getName());
            livingRoom.addAdjacentRoom(hallway.getName());
            livingRoom.addAdjacentRoom(kitchen.getName());
            kitchen.addAdjacentRoom(livingRoom.getName());

            // Initial location is in the hallway
            movement = new Movement(locHallway, 5, scene);
        });

        it('should set a destination and start moving', () => {
            movement.moveTo(locKitchen); // Move to Kitchen
            expect(movement.getDestination()).toBe(locKitchen);
            expect(movement.isMoving()).toBe(true);
            expect(movement.currentTargetPosition).toEqual(locKitchen.getPosition());
            expect(movement.currentPath).toBeInstanceOf(Path);
            expect(movement.currentPath.getRoomNames()).toEqual(['Hallway', 'Living Room', 'Kitchen']);
            expect(movement.currentPathIndex).toBe(0); // Starts at the beginning of the path
        });                    

        it('should calculate a path and set initial target when moving between rooms', () => {
            movement.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen

            expect(movement.isMoving()).toBe(true);
            expect(movement.getDestination()).toBe(locKitchen); // Final destination stored
            expect(movement.currentPath).toBeInstanceOf(Path);
            expect(movement.currentPath.getRoomNames()).toEqual(['Hallway', 'Living Room', 'Kitchen']);
            expect(movement.currentPathIndex).toBe(0); // Starts at the beginning of the path

            // Expect initial target to be center of the *next* room (Living Room)
            // Note: The logic targets the *center* of the next room as an intermediate step.
            const livingRoomCenter = getRoomCenter(livingRoom);
            expect(movement.currentTargetPosition).toBeDefined();
            // Check against the calculated center of the next room in the path
            const nextRoomInPath = scene.getRoom(movement.currentPath.getRoomAt(1)); // Get Living Room
            const nextRoomCenter = getRoomCenter(nextRoomInPath);
            expect(movement.currentTargetPosition.getX()).toBeCloseTo(nextRoomCenter.getX());
            expect(movement.currentTargetPosition.getY()).toBeCloseTo(nextRoomCenter.getY());
        });


        it('should move towards intermediate waypoints and then the final destination', () => {
            movement.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen

            const livingRoomCenter = getRoomCenter(livingRoom);
            const kitchenFinalPos = locKitchen.getPosition(); // Final target position

            // 1. Check initial target is Living Room Center
            expect(movement.currentTargetPosition.getX()).toBeCloseTo(livingRoomCenter.getX());
            expect(movement.currentTargetPosition.getY()).toBeCloseTo(livingRoomCenter.getY());

            let reachedIntermediateTarget = false;
            let stepsToIntermediate = 0;
            const MAX_STEPS = 50; // Safety break

            // Loop until the target changes *or* final destination is reached
            while(stepsToIntermediate < MAX_STEPS) {
                 stepsToIntermediate++;
                 const justReachedFinal = movement.update(); // update returns true only on *final* destination

                 // Check if the current target *changed* after the update to the final destination
                 if (movement.currentTargetPosition && movement.currentTargetPosition.distanceTo(kitchenFinalPos) < 0.01) {
                     reachedIntermediateTarget = true; // Target is now the final one
                     break;
                 }
                 if (justReachedFinal) {
                     // This might happen if the intermediate step is skipped or very close
                     reachedIntermediateTarget = true; // Effectively reached intermediate and final
                     break;
                 }
            }

            expect(reachedIntermediateTarget).toBe(true); // Assert intermediate target was processed
            expect(stepsToIntermediate).toBeLessThan(MAX_STEPS); // Ensure loop didn't time out
            // Path index should advance past Hallway (index 0) to Living Room (index 1)
            expect(movement.currentPathIndex).toBe(1);
            // Target should now be the final destination's position
            expect(movement.currentTargetPosition.getX()).toBeCloseTo(kitchenFinalPos.getX());
            expect(movement.currentTargetPosition.getY()).toBeCloseTo(kitchenFinalPos.getY());
            expect(movement.isMoving()).toBe(true); // Still moving towards kitchen

            // 2. Continue updates until final destination
            let reachedFinal = false;
            let stepsToFinal = 0;
            while(stepsToFinal < MAX_STEPS) {
                 stepsToFinal++;
                 reachedFinal = movement.update(); // update returns true when final destination is hit
                 if (reachedFinal) break;
            }

            expect(reachedFinal).toBe(true);
            expect(stepsToFinal).toBeLessThan(MAX_STEPS);
            expect(movement.isMoving()).toBe(false);
            expect(movement.getPosition().getX()).toBeCloseTo(locKitchen.getPosition().getX());
            expect(movement.getPosition().getY()).toBeCloseTo(locKitchen.getPosition().getY());
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION); // Destination reset
            expect(movement.currentPath.isEmpty()).toBe(true); // Path cleared
            expect(movement.currentPathIndex).toBe(-1); // Index reset
            expect(movement.currentTargetPosition).toBeNull(); // Target cleared
        });

         it('should handle moving within the same room (direct path)', () => {
            // Move from Sofa to TV within Living Room
            movement = new Movement(locLivingRoom, 5, scene); // Start in Living Room
            movement.moveTo(locLivingRoom2);

            expect(movement.isMoving()).toBe(true);
            // Path should contain only the current room
            expect(movement.currentPath.getRoomNames()).toEqual(['Living Room']);
            // Target should be the final destination directly
            expect(movement.currentTargetPosition).toEqual(locLivingRoom2.getPosition());

            // Simulate updates
            let reached = false;
            const MAX_STEPS = 20;
            let steps = 0;
             while(steps < MAX_STEPS) {
                 steps++;
                 reached = movement.update();
                 if (reached) break;
             }
            expect(reached).toBe(true);
            expect(steps).toBeLessThan(MAX_STEPS);
            expect(movement.isMoving()).toBe(false);
            expect(movement.getPosition().getX()).toBeCloseTo(locLivingRoom2.getPosition().getX());
            expect(movement.getPosition().getY()).toBeCloseTo(locLivingRoom2.getPosition().getY());
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
         });

         it('should stop if path becomes invalid during movement (e.g., path cleared externally)', () => {
             movement.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen
             expect(movement.isMoving()).toBe(true);

             // Simulate external interference clearing the path
             movement.currentPath = Path.createEmpty();
             movement.currentPathIndex = -1;
             movement.currentTargetPosition = null; // Crucial for the update check

             const reached = movement.update(); // Should exit early due to no target

             expect(reached).toBe(true); // Reports 'reached' due to early exit
             expect(movement.isMoving()).toBe(true); // State not reset by this exit path
             // Position should not have changed
             expect(movement.getPosition().getX()).toBeCloseTo(locHallway.getPosition().getX());
             expect(movement.getPosition().getY()).toBeCloseTo(locHallway.getPosition().getY());
         });

         it('should handle reaching an intermediate waypoint exactly in one step', () => {
             // We need a path A -> B -> C. Start in A, move towards B's center.
             // Position the agent so distance to B's center is exactly speed.
             const lrCenter = getRoomCenter(livingRoom); // Target: (20, 20)
             // Place start at (10, 20) in Hallway. Dist to (20, 20) is 10.
             const startPosExact = Position.create(10, 20); // Edge of hallway
             // Use hallway.createLocation
             const locExactStart = hallway.createLocation("ExactStart", startPosExact.getX(), startPosExact.getY());
             movement = new Movement(locExactStart, 10, scene); // Speed 10

             movement.moveTo(locKitchen); // Hallway -> LR -> Kitchen
             // Initial target is LR Center (20, 20)
             const nextRoomInPath = scene.getRoom(movement.currentPath.getRoomAt(1)); // LR
             const nextRoomCenter = getRoomCenter(nextRoomInPath);
             expect(movement.currentTargetPosition.getX()).toBeCloseTo(nextRoomCenter.getX()); // Should be 20
             expect(movement.currentTargetPosition.getY()).toBeCloseTo(nextRoomCenter.getY()); // Should be 20

             // First update should reach LR Center exactly
             const reached1 = movement.update();
             expect(reached1).toBe(false); // Did not reach *final* destination (Kitchen)
             // Position should be exactly at LR Center
             expect(movement.getPosition().getX()).toBeCloseTo(lrCenter.getX());
             expect(movement.getPosition().getY()).toBeCloseTo(lrCenter.getY());
             // Path index should have advanced to 1 (index for Kitchen in the path relative to LR)
             expect(movement.currentPathIndex).toBe(1);
             // New target should be final Kitchen location
             expect(movement.currentTargetPosition.getX()).toBeCloseTo(locKitchen.getPosition().getX());
             expect(movement.currentTargetPosition.getY()).toBeCloseTo(locKitchen.getPosition().getY());
             expect(movement.isMoving()).toBe(true);

             // Second update (move from LR center (20,20) to Kitchen (20,40), dist 20, speed 10)
             const reached2 = movement.update();
             expect(reached2).toBe(false);
             expect(movement.getPosition().getX()).toBeCloseTo(20);
             expect(movement.getPosition().getY()).toBeCloseTo(30); // Moved 10 towards (20,40)
             expect(movement.isMoving()).toBe(true);

             // Third update
             const reached3 = movement.update();
             expect(reached3).toBe(true); // Reached final destination
             expect(movement.getPosition().getX()).toBeCloseTo(locKitchen.getPosition().getX());
             expect(movement.getPosition().getY()).toBeCloseTo(locKitchen.getPosition().getY());
             expect(movement.isMoving()).toBe(false);
         });
    });

});
