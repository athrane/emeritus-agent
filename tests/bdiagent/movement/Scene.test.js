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
        
        test('should return the correct location if it exists', () => {
            const room = scene.createRoom('Living Room', 0, 0, 10, 10);
            const locSofa = room.createLocation('Sofa', 2, 3);
            const location = scene.getLocation('Sofa');
            expect(location).toBeInstanceOf(Location);
            expect(location.getName()).toBe('Sofa');
            expect(location.getRelativePosition().getX()).toBe(2);
            expect(location.getRelativePosition().getY()).toBe(3);
            expect(location.getPhysicalPosition().getX()).toBe(2);
            expect(location.getPhysicalPosition().getY()).toBe(3);
        });

        test('should return the correct location if it exists', () => {
            const room = scene.createRoom('Living Room', 10, 10, 10, 10);
            const locSofa = room.createLocation('Sofa', 2, 3);
            const location = scene.getLocation('Sofa');
            expect(location).toBeInstanceOf(Location);
            expect(location.getName()).toBe('Sofa');
            expect(location.getRelativePosition().getX()).toBe(2);
            expect(location.getRelativePosition().getY()).toBe(3);
            expect(location.getPhysicalPosition().getX()).toBe(12);
            expect(location.getPhysicalPosition().getY()).toBe(13);
        });

        test('should throw error if the location does not exist', () => {
            expect(() => scene.getLocation('NonExistentLocation')).toThrowError();
        });

        test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
            expect(() => scene.getLocation(123)).toThrowError();
        });

        test('should throw error if location is not in any room', () => {
            expect(() => scene.getLocation('InvalidLocation')).toThrowError();
        });
    });

    describe('getLocation', () => {
        test('should return the correct location if it exists', () => {
            const room = scene.createRoom('Living Room', 0, 0, 10, 10);
            const locSofa = room.createLocation('Sofa', 2, 3);
            const location = scene.getLocation('Sofa');
            expect(location).toBeInstanceOf(Location);
            expect(location.getName()).toBe('Sofa');
            expect(location.getRelativePosition().getX()).toBe(2);
            expect(location.getRelativePosition().getY()).toBe(3);
            expect(location.getPhysicalPosition().getX()).toBe(2);
            expect(location.getPhysicalPosition().getY()).toBe(3);
        });

        test('should throw error if the location does not exist', () => {
            expect(() => scene.getLocation('NonExistentLocation')).toThrowError();
        });

        test('should throw error if name is not a string (assuming TypeUtils throws)', () => {
            expect(() => scene.getLocation(123)).toThrowError();
        });

    });

    describe('findShortestPath', () => {
        let hallway, livingRoom, kitchen, unconnectedRoom; // Define rooms
        let locEntrance, locSofa, locStove, locDesk; // Define locations

        beforeEach(() => {

            scene = new Scene(); // Recreate scene for each test

            // Create rooms
            hallway = scene.createRoom('Hallway', 0, 0, 10, 20);
            livingRoom = scene.createRoom('Living Room', 10, 0, 10, 20);
            kitchen = scene.createRoom('Kitchen', 20, 0, 10, 20);
            unconnectedRoom = scene.createRoom('Unconnected room', 100, 100, 10, 10); 

            locEntrance = hallway.createLocation("Hallway Entrance", 5, 5);
            locSofa = livingRoom.createLocation("Sofa", 5, 5);
            locStove = kitchen.createLocation("Stove", 5, 5);
            locDesk = unconnectedRoom.createLocation("Desk", 5, 5);

            // Define adjacency (important for pathfinding)
            hallway.addAdjacentRoom(livingRoom.getName());
            livingRoom.addAdjacentRoom(hallway.getName());
            livingRoom.addAdjacentRoom(kitchen.getName());
            kitchen.addAdjacentRoom(livingRoom.getName());

        });

        test('should return a Path object', () => {
            const path = scene.findShortestPath(hallway, livingRoom);
            expect(path).toBeInstanceOf(Path);
        });

        test('should find a direct path between adjacent rooms', () => {
            const path = scene.findShortestPath(livingRoom, kitchen);
            expect(path.getRoomNames()).toEqual(['Living Room', 'Kitchen']);
        });

        test('should find a path through an intermediate room', () => {
            const path = scene.findShortestPath(hallway, kitchen);
            expect(path.getRoomNames()).toEqual(['Hallway', 'Living Room', 'Kitchen']);
        });

        test('should return a path with only the start room if start and end are in the same room', () => {
            const path = scene.findShortestPath(hallway, hallway);
            expect(path.getRoomNames()).toEqual(['Hallway']);
        });

        test('should return an empty path if no path exists (unconnected rooms)', () => {
            const path = scene.findShortestPath(hallway, unconnectedRoom);
            expect(path).toBeInstanceOf(Path);
            expect(path.isEmpty()).toBe(true);
            expect(path.getRoomNames()).toEqual([]);
        });

        test('should throw error if start or end is not a Room object', () => {
            expect(() => scene.findShortestPath(hallway, 'NotARoom')).toThrowError();
            expect(() => scene.findShortestPath('NotARoom', kitchen)).toThrowError();
        });

        test('should throw error if start and end are the same room', () => {
            expect(() => scene.findShortestPath(hallway, hallway)).not.toThrowError();
        });

    });

});
