import { Agent } from '../internal.js';
import { IntegerPercentageBelief } from '../internal.js';
import { IntegerPercentageBeliefUpdater } from '../internal.js';
import { DesireFactory } from '../internal.js';
import { IntentionFactory } from '../internal.js';
import { Location } from '../internal.js'; 
import { Scene } from '../internal.js'; 

/**
 * Factory class for creating agents.
 */
export class AgentFactory {

    /**
     * The speed at which the old man agent moves.
     */
    static MOVEMENT_SPEED_OLDMAN = 0.2; 

    /**
     * The speed at which the cat agent moves.
     */
    static MOVEMENT_SPEED_CAT = 0.25; 

    /**
     * Creates a new null Agent.
     * 
     * @param {Scene} scene The scene where the agent resides.
     * @returns {Agent} The created agent.
     */
    static createNullAgent(scene) {
        const initialLocation = Location.createNullLocation();
        return new Agent("NULL Agent", initialLocation, AgentFactory.MOVEMENT_SPEED_OLDMAN, scene)
    }

    /**
     * Creates a new old man Agent.
     * 
     * @param {Scene} scene The scene where the agent resides.
     * @returns {Agent} The created agent.
     */    
    static createOldManAgent(scene) {

        // Create the agent
        const initialLocation = scene.getLocation("Bed");
        const oldMan = new Agent("Acticus", initialLocation, AgentFactory.MOVEMENT_SPEED_OLDMAN, scene);

        // Add beliefs
        const hungerBelief = new IntegerPercentageBelief("Hunger", 0);
        const fatigueBelief = new IntegerPercentageBelief("Fatigue", 0);
        const boredomBelief = new IntegerPercentageBelief("Boredom", 50);
        const dentalHygieneBelief = new IntegerPercentageBelief("Dental Hygiene", 0);
        const bodyHygieneBelief = new IntegerPercentageBelief("Body Hygiene", 0);
        const handHygieneBelief = new IntegerPercentageBelief("Hand Hygiene", 0);
        const vesicularDistentionBelief = new IntegerPercentageBelief("Vesicular Distention", 0);

        oldMan.addBelief(hungerBelief);
        oldMan.addBelief(fatigueBelief);
        oldMan.addBelief(boredomBelief);
        oldMan.addBelief(dentalHygieneBelief);
        oldMan.addBelief(bodyHygieneBelief);
        oldMan.addBelief(handHygieneBelief);
        oldMan.addBelief(vesicularDistentionBelief);

        // Register belief updaters
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(hungerBelief, 1));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(fatigueBelief, 1));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(boredomBelief, 1));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(dentalHygieneBelief, 0));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(bodyHygieneBelief, 1));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(handHygieneBelief, 0));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(vesicularDistentionBelief, 2));

        // Add desires
        oldMan.addDesire(DesireFactory.createSleepDesire());
        oldMan.addDesire(DesireFactory.createEatDesire());
        oldMan.addDesire(DesireFactory.createEntertainDesire());
        oldMan.addDesire(DesireFactory.createSitIdleDesire());
        oldMan.addDesire(DesireFactory.createNullDesire());
        oldMan.addDesire(DesireFactory.createDentalHygieneDesire());
        oldMan.addDesire(DesireFactory.createBodyHygieneDesire());
        oldMan.addDesire(DesireFactory.createHandHygieneDesire());
        oldMan.addDesire(DesireFactory.createVesicularDistentionDesire());

        // Add intentions using IntentionFactory
        oldMan.addIntention(IntentionFactory.createSleepIntention(scene));
        oldMan.addIntention(IntentionFactory.createEatIntention(scene));
        oldMan.addIntention(IntentionFactory.createEntertainIntention(scene));
        oldMan.addIntention(IntentionFactory.createSitIdleIntention(scene));
        oldMan.addIntention(IntentionFactory.createDentalHygieneIntention(scene));
        oldMan.addIntention(IntentionFactory.createBodyHygieneIntention(scene));
        oldMan.addIntention(IntentionFactory.createHandHygieneIntention(scene));
        oldMan.addIntention(IntentionFactory.createVesicularDistentionIntention(scene));

        return oldMan;
    }

    /**
     * Creates a new cat Agent simulating a lazy house cat.
     * 
     * @param {Scene} scene The scene where the agent resides.
     * @returns {Agent} The created cat agent.
     */
    static createCatAgent(scene) {
        const initialLocation = scene.getLocation("Bed") 
        const cat = new Agent("Anais", initialLocation,  AgentFactory.MOVEMENT_SPEED_CAT, scene); 

        // Add beliefs
        const hungerBelief = new IntegerPercentageBelief("Hunger", 0);
        const fatigueBelief = new IntegerPercentageBelief("Fatigue", 0);
        const boredomBelief = new IntegerPercentageBelief("Boredom", 0);
        cat.addBelief(hungerBelief);
        cat.addBelief(fatigueBelief);
        cat.addBelief(boredomBelief);

        // Register belief updaters
        cat.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(hungerBelief, 1));
        cat.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(fatigueBelief, 1));

        // Add desires (reuse existing ones)
        cat.addDesire(DesireFactory.createSleepDesire());
        cat.addDesire(DesireFactory.createEatDesire());
        cat.addDesire(DesireFactory.createSitIdleDesire());

        // Add cat intentions 
        cat.addIntention(IntentionFactory.createCatSleepIntention(scene));
        cat.addIntention(IntentionFactory.createCatEatIntention(scene));
        cat.addIntention(IntentionFactory.createCatSitIdleIntention(scene));

        return cat;
    }
}