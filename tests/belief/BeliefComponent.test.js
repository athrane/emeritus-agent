import { BeliefComponent, Component } from '../../src/internal.js';

describe('BeliefComponent', () => {
  it('should be a subclass of Component', () => {
    const belief = new BeliefComponent('test', 50);
    expect(belief).toBeInstanceOf(Component);
  });

  it('should initialize with a name and value', () => {
    const name = 'TestBelief';
    const value = 75;
    const belief = new BeliefComponent(name, value);

    expect(belief.getName()).toBe(name);
    expect(belief.getValue()).toBe(value);
  });

  it('should throw a TypeError if name is not a string', () => {
    expect(() => new BeliefComponent(123, 50)).toThrow(TypeError);
    expect(() => new BeliefComponent(null, 50)).toThrow(TypeError);
    expect(() => new BeliefComponent(undefined, 50)).toThrow(TypeError);
  });

  it('should throw a TypeError if value is not a number', () => {
    expect(() => new BeliefComponent('test', '50')).toThrow(TypeError);
    expect(() => new BeliefComponent('test', null)).toThrow(TypeError);
    expect(() => new BeliefComponent('test', undefined)).toThrow(TypeError);
  });

  it('should allow setting a new value', () => {
    const belief = new BeliefComponent('test', 50);
    const newValue = 90;
    belief.setValue(newValue);
    expect(belief.getValue()).toBe(newValue);
  });

  it('should throw a TypeError when setting a non-numeric value', () => {
    const belief = new BeliefComponent('test', 50);
    expect(() => belief.setValue('90')).toThrow(TypeError);
    expect(() => belief.setValue(null)).toThrow(TypeError);
    expect(() => belief.setValue(undefined)).toThrow(TypeError);
  });
});