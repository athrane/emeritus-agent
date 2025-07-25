import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which the need to urinate increases.
 */
export class UrinationUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which the need to urinate increases per second.
     */
    constructor(rate) {
        super(rate);
    }
}