import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of boredom.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class BoredomBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial boredom level (0-100).
     */
    constructor(initialValue = 0) {
        super('Boredom', initialValue);
    }
}