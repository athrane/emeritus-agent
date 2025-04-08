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

## Description

This project includes the following classes, grouped by their respective directories:

### `src/`
- **`main.js`**: The entry point of the application. It creates and runs the agent using the `AgentFactory`.

### `src/utils/`
- **`TypeUtils`**: Provides utility methods for type checking, such as ensuring a value is an instance of a specific class or a specific type.

### `src/bdiagent`
- **`Agent`**: Represents the main agent with beliefs, desires, and intentions. It models the behavior of the NPC.
- **`AgentFactory`**: A factory class responsible for creating and initializing agents with predefined beliefs, desires, and intentions.

### `src/bdiagent/belief/`
- **`Belief`**: A base class representing a belief of the agent.
- **`IntegerPercentageBelief`**: Represents a belief with a value between 0 and 100 (e.g., hunger, fatigue).
- **`IntegerPercentageBeliefUpdater`**: Updates the value of an `IntegerPercentageBelief` over time.
- **`BeliefManager`**: Manages the beliefs of the agent, including adding, retrieving, and updating beliefs. It also handles the registration and execution of belief updaters.

### `src/bdiagent/desire/`
- **`Desire`**: Represents a desire of the agent, with conditions for activation and a priority level.

### `src/bdiagent/intention/`
- **`Intention`**: Represents an intention of the agent, with actions to execute and conditions for activation.
- **`IntentionFactory`**: A factory class that creates specific intentions, including a "null intention" used when no valid intention is applicable.

### `src/bdiagent/movement/`

- **`Location`**: Represents a 2D location with x and y coordinates.
- **`LocationFactory`**: A factory class for creating `Location` instances.
- **`Movement`**: Manages the movement of an agent within the simulation.
