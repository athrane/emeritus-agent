

import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { TypeUtils } from '../internal.js';

export class Agent {
  
  constructor(name) {
    this.name = name;
    this.beliefs = [];
    this.beliefUpdaters = [];
  }

  /**
   * 
   * @param {*} belief 
   */
  addBelief(belief) {
    TypeUtils.ensureInstanceOf(belief, Belief);
    this.beliefs.push(belief);
  }

  getBelief(name) {
    return this.beliefs.find(belief => belief.name === name);
  }

  /**
   * Registers a BeliefUpdater with the agent.
   * 
   * @param {BeliefUpdater} beliefUpdater The BeliefUpdater instance to register.
   */
  registerBeliefUpdater(beliefUpdater) {
    TypeUtils.ensureInstanceOf(beliefUpdater, BeliefUpdater);
    this.beliefUpdaters.push(beliefUpdater);
  }
  
  update() {
    console.log(`${this.name} is updating.`);

    // Update beliefs
    this.beliefUpdaters.forEach(bu => {
      bu.update(this);
    });
  }

}