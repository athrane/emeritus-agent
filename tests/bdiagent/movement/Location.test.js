import { Location } from "../../../src/internal.js";

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

test('Location constructor', () => {
	const location = new Location("L1", 1, 2);
	expect(location.x).toBe(1);
	expect(location.y).toBe(2);
});

