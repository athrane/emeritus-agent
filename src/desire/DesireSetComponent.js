import { Component, TypeUtils, Desire2 } from '../internal.js';

/**
 * An ECS component that holds the complete set of potential desires for an agent.
 * This component defines the agent's entire behavioral repertoire, representing all
 * possible goals the agent might pursue.
 */
export class DesireSetComponent extends Component {
    /**
     * @type {Map<string, Desire2>}
     */
    #desires = new Map();

    /**
     * @param {...Desire2} desires - A list of Desire2 instances to initialize the component with.
     */
    constructor(...desires) {
        super();
        for (const desire of desires) {
            this.addDesire(desire);
        }
    }

    /**
     * Adds a Desire2 to the set.
     * @param {Desire2} desire - The Desire2 instance to add.
     * @throws {Error} If a desire with the same name already exists.
     * @throws {TypeError} If the provided argument is not an instance of Desire2.
     */
    addDesire(desire) {
        if (!(desire instanceof Desire2)) {
            throw new TypeError('Argument must be an instance of Desire2.');
        }
        const name = desire.getName();
        if (this.#desires.has(name)) {
            throw new Error(`Desire with name "${name}" already exists in the set.`);
        }
        this.#desires.set(name, desire);
    }

    /**
     * Retrieves a Desire2 by its name.
     * @param {string} name - The name of the desire to retrieve.
     * @returns {Desire2 | undefined} The desire, or undefined if not found.
     */
    getDesire(name) {
        TypeUtils.ensureString(name);
        return this.#desires.get(name);
    }

    /**
     * Checks if a desire with the given name exists in the set.
     * @param {string} name - The name of the desire to check.
     * @returns {boolean} True if the desire exists, false otherwise.
     */
    hasDesire(name) {
        TypeUtils.ensureString(name);
        return this.#desires.has(name);
    }

    /**
     * Returns an array of all Desire2 instances in the set.
     * @returns {Desire2[]} An array of all desires.
     */
    getAllDesires() {
        return Array.from(this.#desires.values());
    }
}