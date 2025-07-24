import { Component } from '../internal.js';
import { Scene } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * A component that holds the global simulation scene data.
 * It should be attached to a single "world" or "global" entity.
 */
export class SceneComponent extends Component {
  /**
   * The scene where the simulation takes place.
   * @type {Scene}
   */
  #scene;

  /**
   * Creates an instance of SceneComponent.
   * @param {Scene} scene - The simulation scene.
   */
  constructor(scene) {
    super();
    TypeUtils.ensureInstanceOf(scene, Scene);
    this.#scene = scene;
  }

  /**
   * Gets the scene.
   * @returns {Scene} The scene where the simulation takes place.
   */
  getScene() {
    return this.#scene;
  }
}