import { Belief } from '../internal.js';
import { BeliefUpdater } from '../internal.js';
import { Desire } from '../internal.js';
import { Intention } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { Motion } from '../internal.js';
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
     * @param {Motion} motionSystem The motion system for the agent (must be a Motion instance).
     * @param {Scene} scene The scene where the agent resides.
     * @throws {Error} If the provided name is not a string.
     */
  constructor(name, motionSystem, scene) {
    TypeUtils.ensureString(name);
    TypeUtils.ensureInstanceOf(scene, Scene);
    if (!(motionSystem instanceof Motion)) {
      throw new Error('motionSystem must be an instance of Motion');
    }
    this.name = name;
    this.motion = motionSystem;
    this.beliefManager = new BeliefManager();
    this.desireManager = new DesireManager();
    this.intentionManager = new IntentionManager();
    this.scene = scene;
  }

  /**
   * Retrieves the name of the agent.
   * @returns {string} The name of the agent.
   */
  getName() {
    return this.name;
  }

  /**
   * Adds a belief to the agent's list of beliefs.
   * @param {Belief} belief The belief to add.
   * @throws {Error} If the provided belief is not an instance of the Belief class.
   */
  addBelief(belief) {
    this.beliefManager.addBelief(belief);
  }

  /**
   * Retrieves a belief by its name.
   * @param {string} name The name of the belief to retrieve.
   * @returns {Belief | undefined} The belief with the given name, or undefined if not found.
   */
  getBelief(name) {
    return this.beliefManager.getBelief(name);
  }

  /**
   * Registers a BeliefUpdater with the agent.
   * @param {BeliefUpdater} beliefUpdater The BeliefUpdater instance to register.
   */
  registerBeliefUpdater(beliefUpdater) {
    this.beliefManager.registerBeliefUpdater(beliefUpdater);
  }

  /**
   * Adds a desire to the agent's list of desires.
   * * @param {Desire} desire The desire to add to the agent.
   */
  addDesire(desire) {
    this.desireManager.addDesire(desire);
  }

  /**
   * Adds an intention to the agent's list of intentions.
   * @param {Intention} intention The intention to add to the agent.
   */
  addIntention(intention) {
    this.intentionManager.addIntention(intention);
  }

  /**
   * Retrieves the agent's current intention.
   * @returns {Intention | null} The agent's current intention, or null if there is none.
   */
  getCurrentIntention() {
    return this.intentionManager.getCurrentIntention();
  }

  /**
   * Retrieves the agent's motion system.
   * @returns {Motion} The motion system of the agent.
   */
  getMotion() {
    return this.motion;
  }

  /**
   * Retrieves the agent's desire manager.
   * @return {DesireManager} The desire manager of the agent.
   */
  getDesireManager() {
    return this.desireManager;
  }

  /**
   * Retrieves the agent's belief manager.
   * @return {BeliefManager} The belief manager of the agent.
   */
  getBeliefManager() {
    return this.beliefManager;
  }

  /**
   * Retrieves the scene where the agent resides. 
   * @return {Scene} The scene of the agent.
   */
  getScene() {
    return this.scene;
  }

  /**
   * Runs the agent for a single iteration of the simulation.
   */
  run() {
    // Always update beliefs    
    this.beliefManager.update(this);

    // If moving, continue motion and defer desire/intention re-evaluation
    if (this.motion.isMoving()) {
      //console.log(`Update-CP1: Agent ${this.name} is moving`);
      this.motion.update();
      return;
    }

    // agent is not moving, or has just completed a motion
    //console.log(`Update-CP2: Agent ${this.name} has completed motion.`);

    // If no current intention, re-evaluate desires and intentions
    if (this.getCurrentIntention() === null || this.getCurrentIntention() == IntentionManager.NULL_INTENTION) {
      //console.log(`Update-CP3: Agent ${this.name} has no current intention. Re-evaluating desires and intentions.`);
      this.desireManager.update(this);
      this.intentionManager.update(this, this.desireManager.getCurrentBestDesire());
    }

    // get the current intention
    const currentIntention = this.getCurrentIntention();
    //console.log(`Update-CP5: Agent ${this.name} current intention: ${currentIntention ? currentIntention.getName() : 'null'}`);

    // if the current intention is null or the null intention then exit
    if (currentIntention == IntentionManager.NULL_INTENTION) return;
    if (currentIntention === null) return;

    // get new target room for intention
    const intentionLocation = currentIntention.getLocation();
    const intentionRoom = intentionLocation.getRoom();
    //console.log(`Update-CP6a: Agent ${this.name} intention location: ${intentionLocation.getName()}`);
    //console.log(`Update-CP6b: Agent ${this.name} intention room: ${intentionRoom.getName()}`);

    // get current room where agent resides
    const currentRoom = this.motion.getRoom();
    //console.log(`Update-CP6c: Agent ${this.name} current room: ${currentRoom.getName()}`);

    // if the current room is the same as the intention room then check if the agent is within reasonable range of the target location
    if (currentRoom === intentionRoom) {
      if (this.motion.isWithinReasonableRange(intentionLocation)) {
        //console.log(`Update-CP8: Agent ${this.name} is within reasonable range of the intention location: ${intentionLocation.getName()}. Will execute intention.`);
        this.intentionManager.executeCurrentIntention(this);

        // reset intention after execution
        //console.log(`Update-CP9: Agent ${this.name} has executed intention: ${  currentIntention.getName()}. Resetting current intention.`);
        this.intentionManager.reset();
        return;
      }
    }

    // If not in range or not in the correct room, initiate motion towards the intention's location
    //console.log(`Update-CP9: Agent ${this.name} is not within reasonable range of the intention location: ${intentionLocation.getName()}. Will initiate pathfinding and motion.`);
    this.motion.moveTo(intentionLocation);
  }
}