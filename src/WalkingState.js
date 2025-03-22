
import { State, SleepingState } from './internal.js'; // Import the State class

export class WalkingState extends State {
  constructor(npc) {
    super(npc); // Call the parent class constructor
  }
    
  enter() {
    console.log(`${this.npc.name} is now walking around.`);
  }

  update() {
    this.npc.walkTime++;

    if (this.npc.walkTime >= 4) {
      this.npc.changeState(new SleepingState(this.npc));
    }
  }

  exit() {
    console.log(`${this.npc.name} stopped walking.`);
    this.npc.walkTime = 0;
  }
}
