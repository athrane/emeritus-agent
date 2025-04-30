import { Intention } from "../../internal.js";
import { Scene } from "../../internal.js";

export class IntentionFactory {
    
    /**
     * Creates a "Sleep" intention.
     * @param {Scene} scene The scene where the simation takes place.
     * @returns {Intention} An intention for the agent to sleep.
     */
    static createSleepIntention(scene) {
        return new Intention(
            "Sleep",
            [
                (agent) => {
                    //console.log("Agent is going to sleep.");
                    agent.getBelief("fatigue").decrease(50);
                    agent.getBelief("hunger").increase(10); // Sleeping might increase hunger a bit
                }
            ],
            (agent) => agent.getBelief("fatigue").getValue() > 70, // Preconditions
            (agent) => {
                //console.log("Agent woke up and feels rested.");
            }, // Effects
            scene.getLocation("Bed")  
        );
    }

    /**
     * Creates an "Eat" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to eat.
     */
    static createEatIntention(scene) {
        return new Intention(
            "Eat",
            [
                (agent) => {
                    //console.log("Agent is eating.");
                    agent.getBelief("hunger").decrease(40);
                    agent.getBelief("fatigue").increase(5); // Eating might cause a bit of fatigue
                }
            ],
            (agent) => agent.getBelief("hunger").getValue() > 60, // Preconditions
            (agent) => {
                //console.log("Agent finished eating.");
            }, // Effects
            scene.getLocation("Fridge")
        );
    }

    /**
     * Creates a "Entertain" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to entertain itself.
     */
    static createEntertainIntention(scene) {
        return new Intention(
            "Entertain",
            [
                (agent) => {
                    //console.log("Agent is reading.");
                    agent.getBelief("boredom").decrease(25);
                }
            ],
            (agent) => agent.getBelief("boredom").getValue() > 50, // Preconditions
            (agent) => {
                //console.log("Agent is done reading.");
            }, // Effects
            scene.getLocation("Flower Bed")
        );
    }

    /**
     * Creates a "SitIdle" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to sit idle.
     */
    static createSitIdleIntention(scene) {
        return new Intention(
            "SitIdle",
            [
                (agent) => {
                    //console.log("Agent is sitting idle.");
                    agent.getBelief("boredom").increase(2); // is boring to sit idle
                }
            ],
            (agent) => true,  // Condition is always true, so it will always activate
            (agent) => {
                // console.log("Agent is done idling.");
            }, // Effects
            scene.getLocation("Sofa") 
        );
    }
}