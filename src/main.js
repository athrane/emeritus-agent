// Import the NonPlayerCharacter class
import { NonPlayerCharacter } from './internal.js';

// Example Usage
const npc = new NonPlayerCharacter("Bob");

// Simulate the NPC's behavior over time
for (let i = 0; i < 100; i++) {
  console.log(`--- Tick ${i + 1} ---`);
  npc.update();
}
