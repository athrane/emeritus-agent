import { NameComponent, Component } from '../../src/internal.js';

describe('NameComponent', () => {
  test('should create a NameComponent with a valid name', () => {
    const name = 'PlayerOne';
    const component = new NameComponent(name);

    expect(component).toBeInstanceOf(NameComponent);
    expect(component).toBeInstanceOf(Component);
    expect(component.getName()).toBe(name);
  });

  test('should throw a TypeError if the name is not a string', () => {
    expect(() => new NameComponent(123)).toThrow(TypeError);
    expect(() => new NameComponent(null)).toThrow(TypeError);
    expect(() => new NameComponent(undefined)).toThrow(TypeError);
    expect(() => new NameComponent({})).toThrow(TypeError);
  });

  test('should throw an Error if the name is an empty string', () => {
    // This test enforces the JSDoc constraint of "non-empty string".
    // A code quality suggestion is provided to make this test pass.
    expect(() => new NameComponent('')).toThrow('Name cannot be an empty string.');
  });
});