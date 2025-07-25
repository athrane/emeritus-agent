import {
  SimulationECS,
  MovementSystem,
  TimeSystem,
  BeliefUpdateSystem,
  PositionComponent,
  VelocityComponent,
  NameComponent,
  TimeComponent,
  Position,
  SceneComponent,
  SceneFactory,
  LogHelper,
  HungerBeliefComponent,
  HungerUpdateComponent,
  FatigueBeliefComponent,
  FatigueUpdateComponent,
  BoredomBeliefComponent,
  BoredomUpdateComponent,
  DentalHygieneBeliefComponent,
  DentalHygieneUpdateComponent,
  BodyHygieneBeliefComponent,
  BodyHygieneUpdateComponent,
  HandHygieneBeliefComponent,
  HandHygieneUpdateComponent,
  UrinationBeliefComponent,
  UrinationUpdateComponent
} from './internal.js';

console.log('--- Initializing ECS Simulation ---');

// 1. Create the simulation instance
const scene =  SceneFactory.createHouse();
const simulation = new SimulationECS();

// 2. Get ECS core classes
const entities = simulation.getEntities();
const systems = simulation.getSystems();

// 3. Add systems
systems.add(new TimeSystem());
systems.add(new MovementSystem());
systems.add(new BeliefUpdateSystem());
console.log('Added TimeSystem, MovementSystem, and BeliefUpdateSystem to the simulation.');

// 4. Create entities and add components
console.log('\n--- Creating Entities ---');

// Create a "global" entity to hold the time component
const timeScale = 360; // 1 real second = 6 simulation minutes
entities.create(
  new NameComponent('Global'),
  new TimeComponent(timeScale, 480), // Start at 8:00 AM
  new SceneComponent(scene)
);

entities.create(
  new NameComponent('Acticus'),
  new PositionComponent(new Position(0, 0)),
  new VelocityComponent(0.1, 0.1), // Moves at 0.1 units per second
  new HungerBeliefComponent(0),    
  new HungerUpdateComponent(1), // Hunger increases by 1 per real second
  new FatigueBeliefComponent(0),   
  new FatigueUpdateComponent(0.5), 
  new BoredomBeliefComponent(50),  
  new BoredomUpdateComponent(2),   
  new DentalHygieneBeliefComponent(80), 
  new DentalHygieneUpdateComponent(0), 
  new BodyHygieneBeliefComponent(0), 
  new BodyHygieneUpdateComponent(0.3), 
  new HandHygieneBeliefComponent(0), 
  new HandHygieneUpdateComponent(0), 
  new UrinationBeliefComponent(0), 
  new UrinationUpdateComponent(2)
);

entities.create(
  new NameComponent('Anias'),
  new PositionComponent(new Position(0, 0)),
  new VelocityComponent(0.25, 0.25), // Moves at 0.25 units per second
  new HungerBeliefComponent(0), 
  new HungerUpdateComponent(1), // Hunger increases by 1 per real second
  new FatigueBeliefComponent(0),   
  new FatigueUpdateComponent(0.5), 
  new BoredomBeliefComponent(0),   
  new BoredomUpdateComponent(0)    
);

entities.create(
  new NameComponent('Tree'),
  new PositionComponent(new Position(50, 50)),
  new VelocityComponent(0, 0) // Zero velocity, so it won't move
);

console.log('\nInitial entity states:');
LogHelper.logSceneDetails(entities);
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