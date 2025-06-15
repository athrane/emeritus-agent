import { SceneFactory } from './internal.js';
import { AgentFactory } from './internal.js';
import { Agent } from './internal.js';
import { TimeManager } from './internal.js';

/**
 * Represents a simulation that contains a scene and an agent.
 * The simulation can run the agent's actions and track the generation steps.
 */ 
export class Simulation {

    /**
     * Defines the number of minutes per simulation step.
     */
    static SIMULATION_STEP_MINUTES = 10;

    /**
     * Creates a new Simulation instance with a house scene and an old man agent.
     */
    constructor() {
        this.scene = SceneFactory.createHouse();
        this.agent = AgentFactory.createOldManAgent(this.scene);
        this.step = 0;
        this.timeManager = new TimeManager(Simulation.SIMULATION_STEP_MINUTES);
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

    /**
     * Get the simulation time manager.
     * @return {TimeManager} The time manager of the simulation.
     */
    getTimeManager() {
        return this.timeManager;
    }
     
    /**
     * Run the simulation for one step.
     */
    run() {
        this.timeManager.advanceStep();
        this.agent.run();
        this.step++;
    }

}
