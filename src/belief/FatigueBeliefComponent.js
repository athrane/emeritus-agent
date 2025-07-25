import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of fatigue.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class FatigueBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial fatigue level (0-100).
     */
    constructor(initialValue = 0) {
        super('Fatigue', initialValue);
    }
}