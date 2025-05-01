import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Room } from "../../../src/internal.js";

describe('create', () => {
	it('should create a Location object with correct coordinates', () => {
		const position = Position.create(1, 2);
		const roomPosition = Position.create(0, 0);
		const roomSize = Position.create(10, 10);
		const room = Room.create("Room1", roomPosition, roomSize);
		const location = Location.create("L1", position, room);
		expect(location).toBeInstanceOf(Location);
		expect(location.name).toBe("L1");
		expect(location.getPosition()).toBeInstanceOf(Position);
		expect(location.getPosition().getX()).toBe(1);
		expect(location.getPosition().getY()).toBe(2);
	});
});

describe('createNullLocation', () => {
	it('should create a null Location object with coordinates (0,0)', () => {
		const location = Location.createNullLocation();
		expect(location).toBeInstanceOf(Location);
		expect(location.getPosition()).toBeInstanceOf(Position);
		expect(location.getPosition().getX()).toBe(0);
		expect(location.getPosition().getY()).toBe(0);
	});

	it('should create a null Location object with name "Null Location"', () => {
		const location = Location.createNullLocation();
		expect(location.getName()).toBe("NULL Location (0,0)");
	});

	it('should create a null Location object with a null room', () => {
		const location = Location.createNullLocation();
		expect(location.getRoom()).toBeInstanceOf(Room);
		expect(location.getRoom().getName()).toBe("NULL Room (0,0)");
	});

	it('should create a null Location object with a null position', () => {
		const location = Location.createNullLocation();
		expect(location.getPosition()).toBeInstanceOf(Position);
		expect(location.getPosition().getX()).toBe(0);
		expect(location.getPosition().getY()).toBe(0);
	});
	
});

