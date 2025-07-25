import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which fatigue increases.
 */
export class FatigueUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which fatigue increases per second.
     */
    constructor(rate) {
        super(rate);
    }
}