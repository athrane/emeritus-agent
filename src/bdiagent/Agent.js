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
   * Retrieves the agent's movement system.
   * 
   * @returns {Movement} The movement system of the agent.
   */ 
  getMovement() {
    return this.movement;
  }

  /**
   * Runs the agent for a single iteration of the simulation.
   */
  run() {
    this.beliefManager.update(this);
    this.desireManager.update(this);
    this.movement.update();

    // if moving then exit 
    if (this.movement.isMoving()) return;

    // update the current intention 
    this.intentionManager.update(this, this.getCurrentBestDesire()); 
    const currentIntention = this.getCurrentIntention(); 

    // if the current intention is null or the null intention then exit
    if (currentIntention === null) return;
    if (currentIntention == IntentionManager.NULL_INTENTION) return;

    // state: we have a new intention and we are not moving
    // if agent is in same intention room and within "reasonable" distance of location for intention the execute the intention
    // get new target room for intention
    const intentionLocation = currentIntention.getLocation();
    const intentionRoom = intentionLocation.getRoom();

    // get current room where agent resides
    const currentLocation = this.movement.getDestination();
    const currentRoom = this.movement.getRoom();
    
    // if the current room is the same as the intention room then check if the agent is within reasonable range of the target location
    if (currentRoom === intentionRoom) {

      // check if the agent is within reasonable range of the target location
      if (this.movement.isWithinReasonbleRange(intentionLocation)) {
        this.intentionManager.executeCurrentIntention(this);
        return;
      }
    }

    // Need to move: Initiate pathfinding and movement
    this.movement.moveTo(intentionLocation);
  }
}