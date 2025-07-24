# Emeritus-agent
[![CI/CD Pipeline](https://github.com/athrane/emeritus-agent/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/athrane/emeritus-agent/actions/workflows/ci-cd.yml) 
[![codecov](https://codecov.io/gh/athrane/emeritus-agent/branch/main/graph/badge.svg)](https://codecov.io/gh/athrane/emeritus-agent)

Experiment with a belief–desire–intention (BDI) agent for an old man living in a house.

## Usage 

### BDI Agent Simulation

To run the agent simulation, open the terminal in your Codespace and execute the following command:

```sh
npm start
```

This will run the `src/main.js` file using Node.js. Ensure that all dependencies are installed by running `npm install` before executing the script.

### ECS Simulation

To run the new Entity-Component-System (ECS) simulation, use the following command:

```sh
npm run start:ecs
```

This will execute the `src/main2.js` file, which demonstrates the ECS architecture with a simple movement system.

## Build

The project uses `esbuild` to bundle the source code into single files for distribution.

### BDI Agent Simulation

To build the BDI agent simulation, run the following command:

```sh
npm run build
```

### ECS Agent Simulation

To build the ECS simulation, run the following command:

```sh
npm run build:ecs
```
### What the build commands does

This command uses `esbuild` with the following parameters:

- `--bundle`: Bundles all dependencies and source files into a single file.
- `--outfile=dist/bundle.js`: Specifies the output file location as `dist/bundle.js`.
- `--format=esm`: Ensures the output file is in ES Module format, preserving `import/export` syntax.
- `--target=esnext`: Ensures the code is not transpiled and remains in ESNext syntax.
- `--minify-whitespace`: Removes unnecessary whitespace from the output file to reduce its size.

The bundled file is placed in the `dist/` directory, making it ready for distribution or deployment.

### Running the Bundled File

To run the `bundle.js` file from the root directory of the project, use the following command in the terminal:

```sh
node dist/bundle.js
```

This will execute the bundled code and display the output in the terminal.

### Installing `esbuild`

`esbuild` was installed as a development dependency using the following command:

```sh
npm install esbuild --save-dev
```

This ensures that `esbuild` is available for building the project but is not included in the production dependencies.

## Unit Testing

This project uses the **Jest** framework for unit testing. Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.


### Babel Configuration for Jest

To ensure that Jest can properly run tests with modern JavaScript syntax (including ES modules, JSX, and other features), Babel is used to transpile the code before it is executed by Jest. Babel transforms the source code into a format that is compatible with the Node.js environment used by Jest.

The Babel configuration is defined in the `.babelrc` file in the root of the project. This file specifies the presets and plugins that Babel should use when transpiling the code.

```json
{
  "presets": ["@babel/preset-env"]
}
```

### Running Tests

To run the tests, execute the following command in the terminal:

```sh
npm test
```

This will execute all test files located in the `tests` directory.

### Installing Jest

Jest was installed as a development dependency using the following command:

```sh
npm install --save-dev jest
```

### Test Directory Structure

All test files are located in the `tests` directory, which mirrors the structure of the `src` directory. For example:

```plaintext
/workspaces/emeritus-agent
├── src
│   ├── main.js
│   ├── bdiagent
│   │   ├── Agent.js
│   │   ├── AgentFactory.js
│   │   └── ...
│   └── ...
├── tests
│   ├── main.test.js
│   ├── bdiagent
│   │   ├── Agent.test.js
│   │   ├── AgentFactory.test.js
│   │   └── ...
├── package.json
└── jest.config.js
```

This structure ensures that test files are organized and easy to locate.

### `jest.config.js` Description

The `jest.config.js` file is located in the root of the project and is used to configure Jest. It specifies various settings that Jest uses when running tests, such as the test environment, module resolution, and code transformation.

```javascript
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'mjs'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

export default config;
```

## Class Reference

### Core Simulation
**Simulation**: Orchestrates the simulation loop, manages agents, and coordinates time and scene updates.
**SimulationECS**: Orchestrates the ECS simulation loop, managing entity and system managers.

### Entity-Component-System (ECS)
#### Entities
**Entity**: General-purpose object with a unique ID, can have components attached.
**Entities**: Manager for creating, storing, and querying entities.

#### Components
**Component**: Abstract base class for all components.
**NameComponent**: Stores a string name for an entity.
**PositionComponent**: Stores an entity's position.
**VelocityComponent**: Stores an entity's velocity.
**SceneComponent**: Associates entities with a scene.
**TimeComponent**: Stores time-related data for an entity.

#### Systems
**System**: Abstract base class for all systems.
**Systems**: Manager for registering and executing systems.
**MovementSystem**: Updates entity positions based on velocity and time.
**TimeSystem**: Updates time components and manages simulation time.

### BDI Agent System
**Agent**: Main BDI agent class integrating belief, desire, intention, and motion systems.
**AgentFactory**: Factory for creating and initializing agents.

#### Belief System
**Belief**: Abstract base class for agent beliefs.
**IntegerPercentageBelief**: Belief with a value between 0 and 100.
**BeliefUpdater**: Abstract class for updating beliefs.
**IntegerPercentageBeliefUpdater**: Updates IntegerPercentageBelief by a rate.
**BeliefManager**: Manages beliefs and updaters for an agent.

#### Desire System
**Desire**: Represents a possible goal for the agent.
**DesireFactory**: Factory for creating desires.
**DesireManager**: Manages and evaluates desires for the agent.

#### Intention System
**Intention**: Represents a plan or commitment to achieve a desire.
**IntentionFactory**: Factory for creating intentions from desires.
**IntentionManager**: Manages the agent's current intention and execution.

### Motion & Environment
**Motion**: Abstract base/interface for agent motion systems.
**WalkMotion**: Implements walking motion and pathfinding.
**CircularMotion**: Implements circular motion for agents (e.g., Sun agent).
**NullMotion**: No-op motion for stationary agents.
**Position**: Immutable 2D coordinate (x, y).
**Location**: Named point of interest in a room, with a position.
**Room**: Area in the environment, with a name, position, size, and locations.
**Scene**: Manages all rooms and locations, provides pathfinding.
**SceneFactory**: Utility for creating standard scenes (e.g., a house).
**SceneComponent**: ECS component for associating entities with a scene.
**Path**: Sequence of room names representing a route between locations.

### Time System
**TimeManager**: Tracks simulation time, steps, and day/night cycle.
**TimeOfDay**: Represents hours and minutes, with formatting utilities.

### Utilities
**TypeUtils**: Static type-checking and validation helpers.
**LogBuffer**: Buffered logging utility for simulation output.
**LogHelper**: Helper class for logging simulation details.
