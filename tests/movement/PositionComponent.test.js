import { PositionComponent, Component, Position } from '../../src/internal.js';

describe('PositionComponent', () => {
  let initialPosition;

  beforeEach(() => {
    initialPosition = new Position(10, 20);
  });

  test('should create a PositionComponent with a valid Position object', () => {
    const component = new PositionComponent(initialPosition);
    expect(component).toBeInstanceOf(PositionComponent);
    expect(component).toBeInstanceOf(Component);
    expect(component.getPosition()).toBe(initialPosition);
  });

  test('should throw a TypeError if the constructor argument is not a Position instance', () => {
    expect(() => new PositionComponent({ x: 10, y: 20 })).toThrow(TypeError);
    expect(() => new PositionComponent(null)).toThrow(TypeError);
    expect(() => new PositionComponent('10,20')).toThrow(TypeError);
  });

  describe('getPosition', () => {
    test('should return the current position', () => {
      const component = new PositionComponent(initialPosition);
      const pos = component.getPosition();
      expect(pos).toBe(initialPosition);
      expect(pos.getX()).toBe(10);
      expect(pos.getY()).toBe(20);
    });
  });

  describe('setPosition', () => {
    test('should update the position with a new Position object', () => {
      const component = new PositionComponent(initialPosition);
      const newPosition = new Position(30, 40);

      component.setPosition(newPosition);
      const updatedPosition = component.getPosition();

      expect(updatedPosition).toBe(newPosition);
      expect(updatedPosition.getX()).toBe(30);
      expect(updatedPosition.getY()).toBe(40);
      expect(updatedPosition).not.toBe(initialPosition);
    });

    test('should throw a TypeError if the argument is not a Position instance', () => {
      const component = new PositionComponent(initialPosition);
      expect(() => component.setPosition({ x: 30, y: 40 })).toThrow(TypeError);
    });
  });
});