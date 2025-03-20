const State = require('./State'); // Import the State class
const WalkingState = require('./WalkingState'); // Import the WalkingState class
const SleepingState = require('./SleepingState'); // Import the SleepingState class

class EatingState extends State {
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

module.exports = EatingState; // For CommonJS modules (Node.js)