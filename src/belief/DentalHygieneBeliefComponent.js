import { BeliefComponent } from '../internal.js';

/**
 * A component representing the belief of dental hygiene.
 * It extends BeliefComponent to provide a specific type for querying.
 */
export class DentalHygieneBeliefComponent extends BeliefComponent {
    /**
     * @param {number} initialValue The initial dental hygiene level (0-100).
     */
    constructor(initialValue = 0) {
        super('Dental Hygiene', initialValue);
    }
}