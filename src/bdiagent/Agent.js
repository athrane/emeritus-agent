import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
import { IntentionFactory } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * Represents an agent in the simulation.
 * An agent has beliefs and can update them using BeliefUpdaters.
 */
export class Agent {

  static NULL_INTENTION = IntentionFactory.createNullIntention();
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
    this.activeDesires = [];
    this.bestDesire = null;    
    this.intentions = [];
    this.currentIntention = Agent.NULL_INTENTION;    
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
   * 
   * * @param {Desire} desire The desire to add to the agent.
   */
  addDesire(desire) {
    TypeUtils.ensureInstanceOf(desire, Desire);
    this.desires.push(desire);
  }

  /**
   * Adds an intention to the agent's list of intentions.
   * 
   * @param {Intention} intention The intention to add to the agent.
   */
  addIntention(intention) {
    TypeUtils.ensureInstanceOf(intention, Intention);
    this.intentions.push(intention);
  }

  /**
   * Retrieves the agent's current intention.
   *
   * @returns {Intention | null} The agent's current intention, or null if there is none.
   */
  getCurrentIntention() {
    return this.currentIntention;
  }

  /**
   * Retrieves the agent's current best desire.
   *
   * @returns {Desire | null} The agent's current best desire, or null if there is none.
   */ 
  getCurrentBestDesire() {
    return this.bestDesire;
  }
  
  /**
   * Updates the agent's beliefs using the registered BeliefUpdaters.
   */
  update() {
    this.beliefUpdaters.forEach(bu => {
      bu.update(this);
    });
  }

  /**
   * Determines the agent's current intention based on its desires and intentions.
   */
  reason() {
    // 1. Desire Generation
    const activeDesires = this.desires.filter(desire => desire.isSatisfied(this));

    // 2. Intention Selection (basic - pick the highest priority)
    if (activeDesires.length > 0) {
      this.activeDesires.sort((a, b) => b.priority - a.priority); // Sort by priority
      this.bestDesire = activeDesires[0];
      this.currentIntention = this.intentions.find(intention => intention.name === this.bestDesire.name && intention.canExecute(this));
    } else {
      this.currentIntention = Agent.NULL_INTENTION;
    }
  }

  /**
   * Performs the agent's current intention.
   */
  act() {
    if (this.currentIntention) {
      this.currentIntention.execute(this);
    }
  }

  /**
   * Runs the agent for a single iteration of the simulation.
   */
  run() {
    this.update(); // Update beliefs
    this.reason(); // Determine what to do
    this.act();    // Perform the action
  }
}