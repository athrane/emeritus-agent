import {
  SimulationECS,
  MovementSystem,
  TimeSystem,
  PositionComponent,
  VelocityComponent,
  NameComponent,
  TimeComponent,
  Position,
  SceneFactory,
  LogHelper
} from './internal.js';

console.log('--- Initializing ECS Simulation ---');

// 1. Create the simulation instance
const scene =  SceneFactory.createHouse();
const simulation = new SimulationECS(scene);

// 2. Get ECS core classes
const entities = simulation.getEntities();
const systems = simulation.getSystems();

// 3. Add systems
systems.add(new TimeSystem());
systems.add(new MovementSystem());
console.log('Added TimeSystem and MovementSystem to the simulation.');

// 4. Create entities and add components
console.log('\n--- Creating Entities ---');

// Create a "global" entity to hold the time component
const timeScale = 360; // 1 real second = 6 simulation minutes
entities.create(
  new NameComponent('Global'),
  new TimeComponent(timeScale, 480) // Start at 8:00 AM
);

entities.create(
  new NameComponent('Player'),
  new PositionComponent(new Position(100, 200)),
  new VelocityComponent(10, -5) // Moves 10 units/sec on X, -5 on Y
);

entities.create(
  new NameComponent('Tree'),
  new PositionComponent(new Position(50, 50)),
  new VelocityComponent(0, 0) // Zero velocity, so it won't move
);

console.log('\nInitial entity states:');
LogHelper.logSceneDetails(scene);
LogHelper.logTime(entities);
LogHelper.logEntityDetails(entities);

// 5. Run the simulation loop
console.log('\n--- Running Simulation Loop ---');

// number of steps to simulate
const simulationSteps = 10;

// deltaTime in milliseconds for each step
const deltaTime = 1000; // Using 1000ms (1 second) for easy-to-follow calculations

for (let i = 0; i < simulationSteps; i++) {
  console.log(`\n[Step ${i + 1}]`);
  simulation.update(deltaTime);
  LogHelper.logTime(entities);
  LogHelper.logEntityDetails(entities);
}

console.log('\n--- Simulation Complete ---');