import { TypeUtils } from "../../internal.js";
import { BeliefUpdater } from "../../internal.js";
import { IntegerPercentageBelief } from '../../internal.js';
import { Agent } from "../../internal.js";

/**
 * BeliefUpdater for IntegerPercentageBeliefs, ensuring values stay within 0-100 range.
 */
export class IntegerPercentageBeliefUpdater extends BeliefUpdater {

    /**
 * Updates a belief in the agent.
 * @param {IntegerPercentageBelief} belief The belief to update.
 * @param {any} value The new value for the belief.
 */
    IntegerPercentageBeliefUpdater(belief, value) {
        TypeUtils.ensureInstanceOf(belief, IntegerPercentageBelief);
        //TypeUtils.ensureNumber(value);
        this.belief = belief;
        this.value = value;

        console.log(`belief= ${this.belief}   `);
        console.log(`value= ${this.value}   `);
    }

    /**
     * Updates a belief in the agent.
     * @param {Agent} agent The agent whose belief needs to be updated.
     */
    update(agent) {
        console.log(`updating belief= ${this.belief}   `);
        this.belief.increase(this.value);
    }

}
