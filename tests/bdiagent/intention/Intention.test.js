import { Intention } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Room } from "../../../src/internal.js";

describe('Create Intention', () => {
    it('should create a Intention object', () => {
        const noActions = [];
        const preconditions = () => true;
        const effects = () => { };
        const room = Room.create("Room", Position.create(0, 0), Position.create(10, 10));
        const location = Location.create("Kitchen", Position.create(0, 0), room);
        const intention = Intention.create("Eat", noActions, preconditions, effects, location);
        expect(intention).toBeInstanceOf(Intention);
        expect(intention.getName()).toBe("Eat");
        expect(intention.getPreconditions()).toBeInstanceOf(Function);
        expect(intention.getEffects()).toBeInstanceOf(Function);
        expect(intention.getLocation()).toBeInstanceOf(Location);
        expect(intention.getLocation().getName()).toBe("Kitchen");
		expect(location.getPhysicalPosition()).toBeInstanceOf(Position);
		expect(location.getPhysicalPosition().getX()).toBe(0);
		expect(location.getPhysicalPosition().getY()).toBe(0);
		expect(location.getRelativePosition()).toBeInstanceOf(Position);
		expect(location.getRelativePosition().getX()).toBe(0);
		expect(location.getRelativePosition().getY()).toBe(0);

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
		expect(intention.getLocation().getPhysicalPosition()).toBeInstanceOf(Position);
		expect(intention.getLocation().getPhysicalPosition().getX()).toBe(0);
		expect(intention.getLocation().getPhysicalPosition().getY()).toBe(0);
		expect(intention.getLocation().getRelativePosition()).toBeInstanceOf(Position);
		expect(intention.getLocation().getRelativePosition().getX()).toBe(0);
		expect(intention.getLocation().getRelativePosition().getY()).toBe(0);
    });

});

