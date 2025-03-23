
import { BeliefUpdater } from './BeliefUpdater.js';
import { IntegerPercentageBelief } from './IntegerPercentageBelief.js';

/**
 * BeliefUpdater for IntegerPercentageBeliefs, ensuring values stay within 0-100 range.
 */
export class IntegerPercentageBeliefUpdater extends BeliefUpdater {
  /**
   * Updates an IntegerPercentageBelief with a new clamped value.
   * @param {Agent} agent The agent whose belief needs to be updated.
   * @param {string} beliefName The name of the IntegerPercentageBelief to update.
   * @param {number} newValue The new value for the belief.
   */
  updatePercentageBelief(agent, beliefName, newValue) {
    if (typeof newValue !== 'number') {
      throw new Error("IntegerPercentageBeliefUpdater: New value must be a number.");
    }
    const belief = agent.getBelief(beliefName);
    if (!belief) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' not found on agent '${agent.name}'.`);
    }
    if (!(belief instanceof IntegerPercentageBelief)) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' is not an IntegerPercentageBelief.`);
    }
    // Use the clampPercentage method from IntegerPercentageBelief to ensure value is within range
    const clampedValue = IntegerPercentageBelief.clampPercentage(newValue);
    this.updateBelief(agent, beliefName, clampedValue);
  }

  /**
   * Increases an IntegerPercentageBelief's value, clamping the result.
   * @param {Agent} agent The agent whose belief needs to be updated.
   * @param {string} beliefName The name of the IntegerPercentageBelief to increase.
   * @param {number} amount The amount to increase the belief's value by.
   */
  increasePercentageBelief(agent, beliefName, amount) {
    if (typeof amount !== 'number') {
      throw new Error("IntegerPercentageBeliefUpdater: Amount must be a number.");
    }
    const belief = agent.getBelief(beliefName);
    if (!belief) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' not found on agent '${agent.name}'.`);
    }
    if (!(belief instanceof IntegerPercentageBelief)) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' is not an IntegerPercentageBelief.`);
    }
    // Use the clampPercentage method from IntegerPercentageBelief to ensure value is within range
    const clampedValue = IntegerPercentageBelief.clampPercentage(belief.value + amount);
    this.updateBelief(agent, beliefName, clampedValue);
  }

  /**
   * Decreases an IntegerPercentageBelief's value, clamping the result.
   * @param {Agent} agent The agent whose belief needs to be updated.
   * @param {string} beliefName The name of the IntegerPercentageBelief to decrease.
   * @param {number} amount The amount to decrease the belief's value by.
   */
  decreasePercentageBelief(agent, beliefName, amount) {
    if (typeof amount !== 'number') {
      throw new Error("IntegerPercentageBeliefUpdater: Amount must be a number.");
    }
    const belief = agent.getBelief(beliefName);
    if (!belief) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' not found on agent '${agent.name}'.`);
    }
    if (!(belief instanceof IntegerPercentageBelief)) {
      throw new Error(`IntegerPercentageBeliefUpdater: Belief '${beliefName}' is not an IntegerPercentageBelief.`);
    }
    // Use the clampPercentage method from IntegerPercentageBelief to ensure value is within range
    const clampedValue = IntegerPercentageBelief.clampPercentage(belief.value - amount);
    this.updateBelief(agent, beliefName, clampedValue);
  }
}