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

});
