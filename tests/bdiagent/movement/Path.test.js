import { Path } from "../../../src/internal.js";

describe('Path', () => {

    describe('create', () => {
        it('should create a Path instance with a given string', () => {
            const path = Path.create(['Room1']);
            expect(path).toBeInstanceOf(Path);
            expect(path.getLength()).toBe(1);
            expect(path.isEmpty()).toBe(false);
        });

        it('should handle empty array', () => {
            const path = Path.create([]);
            expect(path).toBeInstanceOf(Path);
            expect(path.getLength()).toBe(0);
            expect(path.isEmpty()).toBe(true);
        });

        it('should throw an error for invalid input', () => {
            expect(() => Path.create(123)).toThrow(); 
            expect(() => Path.create({})).toThrow();
            expect(() => Path.create(null)).toThrow();
            expect(() => Path.create(undefined)).toThrow();
        });

        it('should create a Path instance with multiple room names', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path).toBeInstanceOf(Path);
            expect(path.getLength()).toBe(2);
            expect(path.getRoomAt(0)).toBe('Room1');
            expect(path.getRoomAt(1)).toBe('Room2');
            expect(path.isEmpty()).toBe(false);
        });        
    });

    describe('createEmpty', () => {
        it('should create an empty Path instance', () => {
            const path = Path.createEmpty();
            expect(path).toBeInstanceOf(Path);
            expect(path.getLength()).toBe(0);
            expect(path.isEmpty()).toBe(true);
        });

        it('should return a new instance each time', () => {
            const path1 = Path.createEmpty();
            const path2 = Path.createEmpty();
            expect(path1).not.toBe(path2); // Ensure different instances
        });

        it('should not throw an error when creating an empty path', () => {
            expect(() => Path.createEmpty()).not.toThrow();
        });

    });            

    describe('isEmpty', () => {
        it('should return true for an empty path', () => {
            const path = Path.create([]);
            expect(path.isEmpty()).toBe(true);
        });

        it('should return false for a non-empty path', () => {
            const path = Path.create(['Room1']);
            expect(path.isEmpty()).toBe(false);
        });
    });

    describe('getLength', () => {
        it('should return the correct length of the path', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getLength()).toBe(2);
        });

        it('should return 0 for an empty path', () => {
            const path = Path.create([]);
            expect(path.getLength()).toBe(0);
        });
    });

    describe('getRoomAt', () => {
        it('should return the correct room name at a given index', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getRoomAt(0)).toBe('Room1');
            expect(path.getRoomAt(1)).toBe('Room2');
        });

        it('should throw an error for an out-of-bounds index', () => {
            const path = Path.create(['Room1']);
            expect(() => path.getRoomAt(1)).toThrow(RangeError);
        });

        it('should throw an error for a negative index', () => {
            const path = Path.create(['Room1']);
            expect(() => path.getRoomAt(-1)).toThrow(RangeError);
        });
    });

    describe('getRoom', () => {
        it('should return the current room name', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getRoom()).toBe('Room1');
        });
        it('should throw an error for an empty path', () => {
            const path = Path.create([]);
            expect(() => path.getRoom()).toThrow(Error);
        });
        it('should return the correct room name after advancing the index', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getRoom()).toBe('Room1');
            path.advanceIndex();
            expect(path.getRoom()).toBe('Room2');
        });
    });

    describe('getStartRoom', () => {
        it('should return the start room name', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getStartRoom()).toBe('Room1');
        });

        it('should throw an error for an empty path', () => {
            const path = Path.create([]);
            expect(() => path.getStartRoom()).toThrow(Error);
        });
    });

    describe('getEndRoom', () => {
        it('should return the end room name', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getEndRoom()).toBe('Room2');
        });

        it('should throw an error for an empty path', () => {
            const path = Path.create([]);
            expect(() => path.getEndRoom()).toThrow(Error);
        });
    });

    describe('getRoomNames', () => {
        it('should return the correct room names', () => {
            const path = Path.create(['Room1', 'Room2']);
            expect(path.getRoomNames()).toEqual(['Room1', 'Room2']);
        });

        it('should return an empty array for an empty path', () => {
            const path = Path.create([]);
            expect(path.getRoomNames()).toEqual([]);
        });
    });    

    describe('Path index management', () => {
        it('should initialize currentIndex to 0 for empty path', () => {
            const path = Path.create([]);
            expect(path.getCurrentIndex()).toBe(0);
        });

        it('should initialize currentIndex to 0', () => {
            const path = Path.create(['A', 'B', 'C']);
            expect(path.getCurrentIndex()).toBe(0);
        });

        it('should advance index but not go out of bounds', () => {
            const path = Path.create(['A', 'B']);
            expect(path.getCurrentIndex()).toBe(0);
            path.advanceIndex();
            expect(path.getCurrentIndex()).toBe(1);
            // Should not advance past last index
            path.advanceIndex();
            expect(path.getCurrentIndex()).toBe(1);
        });

        it('should not advance index for empty path', () => {
            const path = Path.create([]);
            expect(path.getCurrentIndex()).toBe(0);
            path.advanceIndex();
            expect(path.getCurrentIndex()).toBe(0);
        });

        it('isAtEnd should return true initially for empty path', () => {
            const path = Path.create([]);
            expect(path.isAtEnd()).toBe(true);
        });

        it('isAtEnd should return true initially for path of length 1', () => {
            const path = Path.create(['A']);
            expect(path.isAtEnd()).toBe(true);
        });

        it('isAtEnd should return true when index is at the end', () => {
            const path = Path.create(['A', 'B']);
            expect(path.isAtEnd()).toBe(false);
            expect(path.getCurrentIndex()).toBe(0);
            path.advanceIndex(); 
            expect(path.isAtEnd()).toBe(true);
            expect(path.getCurrentIndex()).toBe(1);
            path.advanceIndex(); // should stay at 1
            expect(path.isAtEnd()).toBe(true);
            expect(path.getCurrentIndex()).toBe(1);
        });

    });

});
