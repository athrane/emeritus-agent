import { SimulationECS, Entities, Systems } from '../../src/internal.js';

describe('SimulationECS', () => {
  let simulation;

  beforeEach(() => {
    simulation = new SimulationECS();
  });

  describe('constructor', () => {
    test('should create an instance and initialize managers', () => {
      expect(simulation).toBeInstanceOf(SimulationECS);
      expect(simulation.getEntities()).toBeInstanceOf(Entities);
      expect(simulation.getSystems()).toBeInstanceOf(Systems);
    });
  });

  describe('getEntities', () => {
    test('should return the entity manager instance', () => {
      const entitiesManager = simulation.getEntities();
      expect(entitiesManager).toBeInstanceOf(Entities);
    });
  });

  describe('getSystems', () => {
    test('should return the system manager instance', () => {
      const systemsManager = simulation.getSystems();
      expect(systemsManager).toBeInstanceOf(Systems);
    });
  });

  describe('update', () => {
    test('should call the update method on the systems manager with correct parameters', () => {
      const systemsManager = simulation.getSystems();
      const entitiesManager = simulation.getEntities();
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