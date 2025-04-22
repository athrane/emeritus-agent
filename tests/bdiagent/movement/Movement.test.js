import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Movement } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";

describe('Movement', () => {
    let initialLocation;
    let initialPosition;
    let movement;
    let scene;

    beforeEach(() => {
        scene = new Scene(); // Use a fresh scene for basic tests too
        initialPosition = Position.create(0, 0);
        // Note: For basic tests, this location isn't explicitly added to a room in the scene.
        // This is okay for testing direct point-to-point movement logic *before* pathfinding kicks in.
        initialLocation = Location.create("Start", initialPosition);
        movement = new Movement(initialLocation, 5, scene);
    });

    // --- Existing tests from Movement.test.js go here ---

    it('should be able to create movement instance', () => {
        expect(movement).toBeInstanceOf(Movement);
    });

    it('should get current location with the correct position', () => {
        // Updated test as suggested previously
        const currentLocation = movement.getLocation();
        const currentPosition = movement.getPosition();
        expect(currentLocation).toBeInstanceOf(Location);
        expect(currentLocation.getName()).toBe("Current Location"); // Name is hardcoded
        expect(currentLocation.getPosition().getX()).toBe(currentPosition.getX());
        expect(currentLocation.getPosition().getY()).toBe(currentPosition.getY());
    });

    it('should initialize with the correct position', () => {
        expect(movement.getPosition().getX()).toBe(0);
        expect(movement.getPosition().getY()).toBe(0);
    });

    it('should initialize with the correct location and speed', () => {
        // This test seems redundant with the constructor and position tests
        // Consider removing or refining its purpose. Keeping for now.
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

    // --- Tests for direct movement (assuming no pathfinding needed initially) ---

    describe('Direct Movement (No Pathfinding Required)', () => {
        // These tests assume moveTo sets currentTargetPosition directly
        // because the scene is empty or start/end are treated as same room initially.

        it('should set a destination and start moving', () => {
            const destPosition = Position.create(10, 10);
            const destination = Location.create("D1", destPosition);
            // Since scene is empty, findShortestPath returns empty,
            // but moveTo might still set target if start/end assumed same room.
            // Let's simulate adding the locations to a dummy room for clarity
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
            scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
            scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

            movement.moveTo(destination);
            expect(movement.getDestination()).toBe(destination);
            expect(movement.isMoving()).toBe(true);
            // Check that the target is the final destination directly
            expect(movement.currentTargetPosition).toEqual(destination.getPosition());
        });

        it('should update the position correctly when moving', () => {
            const destPosition = Position.create(10, 0);
            const destination = Location.create("D1", destPosition);
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
             scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
             scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

            movement.moveTo(destination);
            movement.update();
            expect(movement.getPosition().getX()).toBeCloseTo(5);
            expect(movement.getPosition().getY()).toBe(0);
            expect(movement.isMoving()).toBe(true);
        });

        it('should update the position correctly when moving #2', () => {
            const destPosition = Position.create(10, 0);
            const destination = Location.create("D1", destPosition);
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
            scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
            scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

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
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
            scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
            scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

            movement.moveTo(destination);

            let reached = false;
            for (let i = 0; i < 10; i++) { // Increased loop count for diagonal
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
            expect(movement.getPosition().getX()).toBe(0);
            expect(movement.getPosition().getY()).toBe(0);
            expect(movement.isMoving()).toBe(false);
            expect(movement.getDestination()).toBe(Movement.NULL_LOCATION);
        });

        it('should stop immediately reach destination if it is close enough', () => {
            const destPosition = Position.create(4, 0); // Distance < speed (5)
            const destination = Location.create("D1", destPosition);
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
            scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
            scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

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
            expect(movement.getPosition().getY()).toBe(initialY); // Corrected assertion
            // The update method doesn't reset isAgentMoving in this specific exit case,
            // which might be a bug or intended behavior depending on design.
            // Let's assert the state *after* the early exit:
            expect(movement.isMoving()).toBe(true);
        });

         it('should not move if currentTargetPosition is null (even if isMoving was true)', () => {
            // This test checks another early exit condition in update()
            movement.destination = Location.create("SomeDest", Position.create(50,50)); // Valid destination
            movement.isAgentMoving = true; // Force moving state
            movement.currentTargetPosition = null; // NO current target

            const initialX = movement.getPosition().getX();
            const initialY = movement.getPosition().getY();
            const reached = movement.update(); // Should exit early

            expect(reached).toBe(true); // Should report 'reached' because it exits
            expect(movement.getPosition().getX()).toBe(initialX);
            expect(movement.getPosition().getY()).toBe(initialY);
            expect(movement.isMoving()).toBe(true); // Similar to above, state isn't reset here
        });


        it('should handle diagonal movement correctly', () => {
            // This is similar to the 'stop moving when destination is reached' test
            // but specifically uses a diagonal target.
            const destPosition = Position.create(10, 10);
            const destination = Location.create("D1", destPosition);
            const dummyRoom = scene.createRoom("DummyRoom", -100, -100, 200, 200);
            scene.createLocation(initialLocation.getName(), initialLocation.getPosition(), dummyRoom.getName());
            scene.createLocation(destination.getName(), destination.getPosition(), dummyRoom.getName());

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

    // ---  Pathfinding Movement Tests ---

    describe('Pathfinding Movement', () => {
        let sceneWithPath;
        let movementWithPath;
        let locHallway, locLivingRoom, locKitchen, locLivingRoom2; // Define locations
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
            sceneWithPath = new Scene();
            hallway = sceneWithPath.createRoom('Hallway', 0, 0, 10, 40); // x:0-10, y:0-40
            livingRoom = sceneWithPath.createRoom('Living Room', 10, 10, 20, 20); // x:10-30, y:10-30
            kitchen = sceneWithPath.createRoom('Kitchen', 10, 30, 20, 20); // x:10-30, y:30-50

            // Define locations within these rooms
            locHallway = sceneWithPath.createLocation("Start Hall", Position.create(5, 5), hallway.getName());
            locLivingRoom = sceneWithPath.createLocation("Sofa", Position.create(20, 20), livingRoom.getName()); // Center of Living Room
            locLivingRoom2 = sceneWithPath.createLocation("TV", Position.create(28, 28), livingRoom.getName()); // Another LR location
            locKitchen = sceneWithPath.createLocation("Stove", Position.create(20, 40), kitchen.getName()); // Center of Kitchen

            // Define adjacency
            hallway.addAdjacentRoom(livingRoom.getName());
            livingRoom.addAdjacentRoom(hallway.getName());
            livingRoom.addAdjacentRoom(kitchen.getName());
            kitchen.addAdjacentRoom(livingRoom.getName());

            // Initial location is in the hallway
            // Use speed 1 for easier step debugging/reasoning if needed, but 5 is fine too
            movementWithPath = new Movement(locHallway, 5, sceneWithPath);
        });

        it('should calculate a path and set initial target when moving between rooms', () => {
            movementWithPath.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen

            expect(movementWithPath.isMoving()).toBe(true);
            expect(movementWithPath.getDestination()).toBe(locKitchen); // Final destination stored
            expect(movementWithPath.currentPath).toBeInstanceOf(Path);
            expect(movementWithPath.currentPath.getRoomNames()).toEqual(['Hallway', 'Living Room', 'Kitchen']);
            expect(movementWithPath.currentPathIndex).toBe(0); // Starts at the beginning of the path

            // Expect initial target to be center of the *next* room (Living Room)
            const livingRoomCenter = getRoomCenter(livingRoom);
            expect(movementWithPath.currentTargetPosition).toBeDefined();
            expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(livingRoomCenter.getX());
            expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(livingRoomCenter.getY());
        });

        it('should move towards intermediate waypoints and then the final destination', () => {
            movementWithPath.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen

            const livingRoomCenter = getRoomCenter(livingRoom);
            const kitchenCenter = locKitchen.getPosition(); // Final target position

            // 1. Move towards Living Room Center
            expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(livingRoomCenter.getX());
            expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(livingRoomCenter.getY());

            let reachedIntermediate = false;
            let stepsToIntermediate = 0;
            const MAX_STEPS = 50; // Safety break

            while(stepsToIntermediate < MAX_STEPS) {
                 stepsToIntermediate++;
                 const justReached = movementWithPath.update(); // update returns true only on *final* destination
                 // Check if the current target *changed* after the update, indicating waypoint reached
                 if (movementWithPath.currentTargetPosition.distanceTo(kitchenCenter) < 0.01) {
                     reachedIntermediate = true;
                     break;
                 }
                 if (justReached) break; // Should not happen before reaching intermediate
            }

            expect(reachedIntermediate).toBe(true); // Assert intermediate target was set
            expect(stepsToIntermediate).toBeLessThan(MAX_STEPS); // Ensure loop didn't time out
            expect(movementWithPath.currentPathIndex).toBe(1); // Path index should advance past Living Room center
            expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(kitchenCenter.getX()); // Target should now be final destination
            expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(kitchenCenter.getY());
            expect(movementWithPath.isMoving()).toBe(true); // Still moving towards kitchen

            // 2. Continue updates until final destination
            let reachedFinal = false;
            let stepsToFinal = 0;
            while(stepsToFinal < MAX_STEPS) {
                 stepsToFinal++;
                 reachedFinal = movementWithPath.update(); // update returns true when final destination is hit
                 if (reachedFinal) break;
            }

            expect(reachedFinal).toBe(true);
            expect(stepsToFinal).toBeLessThan(MAX_STEPS);
            expect(movementWithPath.isMoving()).toBe(false);
            expect(movementWithPath.getPosition().getX()).toBeCloseTo(locKitchen.getPosition().getX());
            expect(movementWithPath.getPosition().getY()).toBeCloseTo(locKitchen.getPosition().getY());
            expect(movementWithPath.getDestination()).toBe(Movement.NULL_LOCATION); // Destination reset
            expect(movementWithPath.currentPath.isEmpty()).toBe(true); // Path cleared
            expect(movementWithPath.currentPathIndex).toBe(-1); // Index reset
            expect(movementWithPath.currentTargetPosition).toBeNull(); // Target cleared
        });

         it('should handle moving within the same room (direct path)', () => {
            // Move from Sofa to TV within Living Room
            movementWithPath = new Movement(locLivingRoom, 5, sceneWithPath); // Start in Living Room
            movementWithPath.moveTo(locLivingRoom2);

            expect(movementWithPath.isMoving()).toBe(true);
            // Path should contain only the current room
            expect(movementWithPath.currentPath.getRoomNames()).toEqual(['Living Room']);
            // Target should be the final destination directly
            expect(movementWithPath.currentTargetPosition).toEqual(locLivingRoom2.getPosition());

            // Simulate updates
            let reached = false;
            const MAX_STEPS = 20;
            let steps = 0;
             while(steps < MAX_STEPS) {
                 steps++;
                 reached = movementWithPath.update();
                 if (reached) break;
             }
            expect(reached).toBe(true);
            expect(steps).toBeLessThan(MAX_STEPS);
            expect(movementWithPath.isMoving()).toBe(false);
            expect(movementWithPath.getPosition().getX()).toBeCloseTo(locLivingRoom2.getPosition().getX());
            expect(movementWithPath.getPosition().getY()).toBeCloseTo(locLivingRoom2.getPosition().getY());
            expect(movementWithPath.getDestination()).toBe(Movement.NULL_LOCATION);
         });

         it('should stop if path becomes invalid during movement (e.g., path cleared externally)', () => {
             movementWithPath.moveTo(locKitchen); // Hallway -> Living Room -> Kitchen
             expect(movementWithPath.isMoving()).toBe(true);

             // Simulate external interference clearing the path
             movementWithPath.currentPath = Path.createEmpty();
             movementWithPath.currentPathIndex = -1;
             movementWithPath.currentTargetPosition = null; // Crucial for the update check

             const reached = movementWithPath.update(); // Should exit early due to no target

             expect(reached).toBe(true); // Reports 'reached' due to early exit
             expect(movementWithPath.isMoving()).toBe(true); // State not reset by this exit path
             // Position should not have changed
             expect(movementWithPath.getPosition().getX()).toBeCloseTo(locHallway.getPosition().getX());
             expect(movementWithPath.getPosition().getY()).toBeCloseTo(locHallway.getPosition().getY());
         });

         it('should handle reaching an intermediate waypoint exactly in one step', () => {
             // Start close to the intermediate target (Living Room Center)
             const livingRoomCenter = getRoomCenter(livingRoom);
             const startPosNearCenter = Position.create(
                 livingRoomCenter.getX() - 3, // Distance = sqrt(3^2 + 4^2) = 5 (exactly speed)
                 livingRoomCenter.getY() - 4
             );
             const locNearCenter = sceneWithPath.createLocation("NearCenter", startPosNearCenter, livingRoom.getName());
             // Need to adjust adjacency if starting in Living Room
             livingRoom.addAdjacentRoom(kitchen.getName());
             kitchen.addAdjacentRoom(livingRoom.getName());

             movementWithPath = new Movement(locNearCenter, 5, sceneWithPath); // Start near LR center
             movementWithPath.moveTo(locKitchen); // LR -> Kitchen

             // Path should be ['Living Room', 'Kitchen']
             expect(movementWithPath.currentPath.getRoomNames()).toEqual(['Living Room', 'Kitchen']);
             // Initial target should be Kitchen (since we are already in the last room of the path segment before kitchen)
             // Let's re-evaluate this: moveTo calculates path LR->Kitchen. Index 0. Target is Kitchen center.
             expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(locKitchen.getPosition().getX());
             expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(locKitchen.getPosition().getY());

             // --- Let's rethink the test setup for hitting intermediate exactly ---
             // We need a path A -> B -> C. Start in A, move towards B's center.
             // Position the agent so distance to B's center is exactly speed.
             const hallCenter = getRoomCenter(hallway); // Not used, just for reference
             const lrCenter = getRoomCenter(livingRoom);
             const startPosNearHall = Position.create(
                 lrCenter.getX() - 5, // Move exactly 5 units in X to reach LR center
                 lrCenter.getY()
             );
             // We need a location *in the hallway* that is 5 units from LR center
             // Let's place start location at (15, 20) which is LR center.
             // No, start in Hallway. Hallway: x:0-10, y:0-40. LR Center: (20, 20)
             // Place start at (X, Y) in Hallway such that distance to (20, 20) is 5.
             // Let's place start at (20-sqrt(5^2-0^2), 20) = (15, 20) -- this is in LR, not Hallway.
             // Let's place start at (X, Y) in Hallway. e.g. (5, 20). Dist to (20, 20) is 15.
             // Let's place start at (X, Y) in Hallway, e.g. (8, 20). Dist to (20, 20) is 12.
             // Let's place start at (X, Y) in Hallway, e.g. (10 - epsilon, 20). Dist to (20, 20) is 10+epsilon.
             // Let's place start at (X, Y) in Hallway, e.g. (X, 15). Dist to (20, 20) = sqrt((20-X)^2 + 5^2) = 5? No solution.

             // Okay, let's adjust speed or positions. Speed = 10. Start at (10, 20) in Hallway. Target (20, 20). Dist = 10.
             const startPosExact = Position.create(10, 20); // Edge of hallway
             const locExactStart = sceneWithPath.createLocation("ExactStart", startPosExact, hallway.getName());
             movementWithPath = new Movement(locExactStart, 10, sceneWithPath); // Speed 10

             movementWithPath.moveTo(locKitchen); // Hallway -> LR -> Kitchen
             // Initial target is LR Center (20, 20)
             expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(lrCenter.getX());
             expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(lrCenter.getY());

             // First update should reach LR Center exactly
             const reached1 = movementWithPath.update();
             expect(reached1).toBe(false); // Did not reach *final* destination
             // Position should be exactly at LR Center
             expect(movementWithPath.getPosition().getX()).toBeCloseTo(lrCenter.getX());
             expect(movementWithPath.getPosition().getY()).toBeCloseTo(lrCenter.getY());
             // Path index should have advanced
             expect(movementWithPath.currentPathIndex).toBe(1);
             // New target should be Kitchen location
             expect(movementWithPath.currentTargetPosition.getX()).toBeCloseTo(locKitchen.getPosition().getX());
             expect(movementWithPath.currentTargetPosition.getY()).toBeCloseTo(locKitchen.getPosition().getY());
             expect(movementWithPath.isMoving()).toBe(true);

             // Second update (move from LR center (20,20) to Kitchen (20,40), dist 20, speed 10)
             const reached2 = movementWithPath.update();
             expect(reached2).toBe(false);
             expect(movementWithPath.getPosition().getX()).toBeCloseTo(20);
             expect(movementWithPath.getPosition().getY()).toBeCloseTo(30); // Moved 10 towards (20,40)
             expect(movementWithPath.isMoving()).toBe(true);

             // Third update
             const reached3 = movementWithPath.update();
             expect(reached3).toBe(true); // Reached final destination
             expect(movementWithPath.getPosition().getX()).toBeCloseTo(locKitchen.getPosition().getX());
             expect(movementWithPath.getPosition().getY()).toBeCloseTo(locKitchen.getPosition().getY());
             expect(movementWithPath.isMoving()).toBe(false);
         });
    });

});
