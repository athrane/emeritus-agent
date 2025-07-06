import { Simulation } from './internal.js';

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

    agent = simulation.getAgent("Sun");
    logAgent(agent);
}

/**
 * Log agent details.
 * @param {Agent} agent - The agent to log.
 */
function logAgent(agent) {
    console.log(`Agent Name: ${agent.getName()}`);

    // Log all beliefs using BeliefManager.getBeliefs()
    const beliefs = agent.getBeliefManager().getBeliefs();
    beliefs.forEach(belief => {
        if (belief && belief.getName && belief.getValue) {
            console.log(`${belief.getName()}: ${belief.getValue()}`);
        }
    });

    let desireManager = agent.getDesireManager();
    let currentBestDesire = desireManager.getCurrentBestDesire();
    if (currentBestDesire) console.log(`Current Desire: ${currentBestDesire.getName()}`);
    else console.log("No current desire.");

    let activeDesires = desireManager.getActiveDesires();
    if (activeDesires.length > 0) {
        let logString = "Active Desires:";
        activeDesires.forEach(desire => {
            logString += ` ${desire.name}`;
            if (desire.isActive(agent)) {
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

    let motion = agent.getMotion();
    let room = motion.getRoom();
    let roomPosition = room && room.getPosition ? room.getPosition() : { getX: () => 'N/A', getY: () => 'N/A' };
    console.log(`Agent's target room: ${room && room.getName ? room.getName() : 'N/A'} (${roomPosition.getX()}, ${roomPosition.getY()})`);
    console.log(`Agent is witin room: ${motion.isWithinRoom ? motion.isWithinRoom() : 'N/A'}`);

    let position = motion.getPosition();
    if (position && position.getX && position.getY) {
        console.log(`Current Position: (${position.getX()}, ${position.getY()})`);
    } else {
        console.log("Current Position: N/A");
    }

    if (motion.isTargetPositionDefined && motion.isTargetPositionDefined()) {
        let targetPosition = motion.getTargetPosition();
        if (targetPosition && targetPosition.getX && targetPosition.getY) {
            console.log(`Target Position: (${targetPosition.getX()}, ${targetPosition.getY()})`);
        } else {
            console.log("Target Position: N/A");
        }
    }
    else {
        console.log("No target position.");
    }
    let destination = motion.getDestination ? motion.getDestination() : null;
    if (destination && destination.getPhysicalPosition) {
        let destinationPosition = destination.getPhysicalPosition();
        console.log(`Agent going to location: ${destination.name} (${destinationPosition.getX()}, ${destinationPosition.getY()})`);
    } else {
        console.log("No destination.");
    }
    let isMoving = motion.isMoving ? motion.isMoving() : false;
    console.log(`Agent is moving: ${isMoving}`);

    let path = motion.path;
    if (path) {
        if (path.getLength && path.getRoomNames && path.currentIndex !== undefined) {
            console.log(`Path length: ${path.getLength()}`);
            console.log(`Path: ${path.getRoomNames()}`);
            console.log(`Current index: ${path.currentIndex}`);
        } else {
            console.log("Path: [object] (details unavailable)");
        }
    } else {
        console.log("No path.");
    }
}

