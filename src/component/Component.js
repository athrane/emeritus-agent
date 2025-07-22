/**
 * Abstract base class for components in an Entity-Component-System (ECS).
 * Components are data containers for entities and should not contain logic.
 */
export class Component {
  /**
   * Constructor for the Component class.
   * @throws {Error} If this class is instantiated directly.
   */
  constructor() {
    if (new.target === Component) {
      throw new Error("Cannot instantiate abstract class Component directly.");
    }
  }
}