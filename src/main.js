// Import the NonPlayerCharacter class
import { NonPlayerCharacter } from './internal.js';
import { Agent } from './internal.js';  // Import Agent class
import { Belief } from './internal.js'; // Import Belief class
import { IntegerBelief } from './internal.js'; // Import IntegerBelief class

// Example Usage
//const npc = new NonPlayerCharacter("Bob");

// Simulate the NPC's behavior over time
//for (let i = 0; i < 100; i++) {
//  console.log(`--- Tick ${i + 1} ---`);
//  npc.update();
//}

// Example Usage
const oldMan = new Agent("Bob");
oldMan.addBelief(new IntegerBelief("hunger", 50));
oldMan.addBelief(new Belief("fatigue", false));

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  oldMan.update();
}

