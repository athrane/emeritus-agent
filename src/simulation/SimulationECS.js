import { Entities } from '../internal.js';
import { Systems } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Orchestrates an Entity-Component-System (ECS) based simulation.
 * Manages all entities and systems, and drives the main simulation loop.
 */
export class SimulationECS {
  /**
   * @type {Entities}
   */
  #entities;

  /**
   * @type {Systems}
   */
  #systems;

  /**
   * Creates a new SimulationECS instance.
   */
  constructor() {
    this.#entities = new Entities();
    this.#systems = new Systems();
  }

  /**
   * Gets the entity manager.
   * @returns {Entities} The manager for all entities.
   */
  getEntities() {
    return this.#entities;
  }

  /**
   * Gets the system manager.
   * @returns {Systems} The manager for all systems.
   */
  getSystems() {
    return this.#systems;
  }

  /**
   * Advances the simulation by one step.
   * @param {number} deltaTime - The time elapsed since the last update, in milliseconds.
   */
  update(deltaTime) {
    TypeUtils.ensureNumber(deltaTime);
    this.#systems.update(this.#entities, deltaTime);
  }
}