
import { State, WalkingState, SleepingState } from './internal.js'; // Import the State class

export class EatingState extends State {
  constructor(npc) {
    super(npc); // Call the parent class constructor
  }
    
  enter() {
    console.log(`${this.npc.name} is now eating.`);
  }

  update() {
    this.npc.eatTime++;

    if (this.npc.eatTime >= 3) {
      const random = Math.random();
      if (random < 0.5) {
        this.npc.changeState(new WalkingState(this.npc));
      } else {
        this.npc.changeState(new SleepingState(this.npc));
      }
    }
  }

  exit() {
    console.log(`${this.npc.name} finished eating.`);
    this.npc.eatTime = 0; // Reset eat timer
  }
}