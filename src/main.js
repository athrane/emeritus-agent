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

    let currentLocation = oldMan.getCurrentLocation();
    console.log(`Agent is at location: ${currentLocation.name} (${currentLocation.x}, ${currentLocation.y})`);    
    let destination = oldMan.getDestination();
    console.log(`Agent going to location: ${destination.name} (${destination.x}, ${destination.y})`);    
    let isMoving = oldMan.isMoving();   
    console.log(`Agent is moving: ${isMoving}`);
    
}

