import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
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
    this.intentions = [];
    this.currentIntention = null; // Track the current intention    
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

  addIntention(intention) {
    TypeUtils.ensureInstanceOf(intention, Intention);
    this.intentions.push(intention);
  }

  /**
   * Updates the agent's beliefs using the registered BeliefUpdaters.
   */
  update() {
    this.beliefUpdaters.forEach(bu => {
      bu.update(this);
    });
  }

  reason() {
    // 1. Desire Generation
    const activeDesires = this.desires.filter(desire => desire.isSatisfied(this));

    // 2. Intention Selection (basic - pick the highest priority)
    if (activeDesires.length > 0) {
      activeDesires.sort((a, b) => b.priority - a.priority); // Sort by priority
      const bestDesire = activeDesires[0];
      this.currentIntention = this.intentions.find(intention => intention.name === bestDesire.name && intention.canExecute(this));
    } else {
      this.currentIntention = null;
    }
  }

  act() {
    if (this.currentIntention) {
      this.currentIntention.execute(this);
    }
  }

  run() {
    this.update(); // Update beliefs
    this.reason(); // Determine what to do
    this.act();    // Perform the action
  }
}