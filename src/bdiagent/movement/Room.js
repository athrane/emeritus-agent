import { TypeUtils } from '../../internal.js';
import { Location } from '../../internal.js';
import { Position } from '../../internal.js';

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
   * A constant representing a null room.
   */
  static NULL_ROOM = Room.create("NULL Room (0,0)", Position.create(0, 0), Position.create(0, 0));

  /**
   * Constructor for the Room class.
   *
   * @param {string} name The name of the room.
   * @param {Position} position The Position object representing the position of the room. 
   * @param {Position} size The Position object representing the size of the room (width, height). 
   */
  constructor(name, position, size) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureInstanceOf(position, Position);
    TypeUtils.ensureInstanceOf(size, Position);

    this.name = name;
    this.position = position;
    this.size = size;
    this.locations = [];
    this.adjacentRooms = [];
  }

  /**
   * Gets the position of the room.
   * @returns {Position} The position of the room.
   */
  getPosition() {
    return this.position;
  }

  /**
   * Gets the size of the room.
   * @returns {Position} The size of the room.
   */
  getSize() {
    return this.size;
  }

  /**
   * Gets the name of the room.
   * @returns {string} The name of the room.
   */
  getName() {
    return this.name;
  }

  /**
   * Creates a new location and adds it to the specified room.
   *
   * @param {string} name The name of the location.
   * @param {number} x The x-coordinate of the location. Coordinate is relative to the room.
   * @param {number} y The y-coordinate of the location. Coordinate is relative to the room.
   * @returns {Location} The created Location object.
   */
  createLocation(name, x, y) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureNumber(x);
    TypeUtils.ensureNumber(y);

    // throw error if location name is empty
    if (name.trim() === '') {
      throw new Error('Location name cannot be empty');
    }

    // throw error if location already exists
    if (this.hasLocation(name)) {
      throw new Error(`Location ${name} already exists in room ${this.name}`);
    }

    // check if the location is within the room bounds (relative coordinates)
    if (!this.isWithinBounds(x, y)) {
      const roomWidth = this.size.getX();
      const roomHeight = this.size.getY();
      throw new Error(`Location '${name}' relative coordinates (${x}, ${y}) are outside the room's relative boundaries [(0, 0) to (${roomWidth}, ${roomHeight})] for room ${this.name}`);
    }

    // create location        
    const position = Position.create(x, y);
    const location = Location.create(name, position);

    // add location to the room
    this.locations.push(location);
    return location;
  }

  /**
   * Checks if the given relative coordinates are within the room's boundaries (size).
   * Coordinates are relative to the room's origin (0,0).
   * @param {number} relativeX The x-coordinate relative to the room's origin.
   * @param {number} relativeY The y-coordinate relative to the room's origin.
   * @returns {boolean} True if the coordinates are within bounds, false otherwise.
   * @private // Keep as internal helper
   */
  isWithinBounds(relativeX, relativeY) {
    // Coordinates are relative, so the lower bound is always 0
    const minX = 0;
    const minY = 0;
    // The upper bound is the size of the room (inclusive)
    const maxX = this.size.getX();
    const maxY = this.size.getY();

    // Ensure the provided relative coordinates fall within the 0 to size range
    return relativeX >= minX && relativeX <= maxX && relativeY >= minY && relativeY <= maxY;
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
   * Gets a location by its name. 
   * 
   * @param {string} locationName The name of the location to get.
   * @returns {Location} The Location object, or undefined if not found.
   * @throws {Error} If the location is not found.
   */
  getLocation(locationName) {
    TypeUtils.ensureString(locationName);

    // throw error if location doesn't exists
    if (!this.hasLocation(locationName)) {
      throw new Error(`Location ${locationName} not found in room ${this.name}`);
    }
    // return location
    return this.locations.find(loc => loc.name === locationName);
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
   * Get ajacent rooms.
   * 
   * @returns {Array<string>} The list of adjacent room names.
   */
  getAdjacentRooms() {
    return this.adjacentRooms;
  }

  /**
    * Creates a new Room object.
    *
    * @param {string} name The name of the room.
    * @param {Position} position The Position object representing the position of the room. The room takes a copy of the position.
    * @param {Position} size The Position object representing the size of the room (width, height). The room takes a copy of the size.
    * @returns {Room} A new Room object.   
    */
  static create(name, position, size) {
    return new Room(name, position, size);
  }

  /**
   * Creates a null room with coordinates (0,0) and size (0,0).
   * 
   * @returns {Room} A Room instance representing a null room.
   */
  static createNullRoom() {
    return this.NULL_ROOM;
  }  

}