import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";

describe('Location', () => {
	it('should create a Location object with correct coordinates', () => {
		const position = Position.create(1, 2);
		const location = Location.create("L1", position);
		expect(location).toBeInstanceOf(Location);
		expect(location.name).toBe("L1");
		expect(location.getPosition()).toBeInstanceOf(Position);
		expect(location.getPosition().getX()).toBe(1);
		expect(location.getPosition().getY()).toBe(2);
	});

	it('should create a copy of the location correctly', () => {
		const position1 = Position.create(1, 2);
		const location1 = Location.create("L1", position1);
		const location2 = location1.copy();
		expect(location2.name).toBe("L1");
		expect(location2.getPosition().getX()).toBe(1);
		expect(location2.getPosition().getY()).toBe(2);
		expect(location2).not.toBe(location1); // Ensure it's a new object
	});

});
