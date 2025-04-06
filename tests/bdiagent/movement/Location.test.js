import { Location } from "../../../src/internal.js";

describe('Location', () => {
	it('should create a Location object with correct coordinates', () => {
		const location = new Location("L1", 1, 2);
		expect(location.name).toBe("L1");
		expect(location.x).toBe(1);
		expect(location.y).toBe(2);
	});

	it('should calculate the distance to another location correctly, only x dimension', () => {
		const location1 = new Location("L1", 0, 0);
		const location2 = new Location("L2", 7, 0);
		expect(location1.distanceTo(location2)).toBe(7);
	});

	it('should calculate the distance to another location correctly, only y dimension', () => {
		const location1 = new Location("L1", 0, 0);
		const location2 = new Location("L2", 0, 32);
		expect(location1.distanceTo(location2)).toBe(32);
	});

	it('should calculate the distance to another location correctly', () => {
		const location1 = new Location("L1", 0, 0);
		const location2 = new Location("L2", 3, 4);
		expect(location1.distanceTo(location2)).toBe(5);
	});

	it('should create a copy of the location correctly', () => {
		const location1 = new Location("L1", 1, 2);
		const location2 = location1.copy();
		expect(location2.name).toBe("L1");
		expect(location2.x).toBe(1);
		expect(location2.y).toBe(2);
		expect(location2).not.toBe(location1); // Ensure it's a new object
	});

	it('should not reflect change in original if copy is modified', () => {
		const location1 = new Location("L1", 1, 2);
		const location2 = location1.copy();
		location2.x = 3;
		location2.y = 4;
		expect(location1.x).toBe(1);
		expect(location1.y).toBe(2);
	});

	it('should not reflect change in copy if original is modified', () => {
		const location1 = new Location("L1", 1, 2);
		const location2 = location1.copy();
		location1.x = 9;
		location1.y = 12;
		expect(location2.x).toBe(1);
		expect(location2.y).toBe(2);
	});

	it('should throw an error if distanceTo is called with a non-Location object', () => {
		const location1 = new Location("L1", 0, 0);
		expect(() => location1.distanceTo({ x: 3, y: 4 })).toThrowError();
	});
});
