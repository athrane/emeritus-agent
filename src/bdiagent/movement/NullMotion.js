import { Motion } from "./Motion.js";

/**
 * NullMotion: Implements a no-op motion system for agents that do not move.
 */
export class NullMotion extends Motion {
    constructor() {
        super();
    }
    getSpeed() { return 0; }
    getPosition() { return null; }
    getDestination() { return null; }
    getRoom() { return null; }
    isWithinRoom() { return true; }
    isMoving() { return false; }
    isTargetPositionDefined() { return false; }
    canReachTargetPosition() { return false; }
    getTargetPosition() { return null; }
    hasReachedFinalDestination() { return true; }
    getPath() { return null; }
    moveTo(destination) { /* no-op */ }
    isWithinReasonableRange(location) { return true; }
    update() { return true; }
}
