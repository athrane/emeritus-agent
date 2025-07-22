import { System } from '../../src/internal.js';

describe('System', () => {
  test('should throw an error when trying to instantiate the abstract System class directly', () => {
    expect(() => new System()).toThrow('Cannot instantiate abstract class System directly.');
  });

  test('should allow a subclass of System to be instantiated', () => {
    class ConcreteSystem extends System {
      // A valid subclass that will override update
      update() {
        // no-op
      }
    }

    let instance;
    expect(() => {
      instance = new ConcreteSystem();
    }).not.toThrow();

    expect(instance).toBeInstanceOf(System);
    expect(instance).toBeInstanceOf(ConcreteSystem);
  });

  test('should throw an error if update() is not implemented by a subclass', () => {
    class IncompleteSystem extends System {}
    const system = new IncompleteSystem();
    expect(() => system.update([], 0)).toThrow('System.update() must be implemented by subclasses.');
  });

  test('should not throw an error if update() is implemented by a subclass', () => {
    class CompleteSystem extends System {
      constructor() {
        super();
        this.wasCalled = false;
      }

      update(_entities, _deltaTime) {
        this.wasCalled = true;
      }
    }

    const system = new CompleteSystem();
    expect(() => system.update([], 16)).not.toThrow();
    expect(system.wasCalled).toBe(true);
  });
});