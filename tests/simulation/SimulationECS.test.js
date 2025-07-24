import { SimulationECS, Entities, Systems, Scene } from '../../src/internal.js';

describe('SimulationECS', () => {
  let simulation;
  let scene;

  beforeEach(() => {
    scene = new Scene();
    simulation = new SimulationECS(scene);
  });

  describe('constructor', () => {
    test('should create an instance and initialize managers', () => {
      expect(simulation).toBeInstanceOf(SimulationECS);
      expect(simulation.getEntities()).toBeInstanceOf(Entities);
      expect(simulation.getSystems()).toBeInstanceOf(Systems);
      expect(simulation.getScene()).toBe(scene);
    });

    test('should throw a TypeError if scene is not provided', () => {
      // The constructor expects a Scene instance, so calling it without one should fail.
      expect(() => new SimulationECS()).toThrow(TypeError);
    });

    test('should throw a TypeError if the provided scene is not a Scene instance', () => {
      expect(() => new SimulationECS({})).toThrow(TypeError);
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

  describe('getScene', () => {
    test('should return the scene instance', () => {
      const simulationScene = simulation.getScene();
      expect(simulationScene).toBe(scene);
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