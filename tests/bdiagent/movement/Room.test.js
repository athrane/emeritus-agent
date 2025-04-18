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

  test('should initialize with a name, coordinates, dimensions, empty locations, and empty adjacent rooms', () => {
    expect(room.name).toBe('Living Room');
    const position = room.getPosition();
    const size = room.getSize();
    expect(position.getX()).toBe(0);
    expect(position.getY()).toBe(0);
    expect(size.getX()).toBe(10);
    expect(size.getY()).toBe(10);
    expect(room.locations).toEqual([]);
    expect(room.adjacentRooms).toEqual([]);
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

  test('should check if upper and lower isnt identical', () => {
    const position = Position.create(1, 2);
    const lowercase = Location.create('Corner', position);
    room.addLocation(lowercase);
    const position2 = Position.create(1, 2);    
    const uppercase = Location.create('CORNER', position2);
    expect(room.hasLocation(lowercase.name)).toBe(true);
    expect(room.hasLocation(uppercase.name)).toBe(false);
  });

  test('should add an adjacent room', () => {
    room.addAdjacentRoom('Kitchen');
    expect(room.adjacentRooms).toContain('Kitchen');
  });

  test('should not add duplicate adjacent rooms', () => {
    room.addAdjacentRoom('Kitchen');
    room.addAdjacentRoom('Kitchen');
    expect(room.adjacentRooms).toEqual(['Kitchen']);
  });

  test('should check if a room is adjacent', () => {
    room.addAdjacentRoom('Kitchen');
    expect(room.isAdjacent('Kitchen')).toBe(true);
    expect(room.isAdjacent('Bathroom')).toBe(false);
  });

});