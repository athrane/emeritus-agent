import { Component } from '../internal.js';
import { Position } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * A component that gives an entity a position in the world.
 * This is a data-only class, as per ECS principles.
 */
export class PositionComponent extends Component {
  /**
   * The position of the entity.
   * @type {Position}
   */
  #position;

  /**
   * Creates an instance of PositionComponent.
   * @param {Position} position - The position for the entity.
   * @throws {TypeError} If the position is not an instance of Position.
   */
  constructor(position) {
    super();
    TypeUtils.ensureInstanceOf(position, Position);
    this.#position = position;
  }

  /**
   * Gets the current position of the entity.
   * @returns {Position} The entity's position.
   */
  getPosition() {
    return this.#position;
  }

  /**
   * Updates the position of the entity with a new immutable Position object.
   * @param {Position} newPosition - The new position for the entity.
   */
  setPosition(newPosition) {
    TypeUtils.ensureInstanceOf(newPosition, Position);
    this.#position = newPosition;
  }
}