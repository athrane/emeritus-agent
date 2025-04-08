import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
import { IntentionFactory } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { Movement } from '../internal.js';
import { Location } from '../internal.js';
import { BeliefManager } from '../internal.js';

/**
 * Represents an agent in the simulation.
 * An agent has beliefs and can update them using BeliefUpdaters.
 */
export class Agent {
  
  /**
   * A constant representing a null location.
   */
  static NULL_INTENTION = IntentionFactory.createNullIntention();

  /**
     * Constructor for the Agent class.
     * 
     * @param {string} name The name of the agent.
     * @param {Location} initialLocation The initial location of the agent.
     * @param {number} movementSpeed The speed of the agent's movement.
     * @throws {Error} If the provided name is not a string.
     */
  constructor(name, initialLocation, movementSpeed) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureInstanceOf(initialLocation, Location);
    TypeUtils.ensureNumber(movementSpeed);
    this.name = name;
    this.desires = [];
    this.activeDesires = [];
    this.bestDesire = null;
    this.intentions = [];
    this.currentIntention = Agent.NULL_INTENTION;
    this.movement = new Movement(initialLocation, movementSpeed); 
    this.beliefManager = new BeliefManager();    
  }

  /**
   * Adds a belief to the agent's list of beliefs.
   * 
   * @param {Belief} belief The belief to add.
   * @throws {Error} If the provided belief is not an instance of the Belief class.
   */
  addBelief(belief) {
    this.beliefManager.addBelief(belief);
  }

  /**
   * Retrieves a belief by its name.
   * 
   * @param {string} name The name of the belief to retrieve.
   * @returns {Belief | undefined} The belief with the given name, or undefined if not found.
   */
  getBelief(name) {
    return this.beliefManager.getBelief(name);
  }

  /**
   * Registers a BeliefUpdater with the agent.
   * 
   * @param {BeliefUpdater} beliefUpdater The BeliefUpdater instance to register.
   */
  registerBeliefUpdater(beliefUpdater) {
    this.beliefManager.registerBeliefUpdater(beliefUpdater);
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
   * Retrieves the agent's current location.
   *
   * @returns {Location} The current location of the agent.
   */
  getCurrentLocation() {
    return this.movement.getLocation();
  }

  /**
     * Checks if the agent is currently moving.
     *
     * @returns {boolean} True if the agent is moving, false otherwise.
     */
  isMoving() {
    return this.movement.isMoving();
  }

  /**
   * Retrieves the agent's current destination.
   *
   * @returns {Location | null} The destination location the agent is moving to, or null if not moving.
   */
  getDestination() {
    return this.movement.getDestination();
  }

  /**
   * Determines the agent's current intention based on its desires and intentions.
   */
  reason() {
    // get desires 
    const activeDesires = this.desires.filter(desire => desire.isSatisfied(this));

    // exit if no active desires
    if (activeDesires.length === 0) {
      this.currentIntention = Agent.NULL_INTENTION;
      return;
    }

    // sort the active desires by priority
    this.activeDesires.sort((a, b) => b.priority - a.priority);

    // select the best desire
    this.bestDesire = activeDesires[0];

    // find the intention that corresponds to the best desire - found by name
    this.currentIntention = this.intentions.find(
      intention => intention.name === this.bestDesire.name 
      && intention.canExecute(this));

    // if no intentions where found, set the null intention
    if (!this.currentIntention) {
      this.currentIntention = Agent.NULL_INTENTION;
    }

  }

  /**
   * Performs the agent's current intention.
   */
  act() {

    // if not within reasonable range of the intention's location, move towards it
    if (!this.currentIntention.isWithinReasonbleRange(this.getCurrentLocation())) {
      this.movement.moveTo(this.currentIntention.location); // Start moving
      return;
    }

    // execute
    this.currentIntention.execute(this);
  }
  /**
   * Runs the agent for a single iteration of the simulation.
   */
  run() {
    this.beliefManager.update(this); // Update beliefs
    this.reason(); // Determine what to do
    this.movement.update(); // update movement
    this.act();    // Perform the action
  }
}