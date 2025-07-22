import {
  SimulationECS,
  MovementSystem,
  PositionComponent,
  VelocityComponent,
  NameComponent,
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

console.log('--- Initializing ECS Simulation ---');

// 1. Create the simulation instance
const simulation = new SimulationECS();

// 2. Get managers
const entitiesManager = simulation.getEntities();
const systemsManager = simulation.getSystems();

// 3. Add systems
systemsManager.add(new MovementSystem());
console.log('Added MovementSystem to the simulation.');

// 4. Create entities and add components
console.log('\n--- Creating Entities ---');
const movingEntity = entitiesManager.create();
movingEntity.addComponent(new NameComponent('Player'));
movingEntity.addComponent(new PositionComponent(new Position(100, 200)));
movingEntity.addComponent(new VelocityComponent(10, -5)); // Moves 10 units/sec on X, -5 on Y

const staticEntity = entitiesManager.create();
staticEntity.addComponent(new NameComponent('Tree'));
staticEntity.addComponent(new PositionComponent(new Position(50, 50)));
staticEntity.addComponent(new VelocityComponent(0, 0)); // Zero velocity, so it won't move

console.log('Initial entity states:');
logEntityDetails(entitiesManager);

// 5. Run the simulation loop
console.log('\n--- Running Simulation Loop ---');
const simulationSteps = 5;
const deltaTime = 1000; // Using 1000ms (1 second) for easy-to-follow calculations

for (let i = 0; i < simulationSteps; i++) {
  console.log(`\n[Step ${i + 1}]`);
  simulation.update(deltaTime);
  logEntityDetails(entitiesManager);
}

console.log('\n--- Simulation Complete ---');