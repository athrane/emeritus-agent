import { IntegerPercentageBelief } from "../../../src/internal.js";

describe('IntegerPercentageBelief', () => {
    let belief;

    beforeEach(() => {
        belief = new IntegerPercentageBelief("testBelief", 50);
    });

    it('should initialize with the correct name and value', () => {
        expect(belief.name).toBe("testBelief");
        expect(belief.value).toBe(50);
    });

    it('should get name from getter', () => {
        expect(belief.getName()).toBe("testBelief");
    });

    it('should get value from getter', () => {
        expect(belief.getValue()).toBe(50);
    });

    it('should set the value within the range [0, 100]', () => {
        belief.increase(30);
        expect(belief.value).toBe(80);

        belief.decrease(80);
        expect(belief.value).toBe(0);

        belief.increase(75);
        expect(belief.value).toBe(75);
    });

    it('should clamp the value within the range [0, 100]', () => {
        expect(IntegerPercentageBelief.clampPercentage(150)).toBe(100);
        expect(IntegerPercentageBelief.clampPercentage(-50)).toBe(0);
        expect(IntegerPercentageBelief.clampPercentage(75)).toBe(75);
    });

    it('should increase the value, clamping at 100', () => {
        belief.increase(20);
        expect(belief.value).toBe(70);

        belief.increase(50); // 70+50 = 100
        expect(belief.value).toBe(100);
    });

    it('should decrease the value, clamping at 0', () => {
        belief.decrease(20);
        expect(belief.value).toBe(30);

        belief.decrease(50);
        expect(belief.value).toBe(0);
    });

    it('should handle non-numeric increase gracefully', () => {
        expect(() => belief.increase("abc")).toThrowError(TypeError);
    });

    it('should handle non-numeric decrease gracefully', () => {
        expect(() => belief.decrease("abc")).toThrowError(TypeError);
    });

    it('should handle non-numeric clamp gracefully', () => {
        expect(() => IntegerPercentageBelief.clampPercentage("abc")).toThrowError(TypeError);
    });
});