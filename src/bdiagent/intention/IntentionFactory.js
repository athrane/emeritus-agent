import { Intention } from "../../internal.js";

export class IntentionFactory {
    
    /**
     * Creates a new null intention instance.
     */
    static createNullIntention() {
        return new Intention(
            "Null intention", // Name of the intention
            [
                (agent) => {
                    console.log("Doing nothing.");
                }
            ], // Actions to execute
            (agent) => true, // Preconditions (always true for a null intention)
            (agent) => {
                console.log("Null intention completed.");
            } // Effects
        );
    }

    /**
     * Creates a "Sleep" intention.
     * @returns {Intention} An intention for the agent to sleep.
     */
    static createSleepIntention() {
        return new Intention(
            "Sleep",
            [
                (agent) => {
                    console.log("Agent is going to sleep.");
                    agent.getBelief("fatigue").decrease(50);
                    agent.getBelief("hunger").increase(10); // Sleeping might increase hunger a bit
                }
            ],
            (agent) => agent.getBelief("fatigue").getValue() > 70, // Preconditions
            (agent) => {
                console.log("Agent woke up and feels rested.");
            } // Effects
        );
    }

    /**
     * Creates an "Eat" intention.
     * @returns {Intention} An intention for the agent to eat.
     */
    static createEatIntention() {
        return new Intention(
            "Eat",
            [
                (agent) => {
                    console.log("Agent is eating.");
                    agent.getBelief("hunger").decrease(40);
                    agent.getBelief("fatigue").increase(5); // Eating might cause a bit of fatigue
                }
            ],
            (agent) => agent.getBelief("hunger").getValue() > 60, // Preconditions
            (agent) => {
                console.log("Agent finished eating.");
            } // Effects
        );
    }

    /**
     * Creates a "SitIdle" intention.
     * @returns {Intention} An intention for the agent to sit idle.
     */
    static createSitIdleIntention() {
        return new Intention(
            "SitIdle",
            [
                (agent) => {
                    console.log("Agent is sitting idle.");
                    agent.getBelief("boredom").decrease(20);
                    agent.getBelief("hunger").increase(5);
                    agent.getBelief("fatigue").increase(5);
                }
            ],
            (agent) => agent.getBelief("boredom").getValue() > 50, // Preconditions
            (agent) => {
                console.log("Agent is done idling.");
            } // Effects
        );
    }
}