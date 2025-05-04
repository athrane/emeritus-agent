import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { Movement } from '../internal.js';
import { Location } from '../internal.js';
import { BeliefManager } from '../internal.js';
import { DesireManager } from '../internal.js';
import { IntentionManager } from '../internal.js';
import { Scene } from '../internal.js';

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
     * @param {Scene} scene The scene where the agent resides.
     * @throws {Error} If the provided name is not a string.
     */
  constructor(name, initialLocation, movementSpeed, scene) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureInstanceOf(initialLocation, Location);
    TypeUtils.ensureNumber(movementSpeed);
    TypeUtils.ensureInstanceOf(scene, Scene);
    this.name = name;
    this.movement = new Movement(initialLocation, movementSpeed, scene); 
    this.beliefManager = new BeliefManager();    
    this.desireManager = new DesireManager();
    this.intentionManager = new IntentionManager();
    this.scene = scene;
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
    this.desireManager.update(this); 
    this.movement.update(); 

    // if moving the exit 
    if (this.movement.isMoving()) return;

    // update the current intention 
    this.intentionManager.update(this, this.getCurrentBestDesire()); //
    const currentIntention = this.getCurrentIntention(); //

    // if the current intention is null then exit
    if (currentIntention === null) return;

    // if the current intention is the null intention then exit
    if (currentIntention == IntentionManager.NULL_INTENTION) return; 

    // get current and target location
    const targetLocation = currentIntention.getLocation(); 
    const targetRoom = targetLocation.getRoom(); 
        
    //const currentLocation = this.movement.getLocation(); 
    const currentRoom = this.movement.
    this.scene.getRoomForLocation(currentLocation); 

    // if current location and target location are in the same room the execute plan
    if (currentRoom === targetRoom && this.movement.isWithinReasonbleRange(targetLocation)) { 
      this.intentionManager.executeCurrentIntention(this); 
      return;
    } 
  
    // Need to move: Initiate pathfinding and movement
    this.movement.moveTo(targetLocation); 

  }
}