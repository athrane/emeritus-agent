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
                    agent.getBelief("Fatigue").decrease(100);
                    agent.getBelief("Hunger").increase(5); // Sleeping might increase hunger a bit
                }
            ],
            (agent) => agent.getBelief("Fatigue").getValue() > 70, // Preconditions
            (agent) => {
                //console.log("Agent woke up and feels rested.");
                agent.getBelief("Dental Hygiene").increase(100); // Dental hygiene after sleeping
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
                    agent.getBelief("Hunger").decrease(90);
                }
            ],
            (agent) => agent.getBelief("Hunger").getValue() > 60, // Preconditions
            (agent) => {
                //console.log("Agent finished eating.");
                agent.getBelief("Dental Hygiene").increase(20); // Dental hygiene after eating

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

    /**
     * Creates a "Dental Hygiene" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to maintain dental hygiene.
     */
    static createDentalHygieneIntention(scene) {
        return new Intention(
            "Dental Hygiene",
            [
                (agent) => {
                    //console.log("Agent is brushing teeth.");
                    agent.getBelief("Dental Hygiene").decrease(100);
                }
            ],
            (agent) => agent.getBelief("Dental Hygiene").getValue() > 80, // Preconditions
            (agent) => {
                //console.log("Agent finished dental hygiene.");
            }, // Effects
            scene.getLocation("Bathroom Sink")
        );
    }

    /**
     * Creates a "Body Hygiene" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to maintain body hygiene.
     */
    static createBodyHygieneIntention(scene) {
        return new Intention(
            "Body Hygiene",
            [
                (agent) => {
                    //console.log("Agent is taking a shower.");
                    agent.getBelief("Body Hygiene").decrease(100);
                }
            ],
            (agent) => agent.getBelief("Body Hygiene").getValue() > 80, // Preconditions
            (agent) => {
                //console.log("Agent finished body hygiene.");
            }, // Effects
            scene.getLocation("Shower")
        );
    }

    /**
     * Creates a "Hand Hygiene" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to maintain hand hygiene.
     */
    static createHandHygieneIntention(scene) {
        return new Intention(
            "Hand Hygiene",
            [
                (agent) => {
                    //console.log("Agent is washing hands.");
                    agent.getBelief("Hand Hygiene").decrease(100);
                }
            ],
            (agent) => agent.getBelief("Hand Hygiene").getValue() > 80, // Preconditions
            (agent) => {
                //console.log("Agent finished hand hygiene.");
            }, // Effects
            scene.getLocation("Bathroom Sink")
        );
    }

    /**
     * Creates a "Vesicular Distention" intention.
     * @param {Scene} scene The scene where the simulation takes place.
     * @returns {Intention} An intention for the agent to perform vesicular distention.
     */
    static createVesicularDistentionIntention(scene) {
        return new Intention(
            "Vesicular Distention",
            [
                (agent) => {
                    //console.log("Agent is performing vesicular distention.");
                    agent.getBelief("Vesicular Distention").decrease(100);
                }
            ],
            (agent) => agent.getBelief("Vesicular Distention").getValue() > 80, // Preconditions
            (agent) => {
                //console.log("Agent finished vesicular distention.");
                agent.getBelief("Hand Hygiene").increase(100); // Hand hygiene after vesicular distention
            }, // Effects
            scene.getLocation("Toilet")
        );
    }

    static createCatSleepIntention(scene) {
        return new Intention(
            "Sleep",
            [
                (agent) => {
                    //console.log("Cat is going to sleep.");
                    agent.getBelief("Fatigue").decrease(100);
                    agent.getBelief("Hunger").increase(5); // Sleeping might increase hunger a bit
                }
            ],
            (agent) => agent.getBelief("Fatigue").getValue() > 70, // Preconditions
            (agent) => {
                //console.log("Cat woke up and feels rested.");
            }, // Effects
            scene.getLocation("Desk")  
        );
    }

    static createCatEatIntention(scene) {
        return new Intention(
            "Eat",
            [
                (agent) => {
                    //console.log("Cat is eating.");
                    agent.getBelief("Hunger").decrease(90);
                }
            ],
            (agent) => agent.getBelief("Hunger").getValue() > 60, // Preconditions
            (agent) => {
                //console.log("Cat finished eating.");
            }, // Effects
            scene.getLocation("Fridge")
        );
    }

    static createCatSitIdleIntention(scene) {
        return new Intention(
            "Sit Idle",
            [
                (agent) => {
                    //console.log("Cat is sitting idle.");
                    agent.getBelief("Boredom").increase(5); // is boring to sit idle
                }
            ],
            (agent) => true,  // Condition is always true, so it will always activate
            (agent) => {
                // console.log("Cat is done idling.");
            }, // Effects
            scene.getLocation("Flower Bed") 
        );
    }

}