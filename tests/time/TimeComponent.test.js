import { TimeComponent } from '../../src/internal.js';

describe('TimeComponent', () => {
  describe('constructor', () => {
    test('should create an instance with default values', () => {
      const component = new TimeComponent();
      expect(component).toBeInstanceOf(TimeComponent);
      expect(component.totalTime).toBe(0);
      expect(component.deltaTime).toBe(0);
      expect(component.day).toBe(1);
      expect(component.timeOfDay).toBe(0);
      expect(component.timeScale).toBe(60); // Default timeScale
    });

    test('should create an instance with specified values', () => {
      const timeScale = 120;
      const initialTimeOfDay = 540; // 9:00 AM
      const component = new TimeComponent(timeScale, initialTimeOfDay);

      expect(component.timeScale).toBe(timeScale);
      expect(component.timeOfDay).toBe(initialTimeOfDay);
    });

    test('should initialize other properties to their defaults when values are specified', () => {
      const component = new TimeComponent(100, 200);
      expect(component.totalTime).toBe(0);
      expect(component.deltaTime).toBe(0);
      expect(component.day).toBe(1);
    });

    test('should throw a TypeError if timeScale is not a number', () => {
      expect(() => new TimeComponent('invalid', 0)).toThrow(TypeError);
      expect(() => new TimeComponent(null, 0)).toThrow(TypeError);
    });

    test('should throw a TypeError if initialTimeOfDay is not a number', () => {
      expect(() => new TimeComponent(60, 'invalid')).toThrow(TypeError);
      expect(() => new TimeComponent(60, null)).toThrow(TypeError);
      expect(() => new TimeComponent(60, {})).toThrow(TypeError);
    });
  });
});