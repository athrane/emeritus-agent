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
                    agent.getBelief("Fatigue").decrease(80);
                    agent.getBelief("Hunger").increase(5); // Sleeping might increase hunger a bit
                }
            ],
            (agent) => agent.getBelief("Fatigue").getValue() > 70, // Preconditions
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
                    agent.getBelief("Hunger").decrease(70);
                    agent.getBelief("Fatigue").increase(5); // Eating might cause a bit of fatigue
                }
            ],
            (agent) => agent.getBelief("Hunger").getValue() > 60, // Preconditions
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
                    agent.getBelief("Boredom").decrease(25);
                }
            ],
            (agent) => agent.getBelief("Boredom").getValue() > 50, // Preconditions
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
            "Sit Idle",
            [
                (agent) => {
                    //console.log("Agent is sitting idle.");
                    agent.getBelief("Boredom").increase(5); // is boring to sit idle
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