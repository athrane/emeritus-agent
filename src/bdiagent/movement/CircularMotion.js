import { Motion } from "../../internal.js";
import { TypeUtils } from "../../internal.js";
import { Location } from "../../internal.js";
import { Path } from "../../internal.js";
import { Position } from "../../internal.js";
import { TimeManager } from "../../internal.js";

/**
 * CircularMotion implements continuous circular motion for agents like the Sun.
 * The position is represented as an angle (0 to 2π radians), completing a full circle in one simulation day.
 */
export class CircularMotion extends Motion {

  /**
   * Creates a new CircularMotion instance.
   * @param {Location} initialLocation - The initial location of the agent (center of the circle).
   * @param {number} speed - The angular speed (radians per simulation day).
   * @param {TimeManager} timeManager - The simulation's time manager.
   */
  constructor(initialLocation, speed, timeManager) {
    super();
    TypeUtils.ensureInstanceOf(initialLocation, Location);
    TypeUtils.ensureNumber(speed);
    TypeUtils.ensureInstanceOf(timeManager, TimeManager);

    this.initialLocation = initialLocation;
    this.center = initialLocation.getPhysicalPosition(); // The center of the circular motion
    this.speed = speed;
    this.timeManager = timeManager;
    this.currentRoom = initialLocation.getRoom();

    // Calculate radius from the size of the room where the initial location is placed
    this.radius = Math.min(this.currentRoom.getSize().getX(), this.currentRoom.getSize().getY()) / 2;
    this.position = Position.create(this.radius, 0);
    this.path = Path.createEmpty();
  }

  /**
   * Returns the current speed (angular speed in radians per simulation day).
   */
  getSpeed() {
    return this.speed;
  }

  /**
   * Returns the current (x, y) position on the circle.
   */
  getPosition() {
    return this.position;
  }

  /**
   * Destination is not applicable for circular motion.
   */
  getDestination() {
    return null;
  }

  /**
   * Returns the room where the Sun is currently located.
   * In this model, the Sun is always within a room.
   * @returns {Room} The room where the Sun is located.
   */
  getRoom() {
    return this.initialLocation.getRoom();
  }

  /**
   * Always returns true as the Sun is within a room.
   */
  isWithinRoom() {
    return true;
  }

  /**
   * The Sun is always moving in this model.
   */
  isMoving() {
    return true;
  }

  /**
   * Target position is not defined for circular motion.
   */
  isTargetPositionDefined() {
    return false;
  }

  /**
   * Circular motion does not have a target position to reach.
   */
  canReachTargetPosition() {
    return false;
  }

  /**
   * Target position is not applicable for circular motion.
   */
  getTargetPosition() {
    return null;
  }

  /**
   * The concept of final destination does not apply to circular motion.
   */
  hasReachedFinalDestination() {
    return false;
  }

  /**
   * Path is not defined for circular motion.
   * @returns {Path} An empty path.
   */
  getPath() {
    return this.path;
  }

  /**
   * MoveTo null implementation.
   */
  moveTo(destination) {
    // No-op: CircularMotion does not support moveTo
  }

  /**
   * The Sun is always within reasonable range of its own position.
   */
  isWithinReasonableRange(location) {
    return true;
  }

  /**
   * Update the angle based on the fraction of the day passed.
   */
  update() {
    const fraction = this.timeManager.getFractionOfDayPassed();
    const angle = 2 * Math.PI * fraction;

    // Update the position based on the new angle
    this.position = Position.create(
      this.center.getX() + this.radius * Math.cos(angle),
      this.center.getY() + this.radius * Math.sin(angle)
    );
    return true;
  }
}
