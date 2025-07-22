import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * A component that gives an entity a velocity for physics-based movement.
 * This is a data-only class, as per ECS principles.
 */
export class VelocityComponent extends Component {
  /**
   * @type {number}
   */
  #vx;

  /**
   * @type {number}
   */
  #vy;

  /**
   * Creates an instance of VelocityComponent.
   * @param {number} vx - The velocity on the x-axis.
   * @param {number} vy - The velocity on the y-axis.
   */
  constructor(vx = 0, vy = 0) {
    super();
    TypeUtils.ensureNumber(vx);
    TypeUtils.ensureNumber(vy);
    this.#vx = vx;
    this.#vy = vy;
  }

  /**
   * Gets the velocity as an object.
   * @returns {{vx: number, vy: number}}
   */
  getVelocity() {
    return { vx: this.#vx, vy: this.#vy };
  }
}