import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which hand hygiene changes.
 */
export class HandHygieneUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which hand hygiene changes per second.
     */
    constructor(rate) {
        super(rate);
    }
}