import { Belief } from './Belief.js'; // Assuming Belief is in the same directory

/**
 * Belief which holds integer percentage values between 0 and 100.
 * Values are automatically clamped to this range.
 */
export class IntegerPercentageBelief extends Belief {
  constructor(name, value) {
    super(name, self.clampPercentage(value));
  }

  update(newValue) {
    super.update(this.clampPercentage(newValue));
  }

  increase(amount) {
    super.update(this.clampPercentage(this.value + amount));
  }

  decrease(amount) {
    super.update(this.clampPercentage(this.value - amount));
  }

  setValue(newValue) {
    this.update(newValue);
  }

  /**
   * Clamps the given value to ensure it's within the 0-100 range.
   * @param {number} value The value to clamp.
   * @returns {number} The clamped value.
   * @private
   */
  static clampPercentage(value) {
    if (value > 100) {
      return 100;
    } else if (value < 0) {
      return 0;
    }
    return Math.round(value); // Ensure integer
  }
}