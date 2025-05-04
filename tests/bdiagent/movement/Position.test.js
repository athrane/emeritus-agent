import { Position } from "../../../src/internal.js";

describe('Position', () => {

    describe('constructor', () => {
        test('should create a Position instance with given x and y coordinates', () => {
            const x = 10;
            const y = 20;
            const pos = Position.create(x, y);
            expect(pos).toBeInstanceOf(Position);
            expect(pos.x).toBe(x);
            expect(pos.y).toBe(y);
        });

        test('should handle zero coordinates', () => {
            const pos = Position.create(0, 0);
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);
        });

        test('should handle negative coordinates', () => {
            const x = -5;
            const y = -15;
            const pos = Position.create(x, y);
            expect(pos.x).toBe(x);
            expect(pos.y).toBe(y);
        });

        test('should throw error if x is not a number (assuming TypeUtils throws)', () => {
            expect(() => Position.create("a", 5)).toThrow(TypeError);
        });

        test('should throw error if y is not a number (assuming TypeUtils throws)', () => {
             expect(() => Position.create(5, "b")).toThrow(TypeError);
        });
    });

    describe('getX', () => {
        test('should return the correct x-coordinate', () => {
            const x = 42;
            const pos = Position.create(x, 10);
            expect(pos.getX()).toBe(x);
        });
    });

    describe('getY', () => {
        test('should return the correct y-coordinate', () => {
            const y = 99;
            const pos = Position.create(5, y);
            expect(pos.getY()).toBe(y);
        });
    });

    describe('setX', () => {
        test('should set the x-coordinate correctly', () => {
            const pos = Position.create(0, 0);
            const newPos = pos.setX(100);
            expect(newPos.getX()).toBe(100);
            expect(newPos.getY()).toBe(0);
        });

        test('should get new position object setting x', () => {
            const pos = Position.create(1, 2);
            const newPos = pos.setX(5);
            expect(newPos).not.toBe(pos); 
        });

        test('should throw error if x is not a number (assuming TypeUtils throws)', () => {
            const pos = Position.create(0, 0);
            expect(() => pos.setX("not-a-number")).toThrow(TypeError);
        });

    });
    describe('setY', () => {
        test('should set the y-coordinate correctly', () => {
            const pos = Position.create(0, 0);
            const newPos = pos.setY(100);
            expect(newPos.getX()).toBe(0);
            expect(newPos.getY()).toBe(100);
        });

        test('should get new position object setting y', () => {
            const pos = Position.create(1, 2);
            const newPos = pos.setY(5);
            expect(newPos).not.toBe(pos); 
        });
        
        test('should throw error if y is not a number (assuming TypeUtils throws)', () => {
            const pos = Position.create(0, 0);
            expect(() => pos.setY("not-a-number")).toThrow(TypeError);
        });
    });

    describe('set', () => {
        test('should set the coordinates correctly', () => {
            const pos = Position.create(0, 0);
            const newPos = pos.set(100,200);
            expect(newPos.getX()).toBe(100);
            expect(newPos.getY()).toBe(200);
        });

        test('should get new position object setting x and y', () => {
            const pos = Position.create(1, 2);
            const newPos = pos.set(5, 10);
            expect(newPos).not.toBe(pos); 
        });

        test('should throw error if x is not a number (assuming TypeUtils throws)', () => {
            const pos = Position.create(0, 0);
            expect(() => pos.set("not-a-number", 5)).toThrow(TypeError);
        });

        test('should throw error if y is not a number (assuming TypeUtils throws)', () => {
            const pos = Position.create(0, 0);
            expect(() => pos.set(5, "not-a-number")).toThrow(TypeError);
        });
        
    });

    describe('set2', () => {
        test('should set the coordinates correctly', () => {
            const pos = Position.create(0, 0);
            const pos2 = Position.create(100, 200);
            const newPos = pos.set2(pos2);
            expect(newPos.getX()).toBe(100);
            expect(newPos.getY()).toBe(200);
        });

        test('should get new position object setting x and y', () => {
            const pos = Position.create(0, 0);
            const pos2 = Position.create(100, 200);
            const newPos = pos.set2(pos2);
            expect(newPos).not.toBe(pos); 
        });

        test('should throw error if x is not a number (assuming TypeUtils throws)', () => {
            const pos = Position.create(0, 0);
            expect(() => pos.set2("not-a-number")).toThrow(TypeError);
        });

    });

    describe('copy', () => {
        test('should create a new Position instance with the same coordinates', () => {
            const originalPos = Position.create(15, 25);
            const copiedPos = originalPos.copy();

            expect(copiedPos).toBeInstanceOf(Position);
            expect(copiedPos.getX()).toBe(originalPos.getX());
            expect(copiedPos.getY()).toBe(originalPos.getY());
        });

        test('should create a distinct object (not the same reference)', () => {
            const originalPos = Position.create(1, 2);
            const copiedPos = originalPos.copy();
            expect(copiedPos).not.toBe(originalPos); // Check they are different objects in memory
        });

        test('modifying the copied position should not affect the original', () => {
            const originalPos = Position.create(10, 10);
            const copiedPos = originalPos.copy();
            copiedPos.x = 100; // Modify the copy

            expect(originalPos.x).toBe(10); // Original should remain unchanged
            expect(copiedPos.x).toBe(100);
        });
    });

    describe('distanceTo', () => {
        let pos1;

        beforeEach(() => {
            pos1 = Position.create(3, 4);
        });

        test('should calculate the distance to another location correctly, only x dimension', () => {
            const pos2 = Position.create(0, 0);
            const pos3 = Position.create(7, 0);
            expect(pos2.distanceTo(pos3)).toBe(7);
        });            

        test('should calculate the distance to another location correctly, only y dimension', () => {
            const pos2 = Position.create(0, 0);
            const pos3 = Position.create(0, 32);
            expect(pos2.distanceTo(pos3)).toBe(32);
        });            

        test('should calculate the correct Euclidean distance to another position', () => {
            const pos2 = Position.create(0, 0);
            expect(pos1.distanceTo(pos2)).toBeCloseTo(5);
        });

        test('should return 0 when calculating distance to the same position', () => {
            const pos2 = Position.create(3, 4);
            expect(pos1.distanceTo(pos2)).toBeCloseTo(0);
        });

         test('should calculate the correct distance with negative coordinates', () => {
            const posNeg = Position.create(-3, -4);
            const origin = Position.create(0, 0);
            expect(posNeg.distanceTo(origin)).toBeCloseTo(5);
         });

        test('should calculate the correct distance between two non-origin points', () => {
            const posA = Position.create(1, 2);
            const posB = Position.create(4, 6);
            expect(posA.distanceTo(posB)).toBeCloseTo(5);
        });

        test('should throw error if otherPosition is not a Position instance', () => {
             expect(() => pos1.distanceTo("not-a-number")).toThrow(TypeError);
        });
    });

    describe('add', () => {

        test('add two positions', () => {
            const pos1 = Position.create(1, 2);
            const pos2 = Position.create(3, 4);
            const result = pos1.add(pos2);
            expect(result).toBeInstanceOf(Position);
            expect(result.getX()).toBe(4);
            expect(result.getY()).toBe(6);
        });

        test('add position to itself', () => {
            const pos1 = Position.create(1, 2);
            const result = pos1.add(pos1);
            expect(result).toBeInstanceOf(Position);
            expect(result.getX()).toBe(2);
            expect(result.getY()).toBe(4);
        });

        test('add position with negative coordinates', () => {
            const pos1 = Position.create(1, 2);
            const pos2 = Position.create(-1, -2);
            const result = pos1.add(pos2);
            expect(result).toBeInstanceOf(Position);
            expect(result.getX()).toBe(0);
            expect(result.getY()).toBe(0);
        });

        test('add position with zero coordinates', () => {
            const pos1 = Position.create(1, 2);
            const pos2 = Position.create(0, 0);
            const result = pos1.add(pos2);
            expect(result).toBeInstanceOf(Position);
            expect(result.getX()).toBe(1);
            expect(result.getY()).toBe(2);
        });

        test('add does not modify original position', () => {
            const pos1 = Position.create(1, 2);
            const pos2 = Position.create(3, 4);
            const result = pos1.add(pos2);
            expect(pos1.getX()).toBe(1);
            expect(pos1.getY()).toBe(2);
            expect(pos2.getX()).toBe(3);
            expect(pos2.getY()).toBe(4);
        });

        test('add should throw error if otherPosition is not a Position instance', () => {
            const pos1 = Position.create(1, 2);
            expect(() => pos1.add("not-a-position")).toThrow(TypeError);
        });
    });

});
