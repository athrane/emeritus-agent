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

});
