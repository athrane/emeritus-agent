import { VelocityComponent } from '../../src/internal.js';

describe('VelocityComponent', () => {
  describe('constructor', () => {
    test('should create an instance with default velocities (0, 0)', () => {
      const component = new VelocityComponent();
      const velocity = component.getVelocity();
      expect(velocity.vx).toBe(0);
      expect(velocity.vy).toBe(0);
    });

    test('should create an instance with specified velocities', () => {
      const component = new VelocityComponent(10, -5);
      const velocity = component.getVelocity();
      expect(velocity.vx).toBe(10);
      expect(velocity.vy).toBe(-5);
    });

    test('should throw a TypeError if vx is not a number', () => {
      expect(() => new VelocityComponent('a', 5)).toThrow(TypeError);
      expect(() => new VelocityComponent(null, 5)).toThrow(TypeError);
    });

    test('should throw a TypeError if vy is not a number', () => {
      expect(() => new VelocityComponent(5, 'b')).toThrow(TypeError);
      expect(() => new VelocityComponent(5, null)).toThrow(TypeError);
    });
  });

  describe('getVelocity', () => {
    test('should return an object with the correct vx and vy properties', () => {
      const vx = 1.23;
      const vy = -4.56;
      const component = new VelocityComponent(vx, vy);
      const velocity = component.getVelocity();

      expect(velocity).toEqual({ vx, vy });
    });

    test('should return a new object each time getVelocity is called', () => {
      const component = new VelocityComponent(5, 10);
      expect(component.getVelocity()).not.toBe(component.getVelocity());
    });
  });
});