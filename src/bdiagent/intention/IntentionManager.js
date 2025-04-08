import { TypeUtils } from "../../internal.js";
import { Intention } from "../../internal.js";
import { IntentionFactory } from "../../internal.js";
import { Agent } from "../../internal.js";

/**
 * IntentionManager class
 * Manages the intentions of the agent.
 */
export class IntentionManager {

    /**
       * A constant representing a null location.
       */
    static NULL_INTENTION = IntentionFactory.createNullIntention();

    /**
     * Constructor for the IntentionManager class.
     */
    constructor() {
        this.intentions = [];
        this.currentIntention = IntentionManager.NULL_INTENTION;
    }

    /**
     * Adds an intention to the agent's list of intentions.
     * 
     * @param {Intention} intention The intention to add to the agent.
     */
    addIntention(intention) {
        TypeUtils.ensureInstanceOf(intention, Intention);
        this.intentions.push(intention);
    }

    /**
     * Retrieves the agent's current intention.
     *
     * @returns {Intention | null} The agent's current intention, or null if there is none.
     */
    getCurrentIntention() {
        return this.currentIntention;
    }

    /**
     * Determines the agent's current intention based on its desires and intentions.
     *
     * @param {Agent} agent The agent whose intentions are being managed.
     * @param {Desire} desire The best desire to consider for intention selection.
     */
    update(agent, desire) {
        TypeUtils.ensureInstanceOf(agent, Agent);

        //  if no desire is defined, set null intention
        if (!desire) {
            this.currentIntention = IntentionManager.NULL_INTENTION;
            return;
        }

        // find the intention that corresponds to the best desire - found by name
        this.currentIntention = this.intentions.find(
            (intention) => intention.name === desire.name && intention.canExecute(agent)
        );

        // if no intentions where found, set the null intention        
        if (!this.currentIntention) {
            this.currentIntention = IntentionManager.NULL_INTENTION;
        }
    }

    /**
     * Executes the current intention of the agent.
     *
     * @param {Agent} agent The agent whose intention is being executed.
     * @returns {boolean} True if the intention was executed successfully, false otherwise.
     */
    executeCurrentIntention(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.currentIntention.execute(agent);
    }
}