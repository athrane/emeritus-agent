import { TypeUtils } from "../../internal.js";
import { Desire } from "../../internal.js";
import { Agent } from "../../internal.js";

/**
 * DesireManager class
 * Manages the desires of the agent.
 */
export class DesireManager {
    constructor() {
        this.desires = [];
        this.activeDesires = [];
        this.bestDesire = null;
    }

    /**
     * Adds a desire to the agent's list of desires.
     * 
     * * @param {Desire} desire The desire to add to the agent.
     */
    addDesire(desire) {
        TypeUtils.ensureInstanceOf(desire, Desire);
        this.desires.push(desire);
    }

    /**
     * Retrieves the agent's current best desire.
     *
     * @returns {Desire | null} The agent's current best desire, or null if there is none.
     */
    getCurrentBestDesire() {
        return this.bestDesire;
    }

    /**
       * Determines the agent's current intention based on its desires and intentions.
       * @param {Agent} agent - The agent to check the desire against.
       */
    update(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);

        // get desires 
        const activeDesires = this.desires.filter(desire => desire.isSatisfied(agent));

        // exit if no active desires
        if (activeDesires.length === 0) {
            return;
        }

        // sort the active desires by priority
        this.activeDesires.sort((a, b) => b.priority - a.priority);

        // select the best desire
        this.bestDesire = activeDesires[0];
    }

}