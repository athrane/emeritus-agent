import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";
import { Location } from "../../internal.js";

/**
 * Represents an intention for an agent in a BDI (Belief-Desire-Intention) architecture.
 * 
 * An intention consists of a name, a set of actions to execute, preconditions that must be met
 * before executing the actions, and effects to apply after the actions are executed.
 */
export class Intention {

    static EXECUTION_RANGE = 0.01; // Reasonable range for execution

    /**
     * Constructor for the Intention class.
     * 
     * @param {string} name The name of the intention.
     * @param {Array<Function>} actions The actions to execute. Array of functions that take an agent as an argument.
     * @param {Function} preconditions The preconditions function. Function that returns true if the plan can be executed.
     * @param {Function} effects The effects function. Function that applies effects after the plan is complete.
     * @param {Location} location The location associated with the intention.
     */
    constructor(name, actions, preconditions, effects, location) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureArray(actions);
        TypeUtils.ensureFunction(preconditions);  
        TypeUtils.ensureFunction(effects);  
        TypeUtils.ensureInstanceOf(location, Location);

        this.name = name;
        this.actions = actions; 
        this.preconditions = preconditions; 
        this.effects = effects; 
        this.location = location; 
    }

    /**
     * Returns the name of the intention.
     *
     * @returns {string} The name of the intention.
     */
    getName() {
        return this.name;
    }    

    /**
     * Returns the location associated with the intention.
     * 
     * @returns {Location} The location of the intention.
     */  
    getLocation() {
        return this.location;
    }

    /**
     * Returns the preconditions of the intention.
     * 
     * @returns {Function} The preconditions function.
     */
    getPreconditions() {
        return this.preconditions;
    }    

    /**
     * Returns the effects of the intention.
     * 
     * @returns {Function} The effects function.
     */ 
    getEffects() {
        return this.effects;
    }    

    /**
     * Return if plan of action can be executed.
     * 
     * @returns {string} True if intention can be executed, false otherwise.
     */
    canExecute(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.preconditions(agent);
    }

    /**
     * Executes the actions of the intention if the preconditions are met.
     * 
     * @param {Agent} agent The agent executing the intention.
     * @returns {boolean} True if the intention was executed, false otherwise.
     */
    execute(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        if (this.canExecute(agent)) {
            this.actions.forEach(action => action(agent));
            this.effects(agent);
            return true; // Indicate successful execution
        }
        return false; // Indicate failure to execute
    }


    /**
     * Creates a new intention instance.
     *
     * @param {string} name The name of the intention.
     * @param {Array<Function>} actions The actions to execute.
     * @param {Function} preconditions The preconditions function. 
     * @param {Function} effects The effects function.
     * @param {Location} location The location associated with the intention.
     * @returns {Intention} A new Intention instance.
     */
    static create(name, actions, preconditions, effects, location) {
        return new Intention(name, actions, preconditions, effects, location);
    }


    /**
     * Creates a new null intention instance.
     */
    static createNullIntention() {
        return new Intention(
            "NULL Intention", // Name of the intention
            [
                (agent) => {
                    //console.log("Doing nothing.");
                }
            ], // Actions to execute
            (agent) => true, // Preconditions (always true for a null intention)
            (agent) => {}, // Effects (no effects for a null intention)
            Location.createNullLocation() // add null location
        );
    }

}