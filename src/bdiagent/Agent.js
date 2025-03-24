import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Represents an agent in the simulation.
 * An agent has beliefs and can update them using BeliefUpdaters.
 */
export class Agent {

  /**
     * Constructor for the Agent class.
     * 
     * @param {string} name The name of the agent.
     * @throws {Error} If the provided name is not a string.
     */
  constructor(name) {
    TypeUtils.ensureString(name);
    this.name = name;
    this.beliefs = [];
    this.beliefUpdaters = [];
    this.desires = [];    
  }

  /**
   * Adds a belief to the agent's list of beliefs.
   * 
   * @param {Belief} belief The belief to add.
   * @throws {Error} If the provided belief is not an instance of the Belief class.
   */
  addBelief(belief) {
    TypeUtils.ensureInstanceOf(belief, Belief);
    this.beliefs.push(belief);
  }

  /**
   * Retrieves a belief by its name.
   * 
   * @param {string} name The name of the belief to retrieve.
   * @returns {Belief | undefined} The belief with the given name, or undefined if not found.
   */
  getBelief(name) {
    TypeUtils.ensureString(name);
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

  /**
   * Adds a desire to the agent's list of desires.
   * * @param {Desire} desire The desire to add to the agent.
   */  
  addDesire(desire) {
    TypeUtils.ensureInstanceOf(desire, Desire);    
    this.desires.push(desire);
  }

  /**
   * Updates the agent's beliefs using the registered BeliefUpdaters.
   */
  update() {
    console.log(`${this.name} is updating.`);

    // Update beliefs
    this.beliefUpdaters.forEach(bu => {
      bu.update(this);
    });
  }

}