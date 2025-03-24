import { Agent } from './internal.js';
import { IntegerPercentageBelief } from './internal.js';
import { IntegerPercentageBeliefUpdater } from './internal.js';
import { Desire } from './internal.js';

// Create a new agent with some beliefs
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
oldMan.addDesire(new Desire("Sleep", (agent) => agent.getBelief("fatigue").getValue() > 70, 8));
oldMan.addDesire(new Desire("Eat", (agent) => agent.getBelief("hunger").getValue() > 60, 7));
oldMan.addDesire(new Desire("SitIdle", (agent) => agent.getBelief("boredom").getValue() > 50, 5));

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.update();
}

