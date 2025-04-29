import { Intention } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";

describe('Create Intention', () => {
    it('should create a Intention object', () => {
        const noActions = [];
        const preconditions = () => true;
        const effects = () => { };
        const location = Location.create("Kitchen", Position.create(0, 0));
        const intention = Intention.create("Eat", noActions, preconditions, effects, location);
        expect(intention).toBeInstanceOf(Intention);
        expect(intention.getName()).toBe("Eat");
        expect(intention.getPreconditions()).toBeInstanceOf(Function);
        expect(intention.getEffects()).toBeInstanceOf(Function);
        expect(intention.getLocation()).toBeInstanceOf(Location);
        expect(intention.getLocation().getName()).toBe("Kitchen");
        expect(intention.getLocation().getPosition()).toBeInstanceOf(Position);
        expect(intention.getLocation().getPosition().getX()).toBe(0);
        expect(intention.getLocation().getPosition().getY()).toBe(0);
    });

});

describe('Create null Intention', () => {
    it('should create a null Intention object', () => {
        const intention = Intention.createNullIntention();
        expect(intention).toBeInstanceOf(Intention);
        expect(intention.getName()).toBe("NULL Intention");
        expect(intention.getPreconditions()).toBeInstanceOf(Function);
        expect(intention.getEffects()).toBeInstanceOf(Function);
        expect(intention.getLocation()).toBeInstanceOf(Location);
        expect(intention.getLocation().getName()).toBe("NULL Location (0,0)");
        expect(intention.getLocation().getPosition()).toBeInstanceOf(Position);
        expect(intention.getLocation().getPosition().getX()).toBe(0);
        expect(intention.getLocation().getPosition().getY()).toBe(0);
    });

});

