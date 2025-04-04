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

    canExecute(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.preconditions(agent);
    }

    execute(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        if (this.canExecute(agent)) {
            this.actions.forEach(action => action(agent));
            this.effects(agent);
            return true; // Indicate successful execution
        }
        return false; // Indicate failure to execute
    }
}