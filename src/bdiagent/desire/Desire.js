import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";

/**
 * The desire class is used to encapsulate the concept of a desire in the BDI (Belief-Desire-Intention) architecture.
 * A desire is a condition that the agent wants to satisfy.
 * 
 * A desire is characterized by:
 * - A name: a string that identifies the desire.
 * - A condition: a function that takes an agent as an argument and returns true if the desire is active.
 * - A priority: a number that indicates the importance of the desire.
 * 
 * Desires are used by the agent to determine its intentions and actions.
 * Desires can be thought of as goals or motivations that the agent has, which it tries to fulfill based on its beliefs and the current state of the world.
 * Desires are evaluated based on the agent's beliefs and can change over time as the agent's state changes.
 *
 * The name is used to identify the desire, and it should be unique among the agent's desires.
 * The name is stored in lowercase to ensure consistency and avoid case sensitivity issues.
 * 
 * The condition function is used to determine if the desire is currently active based on the agent's beliefs.
 * An active desire is one that the agent wants to fulfill at the current time.
 */
export class Desire {
    constructor(name, condition, priority) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureFunction(condition);
        TypeUtils.ensureNumber(priority);
        this.name = name.toLowerCase();
        this.condition = condition; // Function that returns true if the desire is active
        this.priority = priority;
    }

    /**
     * Checks if the desire is active based on the agent's beliefs.
     * 
     * @param {Agent} agent - The agent to check the desire against.
     * @returns {boolean} - True if the desire is active.
     */
    isActive(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.condition(agent);
    }
}