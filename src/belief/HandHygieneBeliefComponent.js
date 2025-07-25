import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of hand hygiene.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class HandHygieneBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial hand hygiene level (0-100).
     */
    constructor(initialValue = 0) {
        super('Hand Hygiene', initialValue);
    }
}