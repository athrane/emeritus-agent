import { Room } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";

describe('Room', () => {
  let room;

  beforeEach(() => {
    const position = Position.create(0, 0);
    const size = Position.create(10, 10);
    room = new Room.create('Living Room', position, size);
  });

  describe('create', () => {
    it('should create a new room with the given name, position, and size', () => {
      const position = Position.create(1, 2);
      const size = Position.create(3, 4);
      const newRoom = Room.create('Kitchen', position, size);
      expect(newRoom).toBeInstanceOf(Room);
      expect(newRoom.name).toBe('Kitchen');
      expect(newRoom.getPosition().getX()).toBe(1);
      expect(newRoom.getPosition().getY()).toBe(2);
      expect(newRoom.getSize().getX()).toBe(3);
      expect(newRoom.getSize().getY()).toBe(4);
      expect(newRoom.locations).toEqual([]);
      expect(newRoom.adjacentRooms).toEqual([]);
    });

    it('should throw an error if the name is not a string', () => {
      const position = Position.create(1, 2);
      const size = Position.create(3, 4);
      expect(() => Room.create(123, position, size)).toThrowError();
    });

    it('should throw an error if the position is not a Position object', () => {
      const size = Position.create(3, 4);
      expect(() => Room.create('Kitchen', 'invalid', size)).toThrowError();
    });

    it('should throw an error if the size is not a Position object', () => {
      const position = Position.create(1, 2);
      expect(() => Room.create('Kitchen', position, 'invalid')).toThrowError();
    });

  });

  describe('createNullRoom', () => {
    it('should create a null room with the name "NULL Room (0,0)" and size (0,0)', () => {
      const nullRoom = Room.createNullRoom();
      expect(nullRoom).toBeInstanceOf(Room);
      expect(nullRoom.name).toBe('NULL Room (0,0)');
      expect(nullRoom.getPosition().getX()).toBe(0);
      expect(nullRoom.getPosition().getY()).toBe(0);
      expect(nullRoom.getSize().getX()).toBe(0);
      expect(nullRoom.getSize().getY()).toBe(0);
      expect(nullRoom.locations).toEqual([]);
      expect(nullRoom.adjacentRooms).toEqual([]);
    });
  });

  describe('addAdjacentRoom', () => {

    it('should add an adjacent room', () => {
      room.addAdjacentRoom('Kitchen');
      expect(room.adjacentRooms).toContain('Kitchen');
    });

    it('should not add duplicate adjacent rooms', () => {
      room.addAdjacentRoom('Kitchen');
      room.addAdjacentRoom('Kitchen');
      expect(room.adjacentRooms).toEqual(['Kitchen']);
    });

    it('should check if a room is adjacent', () => {
      room.addAdjacentRoom('Kitchen');
      expect(room.isAdjacent('Kitchen')).toBe(true);
      expect(room.isAdjacent('Bathroom')).toBe(false);
    });
  });

  describe('createLocation', () => {
    it('should create a new location and add it to the room', () => {
      const location = room.createLocation('Corner', 1, 2);

      expect(location).toBeInstanceOf(Location);
      expect(location.getName()).toBe('Corner');
      expect(location.getPosition().getX()).toBe(1);
      expect(location.getPosition().getY()).toBe(2);
      expect(room.hasLocation('Corner')).toBe(true);
    });

    it('should check if a location is in the room', () => {
      const location = room.createLocation('Corner', 1, 2);
      expect(room.hasLocation(location.getName())).toBe(true);
    });

    it('should throw an error if the location already exists', () => {
      room.createLocation('Corner', 1, 2);
      expect(() => room.createLocation('Corner', 3, 4)).toThrowError();
    });

    it('should accept room names with upper and lower case names as different', () => {
      room.createLocation('corner', 1, 2);
      room.createLocation('CORNER', 3, 4);
      expect(room.hasLocation('corner')).toBe(true);
      expect(room.hasLocation('CORNER')).toBe(true);
      expect(room.hasLocation('Corner')).toBe(false);
    });

    it('should throw an error if the location name is not a string', () => {
      expect(() => room.createLocation(123, 1, 2)).toThrowError();
    });

    it('should throw an error if the coordinates are not numbers', () => {
      expect(() => room.createLocation('Corner', '1', 2)).toThrowError();
      expect(() => room.createLocation('Corner', 1, '2')).toThrowError();
    });

    it('should throw an error if the location name is empty', () => {
      expect(() => room.createLocation('', 1, 2)).toThrowError();
    });

    it('should throw an error if the location name is null', () => {
      expect(() => room.createLocation(null, 1, 2)).toThrowError();
    });

    it('should throw an error if the location name is undefined', () => {
      expect(() => room.createLocation(undefined, 1, 2)).toThrowError();
    });

    // Inside describe('createLocation', ...) in Room.test.js

    it('should create a location exactly on the room boundaries', () => {
      // Room is 0,0 to 10,10
      expect(() => room.createLocation('TopLeftCorner', 0, 0)).not.toThrow();
      expect(() => room.createLocation('BottomRightCorner', 10, 10)).not.toThrow();
      expect(() => room.createLocation('TopRightCorner', 10, 0)).not.toThrow();
      expect(() => room.createLocation('BottomLeftCorner', 0, 10)).not.toThrow();
      // Clean up created locations if necessary, or use unique names per test run
      // For simplicity here, we assume they don't conflict with other tests or use beforeEach
    });

    it('should throw an error if the location x-coordinate is outside the room boundaries', () => {
      // Room is 0,0 to 10,10
      expect(() => room.createLocation('TooLeft', -1, 5)).toThrowError();
      expect(() => room.createLocation('TooRight', 11, 5)).toThrowError();
    });

    it('should throw an error if the location y-coordinate is outside the room boundaries', () => {
      // Room is 0,0 to 10,10
      expect(() => room.createLocation('TooHigh', 5, -1)).toThrowError();
      expect(() => room.createLocation('TooLow', 5, 11)).toThrowError();
    });

    it('should throw an error if both location coordinates are outside the room boundaries', () => {
      // Room is 0,0 to 10,10
      expect(() => room.createLocation('WayOff', -5, 15)).toThrowError();
    });
  });

  describe('createLocation with non-zero room origin', () => {
    let offsetRoom;

    beforeEach(() => {
      // Create a room at absolute position (50, 50) with size (20, 30)
      const position = Position.create(50, 50);
      const size = Position.create(20, 30); // Relative bounds: (0,0) to (20,30)
      offsetRoom = new Room.create('Offset Room', position, size);
    });

    it('should create locations within the relative boundaries (0,0 to 20,30)', () => {
      expect(() => offsetRoom.createLocation('RelTopLeft', 0, 0)).not.toThrow();
      expect(() => offsetRoom.createLocation('RelBottomRight', 20, 30)).not.toThrow();
      expect(() => offsetRoom.createLocation('RelCenter', 10, 15)).not.toThrow();
      expect(() => offsetRoom.createLocation('RelEdgeX', 20, 10)).not.toThrow();
      expect(() => offsetRoom.createLocation('RelEdgeY', 5, 30)).not.toThrow();
    });

    it('should throw an error for locations outside the relative boundaries (0,0 to 20,30)', () => {
      // Test negative relative coordinates
      expect(() => offsetRoom.createLocation('OutsideNegX', -1, 15)).toThrowError(/outside the room's relative boundaries/);
      expect(() => offsetRoom.createLocation('OutsideNegY', 10, -5)).toThrowError(/outside the room's relative boundaries/);

      // Test coordinates exceeding relative size
      expect(() => offsetRoom.createLocation('OutsidePosX', 21, 15)).toThrowError(/outside the room's relative boundaries/); // x > width (20)
      expect(() => offsetRoom.createLocation('OutsidePosY', 10, 31)).toThrowError(/outside the room's relative boundaries/); // y > height (30)
      expect(() => offsetRoom.createLocation('OutsideBoth', 25, 35)).toThrowError(/outside the room's relative boundaries/);
    });

    it('should use the correct relative boundaries in the error message', () => {
      expect(() => offsetRoom.createLocation('FailX', 21, 15))
        .toThrowError("Location 'FailX' relative coordinates (21, 15) are outside the room's relative boundaries [(0, 0) to (20, 30)] for room Offset Room");
      expect(() => offsetRoom.createLocation('FailY', 10, 31))
        .toThrowError("Location 'FailY' relative coordinates (10, 31) are outside the room's relative boundaries [(0, 0) to (20, 30)] for room Offset Room");
    });
  });

  describe('getAdjacentRooms', () => {
    it('should return an array of adjacent rooms', () => {
      room.addAdjacentRoom('Kitchen');
      room.addAdjacentRoom('Bathroom');
      expect(room.getAdjacentRooms()).toEqual(['Kitchen', 'Bathroom']);
    });

    it('should return an empty array if no adjacent rooms exist', () => {
      expect(room.getAdjacentRooms()).toEqual([]);
    });
  });

});

