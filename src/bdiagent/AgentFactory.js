import { Agent } from '../internal.js';
import { IntegerPercentageBelief } from '../internal.js';
import { IntegerPercentageBeliefUpdater } from '../internal.js';
import { DesireFactory } from '../internal.js';
import { Intention } from '../internal.js';

export class AgentFactory {
    static createOldManAgent() {
        const oldMan = new Agent("Acticus");

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
        oldMan.addDesire(DesireFactory.createSitIdleDesire());
        oldMan.addDesire(DesireFactory.createNullDesire()); 

        // Add intentions
        oldMan.addIntention(new Intention("Sleep", [
            (agent) => {
                console.log("Agent is going to sleep.");
                agent.getBelief("fatigue").decrease(50);
                agent.getBelief("hunger").increase(10); // Sleeping might increase hunger a bit
            }
        ], (agent) => agent.getBelief("fatigue").getValue() > 70, (agent) => {
            console.log("Agent woke up and feels rested.");
        }));

        oldMan.addIntention(new Intention("Eat", [
            (agent) => {
                console.log("Agent is eating.");
                agent.getBelief("hunger").decrease(40);
                agent.getBelief("fatigue").increase(5); // Eating might cause a bit of fatigue
            }
        ], (agent) => agent.getBelief("hunger").getValue() > 60, (agent) => {
            console.log("Agent finished eating.");
        }));

        oldMan.addIntention(new Intention("SitIdle", [
            (agent) => {
                console.log("Agent is sitting idle.");
                agent.getBelief("boredom").decrease(20);
                agent.getBelief("hunger").increase(5);
                agent.getBelief("fatigue").increase(5);
            }
        ], (agent) => agent.getBelief("boredom").getValue() > 50, (agent) => {
            console.log("Agent is done idling.");
        }));

        return oldMan;
    }
}