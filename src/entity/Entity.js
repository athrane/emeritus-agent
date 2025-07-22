import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Represents an entity in an Entity-Component-System (ECS).
 * An entity is a general-purpose object that can have various components attached to it.
 * It acts as a container for components, which hold data.
 */
export class Entity {
  static #nextId = 0;

  /**
   * A unique identifier for the entity.
   * @type {number}
   */
  #id;

  /**
   * @type {Map<Function, Component>}
   */
  #components;

  /**
   * Creates a new Entity and registers the provided components.
   * @param {...Component} components - A list of components to attach to the entity upon creation.
   */
  constructor(...components) {
    this.#id = Entity.#nextId++;
    this.#components = new Map();

    for (const component of components) {
      this.addComponent(component);
    }
  }

  /**
   * Gets the unique identifier of the entity.
   * @returns {number} The entity's ID.
   */
  getId() {
    return this.#id;
  }

  /**
   * Adds a component to the entity. The component's constructor is used as the key.
   * @param {Component} component - The component instance to add.
   * @throws {TypeError} If the argument is not an instance of Component.
   * @throws {Error} If a component of the same type already exists on this entity.
   */
  addComponent(component) {
    TypeUtils.ensureInstanceOf(component, Component);
    const componentType = component.constructor;

    if (this.#components.has(componentType)) {
      throw new Error(`Entity ${this.#id} already has a component of type ${componentType.name}.`);
    }
    this.#components.set(componentType, component);
  }

  /**
   * Retrieves a component of a specific type from the entity.
   * @param {Function} componentType - The class (constructor) of the component to retrieve.
   * @returns {Component | undefined} The component instance, or undefined if not found.
   */
  getComponent(componentType) {
    return this.#components.get(componentType);
  }

  /**
   * Checks if the entity has a component of a specific type.
   * @param {Function} componentType - The class (constructor) of the component to check for.
   * @returns {boolean} True if the entity has the component, false otherwise.
   */
  hasComponent(componentType) {
    return this.#components.has(componentType);
  }

  /**
   * Removes a component of a specific type from the entity.
   * @param {Function} componentType - The class (constructor) of the component to remove.
   * @returns {boolean} True if a component was removed, false otherwise.
   */
  removeComponent(componentType) {
    return this.#components.delete(componentType);
  }
}