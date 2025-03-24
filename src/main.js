import { AgentFactory } from './AgentFactory.js';

// Create the agent using the factory
const oldMan = AgentFactory.createOldManAgent();

// Run the agent
for (let i = 0; i < 100; i++) {
    console.log(`--- Tick ${i + 1} ---`);
    oldMan.run();
}

