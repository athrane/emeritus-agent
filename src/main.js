import { Simulation  } from './internal.js';

// Create a new simulation instance
const simulation = new Simulation();

// Get the scene and agent from the simulation
const scene = simulation.getSimulationScene();
const oldMan = simulation.getSimulationAgent();

// Run the agent
for (let i = 0; i < 30; i++) {
    simulation.run();

    console.log(`--- Generation: ${simulation.getGeneration() + 1} ---`);

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

    let movement = oldMan.getMovement();
    let room = movement.getRoom();
    let roomPosition = room.getPosition(); 
    console.log(`Agent's target room: ${room.getName()} (${roomPosition.getX()}, ${roomPosition.getY()})`);
    console.log(`Agent is witin room: ${movement.isWithinRoom()}`);

    let position = movement.getPosition();
    console.log(`Current Position: (${position.getX()}, ${position.getY()})`);

    if(movement.isTargetPositionDefined()) {
        let targetPosition = movement.getTargetPosition();
        console.log(`Target Position: (${targetPosition.getX()}, ${targetPosition.getY()})`);
    }
    else {
        console.log("No target position.");
    }
    let destination = movement.getDestination();
    if (destination) {
        let destinationPosition = destination.getPhysicalPosition();
        console.log(`Agent going to location: ${destination.name} (${destinationPosition.getX()}, ${destinationPosition.getY()})`);
    } else {
        console.log("No destination.");
    }
    let isMoving = movement.isMoving();
    console.log(`Agent is moving: ${isMoving}`);

    let path = movement.path;
    if (path) {
        console.log(`Path length: ${path.getLength()}`);
        console.log(`Path: ${path.getRoomNames()}`);
        console.log(`Current index: ${path.currentIndex}`);
    } else {
        console.log("No path.");
    }

}

