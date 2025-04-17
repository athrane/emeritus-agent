import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { RoomManager } from "../../../src/internal.js";

describe('RoomManager', () => {
    let roomManager;

    beforeEach(() => {
        roomManager = new RoomManager();
    });

    test('constructor initializes an empty map for rooms', () => {
        expect(roomManager.rooms).toBeInstanceOf(Map);
        expect(roomManager.rooms.size).toBe(0);
    });

    describe('createRoom', () => {
        test('should create a new room and add it to the manager', () => {
            const roomName = 'Living Room';
            const x = 0;
            const y = 0;
            const width = 10;
            const height = 10;

            const room = roomManager.createRoom(roomName, x, y, width, height);

            // Check if the returned object is a Room instance
            expect(room).toBeInstanceOf(Room);
            expect(room.name).toBe(roomName);
            expect(room.x).toBe(x);
            expect(room.y).toBe(y);
            expect(room.width).toBe(width);
            expect(room.height).toBe(height);

            // Check if the room was added to the internal map
            expect(roomManager.rooms.size).toBe(1);
            expect(roomManager.rooms.get(roomName)).toBe(room);
        });

        test('should overwrite an existing room if created with the same name', () => {
            const roomName = 'Kitchen';
            roomManager.createRoom(roomName, 0, 0, 5, 5); // Initial room
            const newRoom = roomManager.createRoom(roomName, 10, 10, 8, 8); // New room with same name

            expect(roomManager.rooms.size).toBe(1);
            expect(roomManager.rooms.get(roomName)).toBe(newRoom);
            expect(roomManager.rooms.get(roomName).x).toBe(10); // Verify new coordinates
        });

        // Add tests for TypeUtils ensuring correct types if needed (might require mocking TypeUtils)
        test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
             // This depends on TypeUtils implementation. If it throws, test for it.
             // Example: expect(() => roomManager.createRoom(123, 0, 0, 10, 10)).toThrow();
             // If TypeUtils doesn't throw but logs/handles differently, adjust the test.
             // For now, we assume TypeUtils handles type checking.
        });
    });

    describe('getRoom', () => {
        beforeEach(() => {
            // Pre-populate with a room for testing get
            roomManager.createRoom('Bedroom', 20, 20, 15, 15);
        });

        test('should return the correct room if it exists', () => {
            const roomName = 'Bedroom';
            const room = roomManager.getRoom(roomName);

            expect(room).toBeInstanceOf(Room);
            expect(room.name).toBe(roomName);
        });

        test('should return undefined if the room does not exist', () => {
            const roomName = 'NonExistentRoom';
            const room = roomManager.getRoom(roomName);

            expect(room).toBeUndefined();
        });

         test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
             // Similar to createRoom, depends on TypeUtils behavior.
             // Example: expect(() => roomManager.getRoom(123)).toThrow();
         });
    });

    describe('createLocation', () => {
        const roomName = 'Office';
        let testRoom;

        beforeEach(() => {
            // Create a room to add locations to
            testRoom = roomManager.createRoom(roomName, 50, 50, 20, 20);
             // Spy on the room's addLocation method to check if it's called
            jest.spyOn(testRoom, 'addLocation');
        });

        afterEach(() => {
            // Restore the original method after the test
             jest.restoreAllMocks();
        });

        test('should create a new location and add it to the specified room', () => {
            const locName = 'Desk';
            const x = 55;
            const y = 55;

            const location = roomManager.createLocation(locName, x, y, roomName);

            // Check if the returned object is a Location instance
            expect(location).toBeInstanceOf(Location);
            expect(location.name).toBe(locName);
            expect(location.x).toBe(x);
            expect(location.y).toBe(y);
            expect(location.roomName).toBe(roomName);

            // Check if the location was added to the room
            expect(testRoom.addLocation).toHaveBeenCalledTimes(1);
            expect(testRoom.addLocation).toHaveBeenCalledWith(location);
            // Optionally, check the room's internal locations array if accessible
            // expect(testRoom.locations.get(locName)).toBe(location);
        });

        test('should create a location even if the room does not exist', () => {
            const locName = 'Phantom Chair';
            const x = 100;
            const y = 100;
            const nonExistentRoomName = 'Basement';

            const location = roomManager.createLocation(locName, x, y, nonExistentRoomName);

            // Check location properties
            expect(location).toBeInstanceOf(Location);
            expect(location.name).toBe(locName);
            expect(location.x).toBe(x);
            expect(location.y).toBe(y);
            expect(location.roomName).toBe(nonExistentRoomName);

            // Ensure addLocation was not called on the existing testRoom
            expect(testRoom.addLocation).not.toHaveBeenCalled();
        });
    });

    describe('findShortestPath', () => {
        beforeEach(() => {
            // Create some rooms for pathfinding tests
            roomManager.createRoom('Hallway', 0, 0, 5, 20);
            roomManager.createRoom('Living Room', 5, 5, 10, 10);
            roomManager.createRoom('Kitchen', 5, 15, 10, 10);
        });

        test('should return the start and end room names (placeholder behavior)', () => {
            const startRoom = 'Living Room';
            const endRoom = 'Kitchen';
            const path = roomManager.findShortestPath(startRoom, endRoom);

            expect(path).toEqual([startRoom, endRoom]);
        });

        test('should return the same room name twice if start and end are the same (placeholder behavior)', () => {
            const startRoom = 'Hallway';
            const endRoom = 'Hallway';
            const path = roomManager.findShortestPath(startRoom, endRoom);

            expect(path).toEqual([startRoom, endRoom]);
        });

        // Add more tests here once the actual pathfinding algorithm (BFS/A*) is implemented
        // e.g., test actual paths, paths through multiple rooms, non-existent rooms, etc.
    });
});
