import { TypeUtils } from "../../internal.js";

/**
 * Base Belief class.
 */
export class Belief {

  /**
   * Creates a new IntegerPercentageBelief.
   * 
   * @param {string} name The name of the belief.
   * @param {number} value The initial value of the belief.
   */
  constructor(name, value) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureNumber(value);
    this.name = name;
    this.value = value;
  }
  
  getValue() {
    return this.value;
  }

}