const State = require('./State'); // Import the State class
const SleepingState = require('./SleepingState'); // Import the SleepingState class

class WalkingState extends State {
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

module.exports = WalkingState; // For CommonJS modules (Node.js)