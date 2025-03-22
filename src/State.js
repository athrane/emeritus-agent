// State interface
export class State {
  constructor(npc) {
    this.npc = npc;
  }

  enter() {
    // Method to handle entering the state
  }

  update() {
    // Method to handle state updates
  }

  exit() {
    // Method to handle exiting the state
  }
}