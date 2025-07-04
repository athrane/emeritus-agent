import { Simulation  } from './internal.js';

// Create a new simulation instance
const simulation = new Simulation();

// Get the scene and agent from the simulation
const scene = simulation.getSimulationScene();
const agentOldMan = simulation.getAgent("Acticus");
const agentCat = simulation.getAgent("Anais");

// list rooms
const rooms2 = Array.from(scene.rooms.values());
console.log("Rooms in the scene:");
rooms2.forEach(room => {
    console.log(`- ${room.getName()} at (${room.getPosition().getX()}, ${room.getPosition().getY()}) with size (${room.getSize().getX()}, ${room.getSize().getY()})`);
});


// Run the simulation
for (let i = 0; i < 100; i++) {
    console.log(`--- Generation: ${simulation.getGeneration()} ---`);
    simulation.run();

    let agent = simulation.getAgent("Acticus");
    logAgent(agent);

    agent = simulation.getAgent("Anais");
    logAgent(agent);
}

/**
 * Log agent details.
 * @param {Agent} agent - The agent to log.
 */
function logAgent(agent) {
    console.log(`Agent Name: ${agent.getName()}`);

    let boredom = agent.getBelief("Boredom").getValue();
    let hunger = agent.getBelief("Hunger").getValue();
    let fatigue = agent.getBelief("Fatigue").getValue();
    console.log(`Boredom: ${boredom}`);
    console.log(`Hunger: ${hunger}`);
    console.log(`Fatigue: ${fatigue}`);

    let desireManager = agent.getDesireManager();
    let currentBestDesire = desireManager.getCurrentBestDesire();
    if (currentBestDesire) console.log(`Current Desire: ${currentBestDesire.getName()}`);
    else console.log("No current desire.");

    let activeDesires = desireManager.getActiveDesires();
    if (activeDesires.length > 0) {
        let logString = "Active Desires:";
        activeDesires.forEach(desire => {
            logString += ` ${desire.name}`;
            if (desire.isActive(agentOldMan)) {
                logString += "/satisfied";
            } else {
                logString += "/not satisfied";
            }
            logString += `/${desire.priority}`;

        });
        console.log(logString);
    }
    else {
        console.log("No active desires.");
    }

    let currentIntention = agent.getCurrentIntention();
    console.log(`Current Intention: ${currentIntention.name}`);

    let movement = agent.getMovement();
    let room = movement.getRoom();
    let roomPosition = room.getPosition();
    console.log(`Agent's target room: ${room.getName()} (${roomPosition.getX()}, ${roomPosition.getY()})`);
    console.log(`Agent is witin room: ${movement.isWithinRoom()}`);

    let position = movement.getPosition();
    console.log(`Current Position: (${position.getX()}, ${position.getY()})`);

    if (movement.isTargetPositionDefined()) {
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

