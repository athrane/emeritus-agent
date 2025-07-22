import { Systems, System, Entities } from '../../src/internal.js';

// A concrete system for testing that can be spied on
class TestSystem extends System {
  update = jest.fn();
}

// A concrete system to test execution order
class OrderTestSystem extends System {
  constructor(name, orderArray) {
    super();
    this.name = name;
    this.orderArray = orderArray;
  }

  update(_entitiesManager, _deltaTime) {
    this.orderArray.push(this.name);
  }
}

describe('Systems Manager', () => {
  let systemsManager;
  let mockEntitiesManager;

  beforeEach(() => {
    systemsManager = new Systems();
    // A simple mock for the Entities manager that passes instance checks
    mockEntitiesManager = Object.create(Entities.prototype);
    mockEntitiesManager.getAll = jest.fn(() => []);
  });

  describe('add', () => {
    test('should add a system to the manager', () => {
      const system = new TestSystem();
      systemsManager.add(system);

      // Verify by calling update and checking if the system's update is called
      systemsManager.update(mockEntitiesManager, 16);
      expect(system.update).toHaveBeenCalledTimes(1);
    });

    test('should throw an error when adding a system that is already registered', () => {
      const system = new TestSystem();
      systemsManager.add(system);
      expect(() => systemsManager.add(system)).toThrow(
        `System of type ${system.constructor.name} is already registered.`
      );
    });

    test('should throw a TypeError if the argument is not an instance of System', () => {
      expect(() => systemsManager.add({})).toThrow(TypeError);
      expect(() => systemsManager.add(null)).toThrow(TypeError);
      expect(() => systemsManager.add('system')).toThrow(TypeError);
    });
  });

  describe('delete', () => {
    test('should delete a registered system and return true', () => {
      const system = new TestSystem();
      systemsManager.add(system);

      const result = systemsManager.delete(system);
      expect(result).toBe(true);

      // Verify it was removed by calling update and checking the spy
      systemsManager.update(mockEntitiesManager, 16);
      expect(system.update).not.toHaveBeenCalled();
    });

    test('should return false when trying to delete a system that is not registered', () => {
      const system = new TestSystem();
      const result = systemsManager.delete(system);
      expect(result).toBe(false);
    });

    test('should throw a TypeError if the argument is not an instance of System', () => {
      expect(() => systemsManager.delete({})).toThrow(TypeError);
    });
  });

  describe('update', () => {
    test('should call the update method on all registered systems', () => {
      const system1 = new TestSystem();
      const system2 = new TestSystem();
      systemsManager.add(system1);
      systemsManager.add(system2);

      systemsManager.update(mockEntitiesManager, 16);

      expect(system1.update).toHaveBeenCalledTimes(1);
      expect(system2.update).toHaveBeenCalledTimes(1);
    });

    test("should pass the entities manager and deltaTime to each system's update method", () => {
      const system = new TestSystem();
      systemsManager.add(system);
      const deltaTime = 16.67;

      systemsManager.update(mockEntitiesManager, deltaTime);

      expect(system.update).toHaveBeenCalledWith(mockEntitiesManager, deltaTime);
    });

    test('should execute systems in the order they were added', () => {
      const executionOrder = [];
      const system1 = new OrderTestSystem('system1', executionOrder);
      const system2 = new OrderTestSystem('system2', executionOrder);

      systemsManager.add(system1);
      systemsManager.add(system2);

      systemsManager.update(mockEntitiesManager, 16);

      expect(executionOrder).toEqual(['system1', 'system2']);
    });

    test('should throw a TypeError if entitiesManager is not an instance of Entities', () => {
      const invalidManager = {};
      expect(() => systemsManager.update(invalidManager, 16)).toThrow(TypeError);
    });

    test('should throw a TypeError if deltaTime is not a number', () => {
      expect(() => systemsManager.update(mockEntitiesManager, '16')).toThrow(TypeError);
    });
  });
});