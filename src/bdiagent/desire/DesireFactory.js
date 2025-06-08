import { Desire } from "../../internal.js";

/**
 * A factory class for creating desires.
 */ 
export class DesireFactory {

    /**
     * Creates a "Sleep" desire.
     * @returns {Desire} A desire for the agent to sleep.
     */
    static createSleepDesire() {
        return new Desire(
            "Sleep",
            (agent) => agent.getBelief("Fatigue").getValue() > 70, // Condition for activation
            8 // Priority
        );
    }

    /**
     * Creates an "Eat" desire.
     * @returns {Desire} A desire for the agent to eat.
     */
    static createEatDesire() {
        return new Desire(
            "Eat",
            (agent) => agent.getBelief("Hunger").getValue() > 60, // Condition for activation
            7 // Priority
        );
    }

    /**
     * Creates a "Entertain" desire.
     * @returns {Desire} A desire for the agent to entertain itself.
     */
    static createEntertainDesire() {
        return new Desire(
            "Entertain",
            (agent) => agent.getBelief("Boredom").getValue() > 50, // Condition for activation
            5 // Priority
        );
    }

    /**
     * Creates a "SitIdle" desire.
     * @returns {Desire} A desire for the agent to sit idle.
     */
    static createSitIdleDesire() {
        return new Desire(
            "Sit Idle",
            (agent) => true,  // Condition is always true, so it will always activate
            3 // Priority
        );
    }

    /**
     * Creates a "Null" desire.
     * This is used as a placeholder when no other desires are applicable.
     * @returns {Desire} A null desire.
     */
    static createNullDesire() {
        return new Desire(
            "NullDesire",
            (agent) => false, // Condition is always false, so it won't activate
            0 // Lowest priority
        );
    }
}