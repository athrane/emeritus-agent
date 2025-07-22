/**
 * Abstract base class for systems in an Entity-Component-System (ECS).
 * Systems contain the logic that operates on entities possessing a specific
 * set of components.
 */
export class System {
  /**
   * Constructor for the System class.
   * @throws {Error} If this class is instantiated directly.
   */
  constructor() {
    if (new.target === System) {
      throw new Error("Cannot instantiate abstract class System directly.");
    }
  }

  /**
   * Updates the system, processing all relevant entities.
   * This method must be implemented by subclasses.
   * @param {Entities} entitiesManager - The manager for all entities.
   * @param {number} deltaTime - The time elapsed since the last update.
   * @throws {Error} If the method is not implemented by a subclass.
   */
  update(entitiesManager, deltaTime) {
    throw new Error("System.update() must be implemented by subclasses.");
  }
}