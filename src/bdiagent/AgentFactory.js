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


    static MOVEMENT_SPEED_OLDMAN = 0.2; // Speed of the old man agent

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
        oldMan.addBelief(hungerBelief);
        oldMan.addBelief(fatigueBelief);
        oldMan.addBelief(boredomBelief);

        // Register belief updaters
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(hungerBelief, 5));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(fatigueBelief, 5));
        oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(boredomBelief, 5));

        // Add desires
        oldMan.addDesire(DesireFactory.createSleepDesire());
        oldMan.addDesire(DesireFactory.createEatDesire());
        oldMan.addDesire(DesireFactory.createEntertainDesire());
        oldMan.addDesire(DesireFactory.createSitIdleDesire());
        oldMan.addDesire(DesireFactory.createNullDesire());

        // Add intentions using IntentionFactory
        oldMan.addIntention(IntentionFactory.createSleepIntention(scene));
        oldMan.addIntention(IntentionFactory.createEatIntention(scene));
        oldMan.addIntention(IntentionFactory.createEntertainIntention(scene));
        oldMan.addIntention(IntentionFactory.createSitIdleIntention(scene));

        return oldMan;
    }
}