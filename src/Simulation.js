import { SceneFactory } from './internal.js';
import { AgentFactory } from './internal.js';
import { Agent } from './internal.js';

/**
 * Represents a simulation that contains a scene and an agent.
 * The simulation can run the agent's actions and track the generation steps.
 */ 
export class Simulation {

    constructor() {
        this.scene = SceneFactory.createHouse();
        this.agent = AgentFactory.createOldManAgent(this.scene);
        this.step = 0;
    }

    /**
     * Get the simulation scene.
     * @return {Scene} The scene of the simulation.
     */ 
    getSimulationScene() {
        return this.scene;
    }

    /**
     * Get the simulation agent.
     * @return {Agent} The agent of the simulation.
     */ 
    getSimulationAgent() {
        return this.agent;
    }

    /**
     * Get the current generation step.
     * @return {number} The current generation step.
     */
    getGeneration() {
        return this.step;
    }
     

    run() {
        this.agent.run();
        this.step++;
    }

}
