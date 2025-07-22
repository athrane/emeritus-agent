import { Entity } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Manages the lifecycle and querying of all entities in the ECS.
 * This class acts as a central repository for all entities in the simulation.
 */
export class Entities {
  /**
   * @type {Map<number, Entity>}
   */
  #entities = new Map();

  /**
   * Adds an entity to the manager.
   * @param {Entity} entity - The entity to add.
   * @throws {Error} If an entity with the same ID already exists.
   */
  add(entity) {
    TypeUtils.ensureInstanceOf(entity, Entity);
    const id = entity.getId();
    if (this.#entities.has(id)) {
      throw new Error(`Entity with ID ${id} already exists in the manager.`);
    }
    this.#entities.set(id, entity);
  }

  /**
   * Deletes an entity from the manager.
   * @param {Entity | number} entityOrId - The entity or its ID to delete.
   * @returns {boolean} True if the entity was found and deleted, false otherwise.
   */
  delete(entityOrId) {
    const id = entityOrId instanceof Entity ? entityOrId.getId() : entityOrId;
    TypeUtils.ensureNumber(id);
    return this.#entities.delete(id);
  }

  /**
   * Retrieves an entity by its ID.
   * @param {number} id - The ID of the entity to retrieve.
   * @returns {Entity | undefined} The entity, or undefined if not found.
   */
  get(id) {
    TypeUtils.ensureNumber(id);
    return this.#entities.get(id);
  }

  /**
   * Returns an array of all managed entities.
   * @returns {Entity[]} An array of all entities.
   */
  getAll() {
    return Array.from(this.#entities.values());
  }

  /**
   * Finds all entities that have a given set of components.
   * @param {...Function} componentTypes - The component classes to filter by.
   * @returns {Entity[]} An array of entities that have all the specified components.
   */
  filterByComponents(...componentTypes) {
    const allEntities = this.getAll();
    if (componentTypes.length === 0) {
      return allEntities;
    }

    return allEntities.filter(entity =>
      componentTypes.every(componentType => entity.hasComponent(componentType))
    );
  }
}