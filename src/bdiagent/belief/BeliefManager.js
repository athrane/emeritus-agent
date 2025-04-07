import { TypeUtils } from "../../internal.js";
import { Belief } from "../../internal.js";
import { BeliefUpdater } from "../../internal.js";
import { Agent } from "../../internal.js";

/**
 * Represents a belief management system for an agent.
 * An agent has beliefs and can update them using BeliefUpdaters.
 */
export class BeliefManager {

    /**
     * Constructor for the BeliefManager class.
     * 
     * @param {Agent} agent The agent to which this belief manager belongs.
     * @throws {Error} If the provided agent is not an instance of the Agent class.
     */
    constructor(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        this.agent = agent; // Keep a reference to the agent
        this.beliefs = [];
        this.beliefUpdaters = [];
    }

    /**
     * Adds a belief to the agent's list of beliefs.
     * 
     * @param {Belief} belief The belief to add.
     * @throws {Error} If the provided belief is not an instance of the Belief class.
     */
    addBelief(belief) {
        TypeUtils.ensureInstanceOf(belief, Belief);
        this.beliefs.push(belief);
    }

    /**
     * Retrieves a belief by its name.
     * 
     * @param {string} name The name of the belief to retrieve.
     * @returns {Belief | undefined} The belief object if found, otherwise undefined.
     * @throws {Error} If the provided name is not a string.
     */
    getBelief(name) {
        TypeUtils.ensureString(name);
        return this.beliefs.find(belief => belief.name === name);
    }

    /**
     * Registers a belief updater to the belief manager.
     * 
     * @param {BeliefUpdater} beliefUpdater The belief updater to register.
     * @throws {Error} If the provided beliefUpdater is not an instance of the BeliefUpdater class.
     */
    registerBeliefUpdater(beliefUpdater) {
        TypeUtils.ensureInstanceOf(beliefUpdater, BeliefUpdater);
        this.beliefUpdaters.push(beliefUpdater);
    }

    /**
     * Updates the beliefs of the agent using the registered belief updaters.
     * 
     * @throws {Error} If no belief updaters are registered.
     */ 
    update() {
        this.beliefUpdaters.forEach(bu => {
            bu.update(this.agent); // Use the agent reference
        });
    }
};