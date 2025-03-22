
import { State, EatingState } from './internal.js'; // Import the State class

export class SleepingState extends State {
  constructor(npc) {
    super(npc); // Call the parent class constructor
  }

  enter() {
    console.log(`${this.npc.name} is now sleeping.`);
  }

  update() {
    this.npc.sleepTime++;
    if (this.npc.sleepTime >= 5) {
      this.npc.changeState(new EatingState(this.npc));
    }
  }

  exit() {
    console.log(`${this.npc.name} woke up.`);
    this.npc.sleepTime = 0; // Reset sleep timer.
  }
}
