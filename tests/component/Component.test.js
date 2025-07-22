import { Component } from '../../src/internal.js';

describe('Component', () => {
  test('should throw an error when trying to instantiate the abstract Component class directly', () => {
    expect(() => new Component()).toThrow('Cannot instantiate abstract class Component directly.');
  });

  test('should allow a subclass of Component to be instantiated', () => {
    // Define a simple concrete component for testing purposes
    class ConcreteComponent extends Component {
      constructor() {
        super();
        this.value = 42;
      }
    }

    let instance;
    expect(() => {
      instance = new ConcreteComponent();
    }).not.toThrow();

    expect(instance).toBeInstanceOf(Component);
    expect(instance).toBeInstanceOf(ConcreteComponent);
    expect(instance.value).toBe(42);
  });
});