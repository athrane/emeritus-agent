import { Agent } from './internal.js';
import { IntegerPercentageBelief } from './internal.js';
import { IntegerPercentageBeliefUpdater } from './internal.js';

// Create a new agent with some beliefs
const oldMan = new Agent("Acticus");
const hungerBelief = new IntegerPercentageBelief("hunger", 0);
const fatigueBelief = new IntegerPercentageBelief("fatigue", 0);
oldMan.addBelief(hungerBelief);
oldMan.addBelief(fatigueBelief);
oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(hungerBelief, 5));
oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(fatigueBelief, 5));

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.update();
}

