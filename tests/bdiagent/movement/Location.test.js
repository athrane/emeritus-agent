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

	it('should calculate the distance to another location correctly, only x dimension', () => {
		const position1 = Position.create(0, 0);
		const position2 = Position.create(7, 0);
		const location1 = Location.create("L1", position1);
		const location2 = Location.create("L2", position2);
		expect(location1.distanceTo(location2)).toBe(7);
	});

	it('should calculate the distance to another location correctly, only y dimension', () => {
		const position1 = Position.create(0, 0);
		const position2 = Position.create(0, 32);
		const location1 = Location.create("L1", position1);
		const location2 = Location.create("L2", position2);
		expect(location1.distanceTo(location2)).toBe(32);
	});

	it('should calculate the distance to another location correctly', () => {
		const position1 = Position.create(0, 0);
		const position2 = Position.create(3, 4);
		const location1 = Location.create("L1", position1);
		const location2 = Location.create("L2", position2);
		expect(location1.distanceTo(location2)).toBe(5);
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

	it('should not reflect change in original if copy is modified', () => {
		const position1 = Position.create(1, 2);
		const location1 = Location.create("L1", position1);
		const location2 = location1.copy();
		location2.getPosition().setX(3);
		location2.getPosition().setY(4);
		expect(location1.getPosition().getX()).toBe(1);
		expect(location1.getPosition().getY()).toBe(2);
		expect(location2.getPosition().getX()).toBe(3);
		expect(location2.getPosition().getY()).toBe(4);
});

	it('should not reflect change in copy if original is modified', () => {
		const position1 = Position.create(1, 2);
		const location1 = Location.create("L1", position1);
		const location2 = location1.copy();
		location1.getPosition().setX(5);		
		location1.getPosition().setY(6);
		expect(location2.getPosition().getX()).toBe(1);
		expect(location2.getPosition().getY()).toBe(2);
	});

	it('should throw an error if distanceTo is called with a non-Location object', () => {
		const position1 = Position.create(0, 0);
		const location1 = Location.create("L1", position1);		
		expect(() => location1.distanceTo({ x: 3, y: 4 })).toThrowError();
	});
});
