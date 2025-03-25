import { TypeUtils } from "../../internal.js";
import { Belief } from '../../internal.js';

/**
 * Belief which holds integer percentage values between 0 and 100.
 * Values are automatically clamped to this range.
 */
export class IntegerPercentageBelief extends Belief {

  /**
   * Creates a new IntegerPercentageBelief.
   * 
   * @param {string} name The name of the belief.
   * @param {number} value The initial value of the belief.
   */
  constructor(name, value) {
    super()
    TypeUtils.ensureString(name);
    TypeUtils.ensureNumber(value);
    this.name = name;
    this.value = IntegerPercentageBelief.clampPercentage(value);
  }

  increase(amount) {
    TypeUtils.ensureNumber(amount);
    this.value = IntegerPercentageBelief.clampPercentage(this.value + amount);
  }

  decrease(amount) {
    TypeUtils.ensureNumber(amount);
    this.value = IntegerPercentageBelief.clampPercentage(this.value - amount);
  }

  getValue() {
    return this.value
  }

  /**
   * Clamps the given value to ensure it's within the 0-100 range.
   * @param {number} value The value to clamp.
   * @returns {number} The clamped value.
   */
  static clampPercentage(value) {
    TypeUtils.ensureNumber(value);
    if (value > 100) {
      return 100;
    } else if (value < 0) {
      return 0;
    }
    return Math.round(value); // Ensure integer
  }
}