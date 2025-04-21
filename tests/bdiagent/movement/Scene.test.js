import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";

describe('Scene', () => {
    let scene;

    beforeEach(() => {
        scene = new Scene();
    });

    test('constructor initializes an empty map for rooms', () => {
        expect(scene.rooms).toBeInstanceOf(Map);
        expect(scene.rooms.size).toBe(0);
    });

    describe('createRoom', () => {
        test('should create a new room and add it to the manager', () => {
            const roomName = 'Living Room';
            const x = 0;
            const y = 0;
            const width = 10;
            const height = 10;
            const room = scene.createRoom(roomName, x, y, width, height);

            expect(room).toBeInstanceOf(Room);
            expect(room.name).toBe(roomName);
            expect(room.getPosition().getX()).toBe(x);
            expect(room.getPosition().getY()).toBe(y);
            expect(room.getSize().getX()).toBe(width);
            expect(room.getSize().getY()).toBe(height);

            // Check if the room was added to the internal map
            expect(scene.rooms.size).toBe(1);
            expect(scene.rooms.get(roomName)).toBe(room);
        });

        test('should throw error if room is created with the same name', () => {
            const roomName = 'Kitchen';
            scene.createRoom(roomName, 0, 0, 5, 5); 
            expect(() => scene.createRoom(roomName, 1, 2, 3, 4)).toThrowError();
        });

        test('should throw error if room is created with non-string name', () => {
            expect(() => scene.createRoom(123, 0, 0, 3, 4)).toThrowError();
        });
    });

    describe('getRoom', () => {
        beforeEach(() => {
            scene.createRoom('Bedroom', 20, 20, 15, 15);
        });

        test('should return the correct room if it exists', () => {
            const roomName = 'Bedroom';
            const room = scene.getRoom(roomName);

            expect(room).toBeInstanceOf(Room);
            expect(room.name).toBe(roomName);
        });

        test('should throw error if the room does not exist', () => {
            const roomName = 'NonExistentRoom';
            expect(() => scene.getRoom(roomName)).toThrowError();
        });

         test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
            expect(() => scene.getRoom(123)).toThrowError();
         });
    });

    describe('createLocation', () => {
        const roomName = 'Office';
        let testRoom;

        beforeEach(() => {
            testRoom = scene.createRoom(roomName, 50, 50, 20, 20);
        });

        test('should create a new location and add it to the specified room', () => {
            const locName = 'Desk';
            const locPosition = Position.create(1, 2);
            const location = scene.createLocation(locName, locPosition, roomName);

            expect(location).toBeInstanceOf(Location);
            expect(location.getName()).toBe(locName);
            expect(location.getPosition()).toBe(locPosition);

            // Check if the location was added to the room
            expect(testRoom.hasLocation(locName)).toBe(true);
        });

        test('should throw error if the room does not exist', () => {
            const locName = 'Chair';
            const locPosition = Position.create(3, 4);
            const nonExistentRoomName = 'Basement';
            expect(() => scene.createLocation(locName, locPosition, nonExistentRoomName)).toThrowError();
        });

        test('should throw error if the location already exists in the room', () => {
            const locName = 'Desk';
            const locPosition = Position.create(1, 2);
            scene.createLocation(locName, locPosition, roomName); // Create the location first
            expect(() => scene.createLocation(locName, locPosition, roomName)).toThrowError();        
        });
    });


    describe('findShortestPath', () => {
        beforeEach(() => {
            // Create some rooms for pathfinding tests
            scene.createRoom('Hallway', 0, 0, 5, 20);
            scene.createRoom('Living Room', 5, 5, 10, 10);
            scene.createRoom('Kitchen', 5, 15, 10, 10);
        });

        test('should return the start and end room names (placeholder behavior)', () => {
            const startRoom = 'Living Room';
            const endRoom = 'Kitchen';
            const path = scene.findShortestPath(startRoom, endRoom);

            expect(path).toEqual([startRoom, endRoom]);
        });

        test('should return the same room name twice if start and end are the same (placeholder behavior)', () => {
            const startRoom = 'Hallway';
            const endRoom = 'Hallway';
            const path = scene.findShortestPath(startRoom, endRoom);

            expect(path).toEqual([startRoom, endRoom]);
        });

        // Add more tests here once the actual pathfinding algorithm (BFS/A*) is implemented
        // e.g., test actual paths, paths through multiple rooms, non-existent rooms, etc.
    });
});
