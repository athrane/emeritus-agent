import { AgentFactory } from './internal.js';
import { Agent } from './internal.js';

// Create the agent using the factory
const oldMan = AgentFactory.createOldManAgent();

// Run the agent
for (let i = 0; i < 100; i++) {
    oldMan.run();
    console.log(`--- Generation: ${i + 1} ---`);
    let boredom = oldMan.getBelief("boredom").getValue();
    let hunger = oldMan.getBelief("hunger").getValue();
    let fatigue = oldMan.getBelief("fatigue").getValue();;
    console.log(`Boredom: ${boredom}`);
    console.log(`Hunger: ${hunger}`);
    console.log(`Fatigue: ${fatigue}`);

    let currentBestDesire = oldMan.getCurrentBestDesire();
    if(currentBestDesire) { 
        console.log(`Current Desire: ${currentBestDesire.name}`);
    }
     
    let currentIntention = oldMan.getCurrentIntention();
    console.log(`Current Intention: ${currentIntention.name}`);
       
}

