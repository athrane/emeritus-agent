import { Room } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";

describe('Room', () => {
  let room;

  beforeEach(() => {
    const position = Position.create(0, 0);
    const size = Position.create(10, 10);
    room = new Room('Living Room', position, size);
  });

  test('should add a location to the room', () => {
    const position = Position.create(1, 2);
    const location = Location.create('Corner', position);
    room.addLocation(location);
    expect(room.locations).toContain(location);
  });

  test('should check if a location is in the room', () => {
    const position = Position.create(1, 2);
    const location = Location.create('Corner', position);
    room.addLocation(location);
    const position2 = Position.create(3, 4);
    const anotherLocation = Location.create('Center', position2);
    expect(room.hasLocation(location.name)).toBe(true);
    expect(room.hasLocation(anotherLocation.name)).toBe(false);
  });

  test('should not add duplicate locations', () => {
    const position = Position.create(1, 2);
    const location = Location.create('Corner', position);
    room.addLocation(location);
    expect(() => room.addLocation(location)).toThrowError();
  });

  test('should check if upper and lower isnt identical', () => {
    const position = Position.create(1, 2);
    const lowercase = Location.create('Corner', position);
    room.addLocation(lowercase);
    const position2 = Position.create(1, 2);
    const uppercase = Location.create('CORNER', position2);
    expect(room.hasLocation(lowercase.name)).toBe(true);
    expect(room.hasLocation(uppercase.name)).toBe(false);
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

    it('should throw an error if the location already exists', () => {
      room.createLocation('Corner', 1, 2);
      expect(() => room.createLocation('Corner', 3, 4)).toThrowError();
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

  });

});