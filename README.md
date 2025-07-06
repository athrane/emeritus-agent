# Emeritus-agent
Experiment with a belief–desire–intention (BDI) agent for an old man living in a house.

## Usage 

To run the script, open the terminal in your Codespace and execute the following command:

```sh
npm start
```

This will run the `src/main.js` file using Node.js. Ensure that all dependencies are installed by running `npm install` before executing the script.

## Build

The project uses `esbuild` to bundle the source code into a single file for distribution. To build the project, run the following command in the terminal:

```sh
npm run build
```

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
- **Simulation**: Orchestrates the simulation loop, manages agents, and coordinates time and scene updates.

### BDI Agent System
- **Agent**: The main BDI agent class. Integrates belief, desire, intention, and motion systems. Runs the agent's decision and action loop.
- **AgentFactory**: Factory for creating and initializing agents with default or custom configurations.

#### Belief System
- **Belief**: Abstract base class for agent beliefs.
- **IntegerPercentageBelief**: Belief with a value between 0 and 100 (e.g., hunger).
- **BeliefUpdater**: Abstract class for updating beliefs.
- **IntegerPercentageBeliefUpdater**: Updates an IntegerPercentageBelief by a rate.
- **BeliefManager**: Manages all beliefs and updaters for an agent.

#### Desire System
- **Desire**: Represents a possible goal for the agent.
- **DesireFactory**: Factory for creating desires.
- **DesireManager**: Manages and evaluates all desires for the agent.

#### Intention System
- **Intention**: Represents a plan or commitment to achieve a desire.
- **IntentionFactory**: Factory for creating intentions from desires.
- **IntentionManager**: Manages the agent's current intention and execution.

### Motion & Environment
- **Motion**: Abstract base/interface for agent motion systems (e.g., walking, stationary).
- **WalkMotion**: Implements walking motion, pathfinding, and stepwise movement.
- **NullMotion**: Implements a no-op motion for stationary agents.
- **Position**: Immutable 2D coordinate (x, y).
- **Location**: Named point of interest in a room, with a position.
- **Room**: Area in the environment, with a name, position, size, and locations.
- **Scene**: Manages all rooms and locations, provides pathfinding.
- **SceneFactory**: Utility for creating standard scenes (e.g., a house).
- **Path**: Sequence of room names representing a route between locations.

### Time System
- **TimeManager**: Tracks simulation time, steps, and day/night cycle.
- **TimeOfDay**: Represents hours and minutes, with formatting utilities.

### Utilities
- **TypeUtils**: Static type-checking and validation helpers.
- **LogBuffer**: Buffered logging utility for simulation output.

## Description

This project includes the following classes, grouped by their respective directories:

### `src/`
- **`main.js`**: The entry point of the application. It sets up the simulation environment and agent, then runs the simulation loop.

### `src/bdiagent`
- **`Agent`**: Represents the core BDI agent. It integrates the `BeliefManager`, `DesireManager`, and `Movement` components. It processes its beliefs, selects the most pressing desire, forms an intention, and executes actions (including movement) in each simulation tick.
- **`AgentFactory`**: A factory class responsible for creating and initializing `Agent` instances with predefined configurations, including initial beliefs, desires, intentions, and the simulation scene.

### `src/bdiagent/belief/`
- **`Belief`**: An abstract base class representing a belief held by the agent. Beliefs have a name and a value.
- **`IntegerPercentageBelief`**: A concrete implementation of `Belief` representing a value between 0 and 100 (e.g., hunger, fatigue, bladder level).
- **`IntegerPercentageBeliefUpdater`**: A class responsible for updating the value of a specific `IntegerPercentageBelief` over time based on a defined rate.
- **`BeliefManager`**: Manages the agent's collection of beliefs. It allows adding, retrieving, and updating beliefs. It also handles the registration and execution of `BeliefUpdater` instances during the simulation tick.

### `src/bdiagent/desire/`
- **`Desire`**: Represents a potential goal or state the agent wants to achieve. Each desire has conditions (based on beliefs) for activation and a priority level.
- **`DesireManager`**: Manages the agent's desires. It allows adding and retrieving desires. Its primary role is to evaluate active desires based on the current state of the agent's beliefs and select the desire with the highest priority.

### `src/bdiagent/intention/`
- **`Intention`**: Represents the agent's commitment to achieve a selected desire. It encapsulates the plan or sequence of actions (including target locations for movement) required to fulfill the desire. It has conditions for completion.
- **`IntentionFactory`**: A factory class used to create specific `Intention` instances based on the activated `Desire`. It includes logic for creating a default "null intention" when no desire is active or achievable.

### `src/bdiagent/movement/`
- **`Position`**: Represents an immutable 2D coordinate (x, y) within the simulation environment. Used as the basic unit for defining locations and room boundaries.
- **`Location`**: Represents a named point of interest within a `Room` (e.g., "Kitchen Sink", "Bed"). Defined by a name and a `Position`. Objects are mutable.
- **`Room`**: Represents a distinct area (e.g., "Kitchen", "Bedroom") defined by a name, position, size, and connections to adjacent rooms. Contains a list of `Location` objects within its boundaries. Objects are mutable.
- **`Scene`**: Manages the overall simulation environment, containing all `Room` objects and their `Location`s. Provides pathfinding capabilities (`findShortestPath`) using Breadth-First Search (BFS) to determine the sequence of rooms needed to travel between two locations.
- **`SceneFactory`**: A utility class designed to create pre-configured `Scene` objects, such as a standard house layout with interconnected rooms.
- **`Path`**: Represents an ordered sequence of room names, defining a route between two locations as calculated by `Scene.findShortestPath`.
- **`Movement`**: Manages an agent's physical presence and movement within the `Scene`. It tracks the agent's current `Position`, target `Location`, and calculates position updates based on speed and the path required to reach the destination.
- **`Motion`**: Abstract base class/interface for all agent motion systems. Defines the required interface for movement-related methods (e.g., `getSpeed`, `getPosition`, `moveTo`, `update`).
- **`WalkMotion`**: Implements the `Motion` interface for walking agents (e.g., man, cat). Handles pathfinding, stepwise movement, and room transitions.
- **`NullMotion`**: Implements the `Motion` interface as a no-op for agents that do not move. All movement methods are inert.

### `src/time/`
- **`TimeManager`**: Tracks the simulation time, including the current step, time of day, and day count. Provides methods to advance time and query the current time state.
- **`TimeOfDay`**: Represents the time of day as hours and minutes, with utility methods for formatting and comparison.

### `src/utils/`
- **`TypeUtils`**: Provides static utility methods for runtime type checking, such as ensuring a value is an instance of a specific class or a primitive type (e.g., `isInstanceOf`, `isNumber`).
- **`LogBuffer`**: (Located in `src/utils/log/LogBuffer.js`) A simple logging utility for buffering and retrieving log messages during simulation.
