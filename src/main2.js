import {
  SimulationECS,
  MovementSystem,
  TimeSystem,
  PositionComponent,
  VelocityComponent,
  NameComponent,
  TimeComponent,
  Position,
} from './internal.js';

/**
 * Logs the name and position of all entities that have them.
 * @param {import('./internal.js').Entities} entitiesManager
 */
function logEntityDetails(entitiesManager) {
  const entities = entitiesManager.filterByComponents(
    NameComponent,
    PositionComponent
  );

  if (entities.length === 0) {
    console.log('No entities with Name and Position to log.');
    return;
  }

  entities.forEach((entity) => {
    const name = entity.getComponent(NameComponent).getName();
    const pos = entity.getComponent(PositionComponent).getPosition();
    console.log(`- ${name}: Position(${pos.getX()}, ${pos.getY()})`);
  });
}

/**
 * Logs the current simulation time.
 * @param {import('./internal.js').Entities} entities
 */
function logTime(entities) {
  const timeEntity = entities.filterByComponents(TimeComponent)[0];
  if (!timeEntity) return;

  const timeComp = timeEntity.getComponent(TimeComponent);
  const timeOfDayObj = timeComp.getTimeOfDayAsObject();
  const hours = timeOfDayObj.getHours();
  const minutes = timeOfDayObj.getMinutes();
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  console.log(`Day ${timeComp.getDay()}, Time: ${timeString}`);
}

console.log('--- Initializing ECS Simulation ---');

// 1. Create the simulation instance
const simulation = new SimulationECS();

// 2. Get managers
const entitiesManager = simulation.getEntities();
const systemsManager = simulation.getSystems();

// 3. Add systems
systemsManager.add(new TimeSystem());
systemsManager.add(new MovementSystem());
console.log('Added TimeSystem and MovementSystem to the simulation.');

// 4. Create entities and add components
console.log('\n--- Creating Entities ---');

// Create a "global" entity to hold the time component
const timeScale = 360; // 1 real second = 6 simulation minutes
entitiesManager.create(
  new NameComponent('Global'),
  new TimeComponent(timeScale, 480) // Start at 8:00 AM
);

entitiesManager.create(
  new NameComponent('Player'),
  new PositionComponent(new Position(100, 200)),
  new VelocityComponent(10, -5) // Moves 10 units/sec on X, -5 on Y
);

entitiesManager.create(
  new NameComponent('Tree'),
  new PositionComponent(new Position(50, 50)),
  new VelocityComponent(0, 0) // Zero velocity, so it won't move
);

console.log('Initial entity states:');
logTime(entitiesManager);
logEntityDetails(entitiesManager);

// 5. Run the simulation loop
console.log('\n--- Running Simulation Loop ---');

// number of steps to simulate
const simulationSteps = 50;

// deltaTime in milliseconds for each step
const deltaTime = 1000; // Using 1000ms (1 second) for easy-to-follow calculations

for (let i = 0; i < simulationSteps; i++) {
  console.log(`\n[Step ${i + 1}]`);
  simulation.update(deltaTime);
  logTime(entitiesManager);
  logEntityDetails(entitiesManager);
}

console.log('\n--- Simulation Complete ---');