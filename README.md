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

## Installing the bundle build into the Cables.gl patch

To install the bundle build into the Cables.gl patch, follow these steps:

### Create versioned bundle.js file

* Download the `bundle.js` file.
* Soft version the file by renaming the bundle file with the current, e.g. `bundle-020625.js`

### Delete to old bundle.js file

* Open the Cables.gl patch.
* Locate and open the `RunAgent2` operator.
* Locate the LIBS section of the configuration, delete the reference to the used bundle.js file.
* Select the Patch Files menu.
* Delete the current `bundle-{some-date}.js` file.

### Upload new bundle.js file

* Select the Patch `Files` menu.
* Upload the `bundle-020625.js` file created previouly.
* Locate and open the `RunAgent2` operator.
* Locate the LIBS section of the configuration, delete reference to the used `bundle-{some-date}.js` file. 
* Look in the Cables.gl log and fix the errors.

### How to re-create the RunAgent operator if Cables.gl deletes it

In some cases Cables.gl will delete the operator, e.g. of there are code errors or interfaces changes.
Follow these steps to re-create the operator:


* Add this logic t the operator:

```javascript
Ops.User.thrane.runAgent2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
// welcome to your new op!
// have a look at the documentation:
// https://cables.gl/docs/5_writing_ops/dev_ops/dev_ops

const
    exec = op.inTrigger("Trigger"),
    myOutPort = op.outString("Intention"),
    myOutPort2 = op.outNumber("Hunger");

// create agent
var oldMan=AgentFactory.createOldManAgent();

exec.onTriggered = () =>
{
    oldMan.run();

    let currentIntention = oldMan.getCurrentIntention();
    myOutPort.set(currentIntention.name);

    let hunger = oldMan.getBelief("hunger").getValue()
    myOutPort2.set(hunger);
};
```

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

## Description

This project includes the following classes, grouped by their respective directories:

### `src/`
- **`main.js`**: The entry point of the application. It sets up the simulation environment and agent, then runs the simulation loop.

### `src/utils/`
- **`TypeUtils`**: Provides static utility methods for runtime type checking, such as ensuring a value is an instance of a specific class or a primitive type (e.g., `isInstanceOf`, `isNumber`).

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
