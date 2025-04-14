import { Position } from "../../../src/internal.js";

describe('Position', () => {

    describe('constructor', () => {
        test('should create a Position instance with given x and y coordinates', () => {
            const x = 10;
            const y = 20;
            const pos = new Position(x, y);

            expect(pos).toBeInstanceOf(Position);
            expect(pos.x).toBe(x);
            expect(pos.y).toBe(y);
        });

        test('should handle zero coordinates', () => {
            const pos = new Position(0, 0);
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);
        });

        test('should handle negative coordinates', () => {
            const x = -5;
            const y = -15;
            const pos = new Position(x, y);
            expect(pos.x).toBe(x);
            expect(pos.y).toBe(y);
        });

        // Add tests for TypeUtils ensuring correct types if needed (might require mocking TypeUtils)
        test('should throw error if x is not a number (assuming TypeUtils throws)', () => {
            expect(() => new Position("a", 5)).toThrow(TypeError);
        });

        test('should throw error if y is not a number (assuming TypeUtils throws)', () => {
             expect(() => new Position(5, "b")).toThrow(TypeError);
        });
    });

    describe('getX', () => {
        test('should return the correct x-coordinate', () => {
            const x = 42;
            const pos = new Position(x, 10);
            expect(pos.getX()).toBe(x);
        });
    });

    describe('getY', () => {
        test('should return the correct y-coordinate', () => {
            const y = 99;
            const pos = new Position(5, y);
            expect(pos.getY()).toBe(y);
        });
    });

    describe('copy', () => {
        test('should create a new Position instance with the same coordinates', () => {
            const originalPos = new Position(15, 25);
            const copiedPos = originalPos.copy();

            expect(copiedPos).toBeInstanceOf(Position);
            expect(copiedPos.x).toBe(originalPos.x);
            expect(copiedPos.y).toBe(originalPos.y);
        });

        test('should create a distinct object (not the same reference)', () => {
            const originalPos = new Position(1, 2);
            const copiedPos = originalPos.copy();

            expect(copiedPos).not.toBe(originalPos); // Check they are different objects in memory
        });

        test('modifying the copied position should not affect the original', () => {
            const originalPos = new Position(10, 10);
            const copiedPos = originalPos.copy();

            copiedPos.x = 100; // Modify the copy

            expect(originalPos.x).toBe(10); // Original should remain unchanged
            expect(copiedPos.x).toBe(100);
        });
    });

    describe('distanceTo', () => {
        let pos1;

        beforeEach(() => {
            pos1 = new Position(3, 4);
        });

        test('should calculate the correct Euclidean distance to another position', () => {
            const pos2 = new Position(0, 0);
            // Distance = sqrt((3-0)^2 + (4-0)^2) = sqrt(9 + 16) = sqrt(25) = 5
            expect(pos1.distanceTo(pos2)).toBeCloseTo(5);
        });

        test('should return 0 when calculating distance to the same position', () => {
            const pos2 = new Position(3, 4);
            expect(pos1.distanceTo(pos2)).toBeCloseTo(0);
        });

         test('should calculate the correct distance with negative coordinates', () => {
            const posNeg = new Position(-3, -4);
            const origin = new Position(0, 0);
             // Distance = sqrt((-3-0)^2 + (-4-0)^2) = sqrt(9 + 16) = sqrt(25) = 5
            expect(posNeg.distanceTo(origin)).toBeCloseTo(5);
         });

        test('should calculate the correct distance between two non-origin points', () => {
            const posA = new Position(1, 2);
            const posB = new Position(4, 6);
            // Distance = sqrt((4-1)^2 + (6-2)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5
            expect(posA.distanceTo(posB)).toBeCloseTo(5);
        });

        // Add tests for TypeUtils ensuring correct types if needed
        test('should throw error if otherPosition is not a Position instance (assuming TypeUtils throws)', () => {
             expect(() => pos1.distanceTo({ x: 0, y: 0 })).toThrow(TypeError);
        });
    });
});
