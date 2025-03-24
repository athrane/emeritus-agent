import { TypeUtils } from "../../internal.js";
import { Agent } from "../../internal.js";

export class Desire {
    constructor(name, condition, priority) {
        TypeUtils.ensureString(name);
        TypeUtils.ensureFunction(condition);
        TypeUtils.ensureNumber(priority);   
        this.name = name;
        this.condition = condition; // Function that returns true if the desire is active
        this.priority = priority;
    }

    isSatisfied(agent) {
        TypeUtils.ensureInstanceOf(agent, Agent);
        return this.condition(agent);
    }
}