import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = Room.create('Living Room', 0, 0, 10, 10);
  });

  test('should initialize with a name, coordinates, dimensions, empty locations, and empty adjacent rooms', () => {
    expect(room.name).toBe('Living Room');
    expect(room.x).toBe(0);
    expect(room.y).toBe(0);
    expect(room.width).toBe(10);
    expect(room.height).toBe(10);
    expect(room.locations).toEqual([]);
    expect(room.adjacentRooms).toEqual([]);
  });

  test('should add a location to the room', () => {
    const location = Location.create('Corner', 1, 2);
    room.addLocation(location);
    expect(room.locations).toContain(location);
  });

  test('should check if a location is in the room', () => {
    const location = Location.create('Corner', 1, 2);
    room.addLocation(location);
    const anotherLocation = Location.create('Center', 3, 4);
    expect(room.hasLocation(location.name)).toBe(true);
    expect(room.hasLocation(anotherLocation.name)).toBe(false);
  });

  test('should check if upper and lower isnt identical', () => {
    const lowercase = Location.create('corner', 1, 2);
    room.addLocation(lowercase);
    const uppercase = Location.create('CORNER', 1, 2);
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