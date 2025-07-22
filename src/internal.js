// Pattern for breaking curcular dependencies: https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de

export { TypeUtils } from './utils/TypeUtils.js';
export { LogBuffer } from './utils/log/LogBuffer.js';

export { Position } from './bdiagent/movement/Position.js';
export { Location } from './bdiagent/movement/Location.js';
export { Room } from './bdiagent/movement/Room.js';
export { SceneFactory } from './bdiagent/movement/SceneFactory.js';
export { Scene } from './bdiagent/movement/Scene.js';
export { Path } from './bdiagent/movement/Path.js';
export { Motion } from './bdiagent/movement/Motion.js';
export { WalkMotion } from './bdiagent/movement/WalkMotion.js';
export { NullMotion } from './bdiagent/movement/NullMotion.js';
export { CircularMotion } from './bdiagent/movement/CircularMotion.js';

export { Belief } from './bdiagent/belief/Belief.js';
export { IntegerPercentageBelief } from './bdiagent/belief/IntegerPercentageBelief.js';
export { BeliefUpdater } from './bdiagent/belief/BeliefUpdater.js';
export { IntegerPercentageBeliefUpdater } from './bdiagent/belief/IntegerPercentageBeliefUpdater.js';
export { BeliefManager } from './bdiagent/belief/BeliefManager.js';

export { Desire } from './bdiagent/desire/Desire.js';
export { DesireFactory } from './bdiagent/desire/DesireFactory.js';
export { DesireManager } from './bdiagent/desire/DesireManager.js';

export { Intention } from './bdiagent/intention/Intention.js';
export { IntentionFactory } from './bdiagent/intention/IntentionFactory.js';
export { IntentionManager } from './bdiagent/intention/IntentionManager.js';

export { Agent } from './bdiagent/Agent.js';
export { AgentFactory } from './bdiagent/AgentFactory.js';
export { Simulation } from './Simulation.js';

export { TimeManager } from './time/TimeManager.js';
export { TimeOfDay } from './time/TimeOfDay.js';

// Exporting the ECS entity classes
export { Entity } from './entity/Entity.js';
export { Entities } from './entity/Entities.js';

// Exporting the ECS component classes
export { Component } from './component/Component.js';
export { NameComponent } from './component/NameComponent.js';

// Exporting ECS System classes
export { System } from './system/System.js';
export { Systems } from './system/Systems.js';

// Exporting ECS Movement classes 
export { PositionComponent } from './movement/PositionComponent.js';
export { VelocityComponent } from './movement/VelocityComponent.js';
export { MovementSystem } from './movement/MovementSystem.js';

