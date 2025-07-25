import { BeliefUpdateComponent } from '../internal.js';

/**
 * A component specifying the rate at which dental hygiene changes.
 * A positive rate could mean it gets worse, a negative rate could mean it improves.
 */
export class DentalHygieneUpdateComponent extends BeliefUpdateComponent {
    /**
     * @param {number} rate The rate at which dental hygiene changes per second.
     */
    constructor(rate) {
        super(rate);
    }
}