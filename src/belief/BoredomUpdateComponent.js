import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which boredom increases.
 */
export class BoredomUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which boredom increases per second.
     */
    constructor(rate) {
        super(rate);
    }
}