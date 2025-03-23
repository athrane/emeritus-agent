import { Agent } from './internal.js';  
import { IntegerPercentageBelief } from './internal.js'; 
import { IntegerPercentageBeliefUpdater } from './internal.js'; 

// Create a new agent with some beliefs
const oldMan = new Agent("Bob");
const hungerBelief =  new IntegerPercentageBelief("hunger", 100);
const fatigueBelief = new IntegerPercentageBelief("fatigue", 0);
oldMan.addBelief(hungerBelief);
oldMan.addBelief(fatigueBelief);
oldMan.registerBeliefUpdater(IntegerPercentageBeliefUpdater(hungerBelief, -10));
oldMan.registerBeliefUpdater(new IntegerPercentageBeliefUpdater(fatigueBelief, 5));

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
//  oldMan.update();
}

