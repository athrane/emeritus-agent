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
            30 // Priority
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
            40 // Priority
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
            4 // Priority
        );
    }

    /**
     * Creates a "Dental Hygiene" desire.
     * @returns {Desire} A desire for the agent to maintain dental hygiene.
     */
    static createDentalHygieneDesire() {
        return new Desire(
            "Dental Hygiene",
            (agent) => agent.getBelief("Dental Hygiene").getValue() > 80, // Condition for activation
            20 // Priority (adjust as needed)
        );
    }

    /**
     * Creates a "Body Hygiene" desire.
     * @returns {Desire} A desire for the agent to maintain body hygiene.
     */
    static createBodyHygieneDesire() {
        return new Desire(
            "Body Hygiene",
            (agent) => agent.getBelief("Body Hygiene").getValue() > 80, // Condition for activation
            20 // Priority (adjust as needed)
        );
    }

    /**
     * Creates a "Vesicular Distention" desire.
     * @returns {Desire} A desire for the agent to perform vesicular distention.
     */
    static createVesicularDistentionDesire() {
        return new Desire(
            "Vesicular Distention",
            (agent) => agent.getBelief("Vesicular Distention").getValue() > 80, // Condition for activation
            50 // Priority (adjust as needed)
        );
    }

    /**
     * Creates a "Hand Hygiene" desire.
     * @returns {Desire} A desire for the agent to maintain hand hygiene.
     */
    static createHandHygieneDesire() {
        return new Desire(
            "Hand Hygiene",
            (agent) => agent.getBelief("Hand Hygiene").getValue() > 70, // Condition for activation
            20 // Priority (adjust as needed)
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