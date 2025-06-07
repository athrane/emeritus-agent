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
     * @param {Desire} desire The desire to add to the agent.
     * @throws {TypeError} If the desire is not an instance of Desire.
     * @throws {Error} If a desire with the same name already exists.
     */
    addDesire(desire) {
        TypeUtils.ensureInstanceOf(desire, Desire);
        if (this.hasDesire(desire.name)) {
            throw new Error(`Desire with name '${desire.name}' already exists.`);
        }
        this.desires.push(desire);
    }

    /**
     * Returns true if the agent has a desire with the given name.
     * @param {string} name The name of the desire to check. the lookup is case-sensitive. 
     * @returns {boolean} True if the agent has the desire, false otherwise.
     */
    hasDesire(name) {
        TypeUtils.ensureString(name);
        if (name.length === 0) return false; 
        name = name.toLowerCase(); 
        return this.desires.some(desire => desire.name === name);
    }

    /**
     * Retrieves all desires of the agent.
     *
     * @returns {Desire[]} An array of all desires the agent has.
     */
    getDesires() {
        return this.desires;
    }
    
    /**
     * Retrieves the agent's active desires.
     *
     * @returns {Desire[]} An array of active desires that are currently satisfied.
     */
    getActiveDesires() {
        return this.activeDesires;
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

        // get active desires 
        const activeDesires = this.desires.filter(desire => desire.isActive(agent));

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