import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";

export class Intention {
    constructor(name, actions, preconditions, effects) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureArray(actions);
        TypeUtils.ensureFunction(preconditions);  
        TypeUtils.ensureFunction(effects);  
        this.name = name;
        this.actions = actions; // Array of functions to execute
        this.preconditions = preconditions; // Function that returns true if the plan can be executed
        this.effects = effects; // Function to apply effects after the plan is complete
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