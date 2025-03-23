export class Agent {
    constructor(name) {
      this.name = name;
      this.beliefs = [];
    }
  
    addBelief(belief) {
      this.beliefs.push(belief);
    }
  
    getBelief(name) {
      return this.beliefs.find(belief => belief.name === name);
    }
  
    updateBelief(name, newValue) {
      const belief = this.getBelief(name);
      if (belief) {
        belief.update(newValue);
      }
    }

    update() {
        console.log(`${this.name} is updating.`);
    }
    
}