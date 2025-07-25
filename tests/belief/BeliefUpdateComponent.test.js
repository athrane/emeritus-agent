import { BeliefUpdateComponent, Component } from '../../src/internal.js';

describe('BeliefUpdateComponent', () => {
  it('should be a subclass of Component', () => {
    const update = new BeliefUpdateComponent(1);
    expect(update).toBeInstanceOf(Component);
  });

  it('should initialize with a value', () => {
    const value = 5;
    const update = new BeliefUpdateComponent(value);
    expect(update.getValue()).toBe(value);
  });

  it('should throw a TypeError if value is not a number', () => {
    expect(() => new BeliefUpdateComponent('5')).toThrow(TypeError);
    expect(() => new BeliefUpdateComponent(null)).toThrow(TypeError);
    expect(() => new BeliefUpdateComponent(undefined)).toThrow(TypeError);
  });
});