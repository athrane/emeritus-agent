import { TypeUtils } from "../internal.js";
import { Agent } from "../internal.js";

/**
 * The Desire2 class encapsulates a desire in the BDI (Belief-Desire-Intention) architecture.
 * A desire is a condition that the agent wants to satisfy.
 *
 * A desire is characterized by:
 * - A name: a string that identifies the desire.
 * - A condition: a function that takes an agent as an argument and returns true if the desire is active.
 * - A priority: a function that takes an agent as an argument and returns an integer indicating the importance of the desire.
 *
 * The priority can be dynamic based on the agent's state, allowing for more nuanced decision-making.
 */
export class Desire2 {
    /**
     * @param {string} name The name of the desire.
     * @param {function(Agent): boolean} condition A function that returns true if the desire is active.
     * @param {function(Agent): number} priorityFn A function that returns the desire's priority.
     */
    constructor(name, condition, priorityFn) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureFunction(condition);
        TypeUtils.ensureFunction(priorityFn);
        this.name = name;
        this.condition = condition;
        this.priorityFn = priorityFn;
    }

    /**
     * Gets the name of the desire.
     *
     * @returns {string} - The name of the desire.
     */
    getName() {
        return this.name;
    }

    /**
     * Gets the condition function of the desire.
     *
     * @returns {function(Agent): boolean} - The condition function that checks if the desire is active.
     */
    getCondition() {
        return this.condition;
    }

    /**
     * Gets the priority function of the desire.
     *
     * @returns {function(Agent): number} - The function that calculates the priority.
     */
    getPriorityFunction() {
        return this.priorityFn;
    }

    /**
     * Calculates the priority of the desire for a given agent.
     *
     * @param {Agent} agent - The agent to calculate the priority for.
     * @returns {number} - The integer priority of the desire.
     */
    getPriority(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        const priorityValue = this.priorityFn(agent);
        TypeUtils.ensureNumber(priorityValue);
        return Math.round(priorityValue);
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