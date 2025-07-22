import { System } from '../internal.js';
import { Entities } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Manages the registration, lifecycle, and execution of all systems in the ECS.
 * This class orchestrates the logic updates for the simulation.
 */
export class Systems {
  /**
   * @type {System[]}
   */
  #systems = [];

  /**
   * Adds a system to the manager.
   * The order of registration determines the order of execution.
   * @param {System} system - The system instance to add.
   * @throws {Error} If the system is already registered.
   */
  add(system) {
    TypeUtils.ensureInstanceOf(system, System);
    if (this.#systems.includes(system)) {
      throw new Error(`System of type ${system.constructor.name} is already registered.`);
    }
    this.#systems.push(system);
  }

  /**
   * Deletes a system from the manager.
   * @param {System} system - The system instance to delete.
   * @returns {boolean} True if the system was found and deleted, false otherwise.
   */
  delete(system) {
    TypeUtils.ensureInstanceOf(system, System);
    const index = this.#systems.indexOf(system);
    if (index > -1) {
      this.#systems.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Updates all registered systems in the order they were registered.
   * @param {Entities} entitiesManager - The manager holding all entities.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(entitiesManager, deltaTime) {
    TypeUtils.ensureInstanceOf(entitiesManager, Entities);
    TypeUtils.ensureNumber(deltaTime);

    for (const system of this.#systems) {
      system.update(entitiesManager, deltaTime);
    }
  }
}