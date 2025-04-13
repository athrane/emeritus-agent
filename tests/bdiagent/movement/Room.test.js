import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room('Living Room');
  });

  test('should initialize with a name, empty locations, and empty adjacent rooms', () => {
    expect(room.name).toBe('Living Room');
    expect(room.locations).toEqual([]);
    expect(room.adjacentRooms).toEqual([]);
  });

  test('should add a location to the room', () => {
    const location = new Location('Corner', 1, 2);
    room.addLocation(location);
    expect(room.locations).toContain(location);
  });

  test('should check if a location is in the room', () => {
    const location = new Location('Corner', 1, 2);
    room.addLocation(location);
    const anotherLocation = new Location('Center', 3, 4);
    expect(room.hasLocation(location)).toBe(true);
    expect(room.hasLocation(anotherLocation)).toBe(false);
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