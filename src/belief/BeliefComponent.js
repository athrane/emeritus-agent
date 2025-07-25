import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Base component for agent beliefs in an ECS architecture.
 * This component stores the state of a belief, such as its name and value.
 * The logic for updating beliefs is handled by systems.
 */
export class BeliefComponent extends Component {
    /**
     * @param {string} name The name of the belief.
     * @param {number} value The initial value of the belief (typically 0-100).
     */
    constructor(name, value) {
        super();
        TypeUtils.ensureString(name);
        TypeUtils.ensureNumber(value);
        this.name = name;
        this.value = value;
    }

    /**
     * Gets the name of the belief.
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Gets the current value of the belief.
     * @returns {number}
     */
    getValue() {
        return this.value;
    }

    /**
     * Sets the value of the belief.
     * Note: This component does not enforce clamping. Clamping is the
     * responsibility of the system that modifies the value.
     * @param {number} newValue The new value for the belief.
     */
    setValue(newValue) {
        TypeUtils.ensureNumber(newValue);
        this.value = newValue;
    }
}