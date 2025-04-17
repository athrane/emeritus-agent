import { TypeUtils } from '../../internal.js';
import { Location } from '../../internal.js';

/**
 * Represents a Room in the simulation.
 * A room is defined by its name, coordinates (x, y), dimensions (width, height),
 * a list of locations, and a list of adjacent rooms.
 * The room is mutable.
 * The coordinates are defined by the upper left corner of the room.
 * The dimensions are defined by the width and height of the room.
 * The room can contain multiple locations and can be adjacent to other rooms.
 */
export class Room {

  /**
   * Constructor for the Room class.
   *
   * @param {string} name The name of the room.
   * @param {number} x The x-coordinate of the room.
   * @param {number} y The y-coordinate of the room.
   * @param {number} width The width of the room.
   * @param {number} height The height of the room.
   */
  constructor(name, x, y, width, height) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureNumber(x);
    TypeUtils.ensureNumber(y);
    TypeUtils.ensureNumber(width);
    TypeUtils.ensureNumber(height);

    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.locations = [];
    this.adjacentRooms = [];
  }

  /**
   * Gets the x-coordinate of the room.
   * @returns {number} The x-coordinate.
   */
  getX() {
    return this.x;
  }

  /**
   * Gets the y-coordinate of the room.
   * @returns {number} The y-coordinate.
   */
  getY() {
    return this.y;
  }

  /**
   * Gets the width of the room.
   * @returns {number} The width.
   */
  getWidth() {
    return this.width;
  }

  /**
   * Gets the height of the room.
   * @returns {number} The height.
   */
  getHeight() {
    return this.height;
  }

  /**
   * Gets the name of the room.
   * @returns {string} The name of the room.
   */
  getName() {
    return this.name;
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
   * @param {locationName} location The location name to check.
   * @returns {boolean} True if a location with the name is in the room, false otherwise.
   */
  hasLocation(locationName) {
    TypeUtils.ensureString(locationName);
    return this.locations.some(loc => loc.name === locationName);
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

  /**
    * Creates a new Room object.
    *
    * @param {string} name The name of the room.
    * @param {number} x The x-coordinate of the room.
    * @param {number} y The y-coordinate of the room.
    * @param {number} width The width of the room.
    * @param {number} height The height of the room.
    * @returns {Room} A new Room object.   
    */
  static create(name, x, y, width, height) {
    return new Room(name, x, y, width, height);
  }

}