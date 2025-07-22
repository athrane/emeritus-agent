import { SimulationECS, Entities, Systems } from '../../src/internal.js';

describe('SimulationECS', () => {
  let simulation;

  beforeEach(() => {
    simulation = new SimulationECS();
  });

  describe('constructor', () => {
    test('should create an instance and initialize managers', () => {
      expect(simulation).toBeInstanceOf(SimulationECS);
      expect(simulation.getEntitiesManager()).toBeInstanceOf(Entities);
      expect(simulation.getSystemsManager()).toBeInstanceOf(Systems);
    });
  });

  describe('getEntitiesManager', () => {
    test('should return the entity manager instance', () => {
      const entitiesManager = simulation.getEntitiesManager();
      expect(entitiesManager).toBeInstanceOf(Entities);
    });
  });

  describe('getSystemsManager', () => {
    test('should return the system manager instance', () => {
      const systemsManager = simulation.getSystemsManager();
      expect(systemsManager).toBeInstanceOf(Systems);
    });
  });

  describe('update', () => {
    test('should call the update method on the systems manager with correct parameters', () => {
      const systemsManager = simulation.getSystemsManager();
      const entitiesManager = simulation.getEntitiesManager();
      const deltaTime = 16;

      const updateSpy = jest.spyOn(systemsManager, 'update');
      simulation.update(deltaTime);

      expect(updateSpy).toHaveBeenCalledWith(entitiesManager, deltaTime);
      updateSpy.mockRestore();
    });

    test('should throw a TypeError if deltaTime is not a number', () => {
      expect(() => simulation.update('abc')).toThrow(TypeError);
    });
  });
});