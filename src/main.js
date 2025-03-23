import { Agent } from './internal.js';  // Import Agent class
import { IntegerPercentageBelief } from './internal.js'; // Import IntegerBelief class

// Example Usage
const oldMan = new Agent("Bob");
oldMan.addBelief(new IntegerPercentageBelief("hunger", 100));
oldMan.addBelief(new IntegerPercentageBelief("fatigue", 0));

//oldMan.registerBeliefUpdater("hunger", new IntegerBeliefIncrementer());
//oldMan.registerBeliefUpdater("fatigue", new IntegerBeliefIncrementer());

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.update();
}

