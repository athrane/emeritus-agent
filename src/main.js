import { Agent } from './internal.js';
import { IntegerPercentageBelief } from './internal.js';
import { IntegerPercentageBeliefUpdater } from './internal.js';
import { Desire } from './internal.js';
import { Intention } from './internal.js';

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

// Run agent 
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.run();
}

