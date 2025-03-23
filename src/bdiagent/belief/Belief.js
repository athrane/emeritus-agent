/**
 * Base Belief class.
 */
export class Belief {
    constructor(name, value) {
      this.name = name;
      this.value = value;
    }
  
    update(newValue) {
      this.value = newValue;
    }
  }