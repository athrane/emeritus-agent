
import { Belief } from '../../internal.js';

/**
 * Belief which holds integer values.
 */
export class IntegerBelief extends Belief {
    constructor(name, value) {
        super(name, value);
        if (!Number.isInteger(value)) {
            throw new Error(`Belief value for '${name}' must be an integer.`);
        }
    }

    update(newValue) {
        if (!Number.isInteger(newValue)) {
            throw new Error(`Belief update value for '${this.name}' must be an integer.`);
        }
        this.value = newValue;
    }

    increase(amount) {
        if (!Number.isInteger(amount)) {
            throw new Error(`Increase amount for '${this.name}' must be an integer.`);
        }
        this.value += amount;
    }

    decrease(amount) {
        if (!Number.isInteger(amount)) {
            throw new Error(`Decrease amount for '${this.name}' must be an integer.`);
        }
        this.value -= amount;
    }

    setValue(newValue) {
        this.update(newValue);
    }
    
    getValue() {
        return this.value;
    }
}