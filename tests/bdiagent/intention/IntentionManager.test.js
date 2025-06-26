import { Intention } from "../../../src/internal.js";
import { IntentionManager } from "../../../src/internal.js";
import { Room } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";

describe('IntentionManager', () => {
    it('reset() should set currentIntention to NULL_INTENTION', () => {
        const noActions = [];
        const preconditions = () => true;
        const effects = () => { };
        const room = Room.create("Room", Position.create(0, 0), Position.create(10, 10));
        const location = Location.create("Kitchen", Position.create(0, 0), room);
        const intention = Intention.create("Eat", noActions, preconditions, effects, location);

        const manager = new IntentionManager();
        manager.currentIntention = intention;
        expect(manager.getCurrentIntention()).toBe(intention);
        manager.reset();
        expect(manager.getCurrentIntention()).toBe(IntentionManager.NULL_INTENTION);
    });
});
