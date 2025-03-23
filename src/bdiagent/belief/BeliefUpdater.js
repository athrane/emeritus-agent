/**
 * Base class for updating beliefs in an Agent.
 */
export class BeliefUpdater {
    /**
     * Updates a belief in the agent.
     * @param {Agent} agent The agent whose belief needs to be updated.
     * @param {string} beliefName The name of the belief to update.
     * @param {any} newValue The new value for the belief.
     */
    updateBelief(agent, beliefName, newValue) {
      if (!agent) {
        throw new Error("BeliefUpdater: Agent must be provided.");
      }
      if (typeof beliefName !== 'string') {
        throw new Error("BeliefUpdater: beliefName must be a string.");
      }
  
      agent.updateBelief(beliefName, newValue);
    }
  }