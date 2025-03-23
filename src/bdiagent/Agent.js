

import { BeliefUpdater } from '../../internal.js';

export class Agent {
  constructor(name) {
    this.name = name;
    this.beliefs = [];
    this.beliefUpdaters = {};
  }

  addBelief(belief) {
    this.beliefs.push(belief);
  }

  getBelief(name) {
    return this.beliefs.find(belief => belief.name === name);
  }

  /**
   * Registers a BeliefUpdater with the agent.
   * 
   * @param {string} name The belief (name) to register the BeliefUpdater with.
   * @param {BeliefUpdater} beliefUpdater The BeliefUpdater instance to register.
   */
  registerBeliefUpdater(name, beliefUpdater) {
    TypeUtils.ensureInstanceOf(name, String);
    TypeUtils.ensureInstanceOf(beliefUpdater, BeliefUpdater);

    this.beliefUpdaters[name] = beliefUpdater;
  }
  
  update() {
    console.log(`${this.name} is updating.`);
  }

}