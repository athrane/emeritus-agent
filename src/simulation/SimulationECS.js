import { Entities, 
  Systems,
  TypeUtils,
  Scene } from '../internal.js';

/**
 * Orchestrates an Entity-Component-System (ECS) based simulation.
 * Manages all entities and systems, and drives the main simulation loop.
 */
export class SimulationECS {
  /**
   * Manager for all entities in the simulation.
   * @type {Entities}
   */
  #entities;

  /**
   * Manager for all systems in the simulation.
   * @type {Systems}
   */
  #systems;

  /**
   * The scene where the simulation takes place.
   * @type {Scene}
   */
  #scene;

  /**
   * Creates a new SimulationECS instance.
   * @param {Scene} scene - The scene where the simulation will occur.
   * @throws {Error} If the provided scene is not an instance of Scene.
   * @throws {TypeError} If the scene parameter is not provided or is not a Scene instance.
   */
  constructor(scene) {
    TypeUtils.ensureInstanceOf(scene, Scene);
    this.#entities = new Entities();
    this.#systems = new Systems();
    this.#scene = scene;
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
   * Gets the scene.
   * @returns {Scene} The scene where the simulation takes place.
   */
  getScene() {
    return this.#scene;
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