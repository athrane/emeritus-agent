const State = require('./State'); // Import the State class
const EatingState = require('./EatingState'); // Import the EatingState class

class SleepingState extends State {
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

module.exports = SleepingState; // For CommonJS modules (Node.js)