import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * A component that gives an entity a name.
 * This is a data-only class, as per ECS principles.
 */
export class NameComponent extends Component {
  /**
   * The name of the entity.
   * @type {string}
   */
  #name;

  /**
   * Creates an instance of NameComponent.
   * @param {string} name - The name for the entity.
   * @throws {TypeError} If the name is not a non-empty string.
   */
  constructor(name) {
    super();
    TypeUtils.ensureString(name);
    if (name.trim() === '') {
      throw new Error('Name cannot be an empty string.');
    }
    this.#name = name;
  }

  /**
   * Gets the name of the entity.
   * @returns {string} The name.
   */
  getName() {
    return this.#name;
  }
}