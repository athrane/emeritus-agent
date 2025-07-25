import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Base component for defining how a belief should be updated over time.
 * This component holds the rate of change for a corresponding belief.
 */
export class BeliefUpdateComponent extends Component {
    /**
     * @param {number} value The value to be used for updating a belief (e.g., rate of increase per second).
     */
    constructor(value) {
        super();
        TypeUtils.ensureNumber(value);
        this.value = value;
    }

    /**
     * Gets the update value.
     * @returns {number}
     */
    getValue() {
        return this.value;
    }
}