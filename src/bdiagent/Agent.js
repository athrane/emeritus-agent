import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
import { IntentionFactory } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { Movement } from '../internal.js';
import { Location } from '../internal.js';
import { BeliefManager } from '../internal.js';
import { DesireManager } from '../internal.js';
import { IntentionManager } from '../internal.js';
import { RoomManager } from '../internal.js';

/**
 * Represents an agent in the simulation.
 * An agent has beliefs and can update them using BeliefUpdaters.
 */
export class Agent {
  
  /**
     * Constructor for the Agent class.
     * 
     * @param {string} name The name of the agent.
     * @param {Location} initialLocation The initial location of the agent.
     * @param {number} movementSpeed The speed of the agent's movement.
     * @param {RoomManager} roomManager The room manager for the agent.
     * @throws {Error} If the provided name is not a string.
     */
  constructor(name, initialLocation, movementSpeed, roomManager) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureInstanceOf(initialLocation, Location);
    TypeUtils.ensureNumber(movementSpeed);
    TypeUtils.ensureInstanceOf(roomManager, RoomManager);
    this.name = name;
    this.intentions = [];
    this.currentIntention = Agent.NULL_INTENTION;
    this.movement = new Movement(initialLocation, movementSpeed, roomManager); 
    this.beliefManager = new BeliefManager();    
    this.desireManager = new DesireManager();
    this.intentionManager = new IntentionManager();
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
    this.desireManager.addDesire(desire);
  }

  /**
   * Adds an intention to the agent's list of intentions.
   * 
   * @param {Intention} intention The intention to add to the agent.
   */
  addIntention(intention) {
    this.intentionManager.addIntention(intention);
  }

  /**
   * Retrieves the agent's current intention.
   *
   * @returns {Intention | null} The agent's current intention, or null if there is none.
   */
  getCurrentIntention() {
    return this.intentionManager.getCurrentIntention();
  }

  /**
   * Retrieves the agent's current best desire.
   *
   * @returns {Desire | null} The agent's current best desire, or null if there is none.
   */
  getCurrentBestDesire() {
    return this.desireManager.getCurrentBestDesire();
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
   * Runs the agent for a single iteration of the simulation.
   */
  run() {
    this.beliefManager.update(this); 
    this.desireManager.update(); 
    this.movement.update(); 
    this.intentionManager.update(this, this.getCurrentBestDesire()); 

     // if not within reasonable range of the intention's location, move towards it
     const currentIntention = this.getCurrentIntention();
     if (!currentIntention.isWithinReasonbleRange(this.getCurrentLocation())) {
      this.movement.moveTo(currentIntention.location);
      return;
     } 
    
    // execute intention  
    this.intentionManager.executeCurrentIntention(this); 
  }
}