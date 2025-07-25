import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which hunger increases.
 */
export class HungerUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which hunger increases per second.
     */
    constructor(rate) {
        super(rate);
    }
}