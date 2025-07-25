import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of needing to urinate.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class UrinationBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial urination need level (0-100).
     */
    constructor(initialValue = 0) {
        super('Urination', initialValue);
    }
}