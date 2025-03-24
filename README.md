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

- `--bundle`: Bundles all dependencies into a single file.
- `--outfile=dist/bundle.js`: Specifies the output file location as `dist/bundle.js`.

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

## Description

This project includes the following classes, grouped by their respective directories:

### `src/`
- **`main.js`**: The entry point of the application. It creates and runs the agent using the `AgentFactory`.

### `src/utils/`
- **`TypeUtils`**: Provides utility methods for type checking, such as ensuring a value is an instance of a specific class or a specific type.

### `src/`
- **`Agent`**: Represents the main agent with beliefs, desires, and intentions. It models the behavior of the NPC.
- **`AgentFactory`**: A factory class responsible for creating and initializing agents with predefined beliefs, desires, and intentions.

### `src/beliefs/`
- **`IntegerPercentageBelief`**: Represents a belief with a value between 0 and 100 (e.g., hunger, fatigue).
- **`IntegerPercentageBeliefUpdater`**: Updates the value of an `IntegerPercentageBelief` over time.

### `src/desires/`
- **`Desire`**: Represents a desire of the agent, with conditions for activation and a priority level.

### `src/intentions/`
- **`Intention`**: Represents an intention of the agent, with actions to execute and conditions for activation.

This modular structure ensures that the agent's behavior is easy to extend and maintain.
