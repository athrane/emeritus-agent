import { Agent } from './internal.js';  // Import Agent class
import { IntegerPercentageBelief } from './internal.js'; // Import IntegerBelief class
import { IntegerPercentageBeliefUpdater } from './internal.js'; // Import IntegerBeliefUpdater class

// Create a new agent with some beliefs
const oldMan = new Agent("Bob");
const hungerBelief =  new IntegerPercentageBelief("hunger", 100);
const fatigueBelief = new IntegerPercentageBelief("fatigue", 0);
oldMan.addBelief(hungerBelief);
oldMan.addBelief(fatigueBelief);

const hungerUpdater = new IntegerPercentageBeliefUpdater(hungerBelief, -10);
const fatgueUpdater = new IntegerPercentageBeliefUpdater(fatigueBelief, 5);

oldMan.registerBeliefUpdater(hungerUpdater);
oldMan.registerBeliefUpdater(fatgueUpdater);

/**
// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.update();
}

**/

