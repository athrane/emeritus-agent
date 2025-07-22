import { Entities, Entity, Component } from '../../src/internal.js';

// Define simple concrete components for testing purposes
class ComponentA extends Component {}
class ComponentB extends Component {}
class ComponentC extends Component {}

describe('Entities Manager', () => {
  let entitiesManager;
  let entity1, entity2, entity3;

  beforeEach(() => {
    // Note: Entity IDs are managed by a private static counter in the Entity class.
    // These tests rely on the fact that IDs will be unique and sequential
    // for the duration of the test run.
    entitiesManager = new Entities();
    entity1 = new Entity(new ComponentA());
    entity2 = new Entity(new ComponentA(), new ComponentB());
    entity3 = new Entity(new ComponentB(), new ComponentC());
  });

  describe('add', () => {
    test('should add a single entity', () => {
      entitiesManager.add(entity1);
      expect(entitiesManager.get(entity1.getId())).toBe(entity1);
    });

    test('should add multiple different entities', () => {
      entitiesManager.add(entity1);
      entitiesManager.add(entity2);
      expect(entitiesManager.get(entity1.getId())).toBe(entity1);
      expect(entitiesManager.get(entity2.getId())).toBe(entity2);
      expect(entitiesManager.getAll().length).toBe(2);
    });

    test('should throw an error when adding an entity with a duplicate ID', () => {
      entitiesManager.add(entity1);
      expect(() => entitiesManager.add(entity1)).toThrow(
        `Entity with ID ${entity1.getId()} already exists in the manager.`
      );
    });

    test('should throw a TypeError if the argument is not an instance of Entity', () => {
      expect(() => entitiesManager.add({})).toThrow(TypeError);
      expect(() => entitiesManager.add(null)).toThrow(TypeError);
      expect(() => entitiesManager.add('string')).toThrow(TypeError);
    });
  });

  describe('get', () => {
    test('should return the correct entity by ID', () => {
      entitiesManager.add(entity1);
      const found = entitiesManager.get(entity1.getId());
      expect(found).toBe(entity1);
    });

    test('should return undefined for a non-existent ID', () => {
      const nonExistentId = 9999;
      expect(entitiesManager.get(nonExistentId)).toBeUndefined();
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      entitiesManager.add(entity1);
      entitiesManager.add(entity2);
    });

    test('should delete an entity by its instance and return true', () => {
      const result = entitiesManager.delete(entity1);
      expect(result).toBe(true);
      expect(entitiesManager.get(entity1.getId())).toBeUndefined();
      expect(entitiesManager.getAll().length).toBe(1);
    });

    test('should delete an entity by its ID and return true', () => {
      const result = entitiesManager.delete(entity2.getId());
      expect(result).toBe(true);
      expect(entitiesManager.get(entity2.getId())).toBeUndefined();
      expect(entitiesManager.getAll().length).toBe(1);
    });

    test('should return false when trying to delete a non-existent entity', () => {
      const nonExistentEntity = new Entity();
      const result = entitiesManager.delete(nonExistentEntity);
      expect(result).toBe(false);
      expect(entitiesManager.getAll().length).toBe(2);
    });

    test('should return false when trying to delete using a non-existent ID', () => {
      const nonExistentId = 9999;
      const result = entitiesManager.delete(nonExistentId);
      expect(result).toBe(false);
      expect(entitiesManager.getAll().length).toBe(2);
    });
  });

  describe('getAll', () => {
    test('should return an empty array when no entities are added', () => {
      expect(entitiesManager.getAll()).toEqual([]);
    });

    test('should return an array of all added entities', () => {
      entitiesManager.add(entity1);
      entitiesManager.add(entity2);
      const all = entitiesManager.getAll();
      expect(all).toBeInstanceOf(Array);
      expect(all.length).toBe(2);
      expect(all).toContain(entity1);
      expect(all).toContain(entity2);
    });
  });

  describe('filterByComponents', () => {
    beforeEach(() => {
      entitiesManager.add(entity1); // Has A
      entitiesManager.add(entity2); // Has A, B
      entitiesManager.add(entity3); // Has B, C
    });

    test('should return all entities when no components are specified', () => {
      const result = entitiesManager.filterByComponents();
      expect(result.length).toBe(3);
      expect(result).toContain(entity1);
      expect(result).toContain(entity2);
      expect(result).toContain(entity3);
    });

    test('should filter entities that have a single specified component', () => {
      const withA = entitiesManager.filterByComponents(ComponentA);
      expect(withA.length).toBe(2);
      expect(withA).toContain(entity1);
      expect(withA).toContain(entity2);
    });

    test('should filter entities that have all specified components (multiple)', () => {
      const withAandB = entitiesManager.filterByComponents(ComponentA, ComponentB);
      expect(withAandB.length).toBe(1);
      expect(withAandB).toContain(entity2);
    });

    test('should return an empty array if no entities match all components', () => {
      const withAandC = entitiesManager.filterByComponents(ComponentA, ComponentC);
      expect(withAandC.length).toBe(0);
    });

    test('should return an empty array if filtering by a component no entity has', () => {
      class ComponentD extends Component {}
      const withD = entitiesManager.filterByComponents(ComponentD);
      expect(withD.length).toBe(0);
    });
  });
});