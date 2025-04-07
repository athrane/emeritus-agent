import { Agent } from '../internal.js';
import { IntegerPercentageBelief } from '../internal.js';
import { IntegerPercentageBeliefUpdater } from '../internal.js';
import { DesireFactory } from '../internal.js';
import { IntentionFactory } from '../internal.js';
import { LocationFactory } from '../internal.js'; // Import the LocationFactory

/**
 * Factory class for creating agents.
 */
export class AgentFactory {

    static MOVEMENT_SPEED = 1; // Speed of the agent

    /**
     * Creates a new null Agent.
     * 
     * @returns {Agent} The created agent.
     */
    static createNullAgent() {
        const initialLocation = LocationFactory.createNullLocation();
        return new Agent("NULL Agent", initialLocation, AgentFactory.MOVEMENT_SPEED)
    }

    static createOldManAgent() {

        // Create the agent
        const initialLocation = LocationFactory.createBedroom();
        const oldMan = new Agent("Acticus", initialLocation, AgentFactory.MOVEMENT_SPEED);

        // Add beliefs
        const hungerBelief = new IntegerPercentageBelief("hunger", 0);
        const fatigueBelief = new IntegerPercentageBelief("fatigue", 0);
        const boredomBelief = new IntegerPercentageBelief("boredom", 50);
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
        oldMan.addIntention(IntentionFactory.createSleepIntention());
        oldMan.addIntention(IntentionFactory.createEatIntention());
        oldMan.addIntention(IntentionFactory.createEntertainIntention());
        oldMan.addIntention(IntentionFactory.createSitIdleIntention());

        return oldMan;
    }
}