import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";

/**
 * Represents a desire of an agent.
 * A desire is a condition that the agent wants to satisfy.
 * It has a name, a condition function that returns true if the desire is active,
 * and a priority level.
 */
export class Desire {
    constructor(name, condition, priority) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureFunction(condition);
        TypeUtils.ensureNumber(priority);
        this.name = name;
        this.condition = condition; // Function that returns true if the desire is active
        this.priority = priority;
    }
    
    /**
     * Checks if the desire is satisfied based on the agent's beliefs.
     * @param {Agent} agent - The agent to check the desire against.
     * @returns {boolean} - True if the desire is satisfied, false otherwise.
     */
    isSatisfied(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.condition(agent);
    }
}