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
     * Initializes an empty map to store agents.
     */
    constructor() {
        this.step = 0;
        this.scene = SceneFactory.createHouse();
        this.timeManager = new TimeManager(Simulation.SIMULATION_STEP_MINUTES);
        this.agents = new Map();
        this.agents.set("Acticus", AgentFactory.createOldManAgent(this.scene));
        this.agents.set("Anais", AgentFactory.createCatAgent(this.scene));
        const sunAgent = AgentFactory.createSunAgent(this.scene, this.timeManager, 1); // radius=1
        this.agents.set("Sun", sunAgent);
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
    getAgent(name) {
        return this.agents.get(name);
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
        for (const agent of this.agents.values()) {
            agent.run();
        }
        this.step++;
    }

}
