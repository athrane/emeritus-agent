import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which body hygiene changes.
 */
export class BodyHygieneUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which body hygiene changes per second.
     */
    constructor(rate) {
        super(rate);
    }
}