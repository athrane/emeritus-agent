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
   * @param {number} x The x-coordinate of the room. Coordinate defined upper left corner.
   * @param {number} y The y-coordinate of the room. Coordinate defined upper left corner.
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

    // check if the location is within the room bounds
    if (!this._isWithinBounds(x, y)) {
        throw new Error(`Location coordinates (${x}, ${y}) are outside the room boundaries for room ${this.name}`);
    }

    // create location        
    const position = Position.create(x, y);
    const location = Location.create(name, position);

    // add location to the room
    this.locations.push(location);
    return location;
  }

  // Inside Room.js class
  
  /**
   * Checks if the given coordinates are within the room's boundaries.
   * @param {number} x The x-coordinate to check.
   * @param {number} y The y-coordinate to check.
   * @returns {boolean} True if the coordinates are within bounds, false otherwise.
   * @private
   */
  _isWithinBounds(x, y) {
      const roomMinX = this.position.getX();
      const roomMinY = this.position.getY();
      const roomMaxX = roomMinX + this.size.getX();
      const roomMaxY = roomMinY + this.size.getY();
  
      return x >= roomMinX && x <= roomMaxX && y >= roomMinY && y <= roomMaxY;
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
    * @param {Position} position The Position object representing the position of the room. The room takes a copy of the position.
    * @param {Position} size The Position object representing the size of the room (width, height). The room takes a copy of the size.
    * @returns {Room} A new Room object.   
    */
  static create(name, position, size) {
    return new Room(name, position, size);
  }

}