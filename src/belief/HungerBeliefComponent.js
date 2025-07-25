import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of hunger.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class HungerBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial hunger level (0-100).
     */
    constructor(initialValue = 0) {
        super('Hunger', initialValue);
    }
}