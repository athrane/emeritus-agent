# emeritus
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

### Installing `esbuild`

`esbuild` was installed as a development dependency using the following command:

```sh
npm install esbuild --save-dev
```

This ensures that `esbuild` is available for building the project but is not included in the production dependencies.

## Description

This project includes a `Agent` class that models a NPC with a name and age. The `main.js` file demonstrates its usage by creating an instance and invoking its methods.
