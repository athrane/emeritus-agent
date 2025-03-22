
import { SleepingState } from './internal.js'; // Import SleepingState

export class NonPlayerCharacter {
  constructor(name) {
    this.name = name;
    this.currentState = new SleepingState(this); // Initial state
    this.sleepTime = 0;
    this.eatTime = 0;
    this.walkTime = 0;
  }

  changeState(newState) {
    this.currentState.exit();
    this.currentState = newState;
    this.currentState.enter();
  }

  update() {
    this.currentState.update();
  }
}
