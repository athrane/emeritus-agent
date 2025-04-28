import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";


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

    describe('getLocation', () => {
        let room;
        let loc1, loc2;
        beforeEach(() => {
            room = scene.createRoom('Living Room', 0, 0, 10, 10);
            loc1 = room.createLocation('Sofa', 2, 2);
            loc2 = room.createLocation('Table', 5, 5);
        });
        
        test('should return the correct location if it exists', () => {
            const location = scene.getLocation('Sofa');
            expect(location).toBeInstanceOf(Location);
            expect(location.getName()).toBe('Sofa');
            expect(location.getPosition().getX()).toBe(2);
            expect(location.getPosition().getY()).toBe(2);
        });

        test('should throw error if the location does not exist', () => {
            expect(() => scene.getLocation('NonExistentLocation')).toThrowError();
        });

        test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
            expect(() => scene.getLocation(123)).toThrowError();
        });

        test('should throw error if location is not in any room', () => {
            const invalidLocation = Location.create('InvalidLocation', Position.create(100, 100));
            expect(() => scene.getLocation(invalidLocation.getName())).toThrowError();
        });
    });
    
    describe('findShortestPath', () => {
        let hallway, livingRoom, kitchen, office; // Define rooms
        let locEntrance, locSofa, locStove, locDesk; // Define locations

        beforeEach(() => {

            scene = new Scene(); // Recreate scene for each test
            // Create rooms
            hallway = scene.createRoom('Hallway', 0, 0, 5, 20);
            livingRoom = scene.createRoom('Living Room', 5, 5, 10, 10);
            kitchen = scene.createRoom('Kitchen', 5, 15, 10, 10);
            office = scene.createRoom('Office', 20, 0, 10, 10); // Unconnected room

            // Create locations within rooms (adjust positions as needed)
            locEntrance = hallway.createLocation("Hallway Entrance", 2, 2);
            locSofa = livingRoom.createLocation("Sofa", 7, 7);
            locStove = kitchen.createLocation("Stove", 7, 17);
            locDesk = office.createLocation("Desk", 22, 5);

            // Define adjacency (important for pathfinding)
            hallway.addAdjacentRoom(livingRoom.getName());
            livingRoom.addAdjacentRoom(hallway.getName());
            livingRoom.addAdjacentRoom(kitchen.getName());
            kitchen.addAdjacentRoom(livingRoom.getName());
            // Office is not connected

            // Create some rooms for pathfinding tests
            //scene.createRoom('Hallway', 0, 0, 5, 20);
            //scene.createRoom('Living Room', 5, 5, 10, 10);
            //scene.createRoom('Kitchen', 5, 15, 10, 10);
        });

        test('should return a Path object', () => {
            const path = scene.findShortestPath(locSofa, locStove);
            expect(path).toBeInstanceOf(Path);
        });

        test('should find a direct path between adjacent rooms', () => {
            const path = scene.findShortestPath(locSofa, locStove);
            expect(path.getRoomNames()).toEqual(['Living Room', 'Kitchen']);
        });

        test('should find a path through an intermediate room', () => {
            const path = scene.findShortestPath(locEntrance, locStove);
            expect(path.getRoomNames()).toEqual(['Hallway', 'Living Room', 'Kitchen']);
        });

        test('should return a path with only the start room if start and end are in the same room', () => {
            const locChair = livingRoom.createLocation("Chair", 8, 8);
            const path = scene.findShortestPath(locChair, locSofa);
            expect(path.getRoomNames()).toEqual(['Living Room']);
        });

        test('should return an empty path if no path exists (unconnected rooms)', () => {
            const path = scene.findShortestPath(locEntrance, locDesk);
            expect(path).toBeInstanceOf(Path);
            expect(path.isEmpty()).toBe(true);
            expect(path.getRoomNames()).toEqual([]);
        });

        test('should throw error if start location is not in any room', () => {
            const invalidStartLoc = Location.create("Nowhere", Position.create(100, 100));
            expect(() => scene.findShortestPath(invalidStartLoc, locKitchen)).toThrow(Error);
        });

        test('should throw error if end location is not in any room', () => {
            const invalidEndLoc = Location.create("Void", Position.create(200, 200));
            expect(() => scene.findShortestPath(locKitchen, invalidEndLoc)).toThrow(Error);
        });

    });
});
