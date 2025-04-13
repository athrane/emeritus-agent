import { TypeUtils } from '../../internal.js';
import { Location } from '../../internal.js';

/**
 * Represents a room and its properties.
 */
export class Room {

  /**
   * Constructor for the Room class.
   *
   * @param {string} name The name of the room.
   */
  constructor(name) {
    TypeUtils.ensureString(name);
    this.name = name;
    this.locations = [];
    this.adjacentRooms = [];
  }

  /**
   * Adds a location to the room.
   *
   * @param {Location} location The location to add.
   */
  addLocation(location) {
    TypeUtils.ensureInstanceOf(location, Location);
    this.locations.push(location);
  }

  /**
   * Checks if a location is in the room.
   *
   * @param {Location} location The location to check.
   * @returns {boolean} True if the location is in the room, false otherwise.
   */
  hasLocation(location) {
    TypeUtils.ensureInstanceOf(location, Location);
    return this.locations.some(
      (loc) => loc.x === location.x && loc.y === location.y && loc.name === location.name
    );
  }

  /**
   * Adds an adjacent room to the room.
   *
   * @param {string} roomName The name of the adjacent room.
   */
  addAdjacentRoom(roomName) {
    TypeUtils.ensureString(roomName);
    if (!this.adjacentRooms.includes(roomName)) {
      this.adjacentRooms.push(roomName);
    }
  }

  /**
   * Checks if a room is adjacent to this room.
   *
   * @param {string} roomName The name of the room to check.
   * @returns {boolean} True if the room is adjacent, false otherwise.
   */
  isAdjacent(roomName) {
    TypeUtils.ensureString(roomName);
    return this.adjacentRooms.includes(roomName);
  }
}