import { Entity, Component } from '../../src/internal.js';

// Define simple concrete components for testing purposes
class TestComponentA extends Component {
  constructor(value = 'A') {
    super();
    this.value = value;
  }
}

class TestComponentB extends Component {
  constructor(data = 'B') {
    super();
    this.data = data;
  }
}

describe('Entity', () => {
  describe('constructor and ID assignment', () => {
    test('should create an entity with no components', () => {
      const entity = new Entity();
      expect(entity).toBeInstanceOf(Entity);
    });

    test('should assign a unique, incrementing ID to each new entity', () => {
      // Note: This test assumes Entity IDs are sequential and relies on the order of test execution.
      // It's a practical way to test without resetting the private static ID counter.
      const entity1 = new Entity();
      const entity2 = new Entity();
      expect(entity2.getId()).toBe(entity1.getId() + 1);
    });

    test('should correctly add components passed in the constructor', () => {
      const componentA = new TestComponentA();
      const componentB = new TestComponentB();
      const entity = new Entity(componentA, componentB);

      expect(entity.hasComponent(TestComponentA)).toBe(true);
      expect(entity.hasComponent(TestComponentB)).toBe(true);
      expect(entity.getComponent(TestComponentA)).toBe(componentA);
    });

    test('should throw an error if duplicate component types are passed to the constructor', () => {
      const componentA1 = new TestComponentA();
      const componentA2 = new TestComponentA();
      expect(() => new Entity(componentA1, componentA2)).toThrow(
        /already has a component of type TestComponentA/
      );
    });
  });

  describe('component management', () => {
    let entity;
    let componentA;

    beforeEach(() => {
      entity = new Entity();
      componentA = new TestComponentA('testValue');
    });

    describe('addComponent', () => {
      test('should add a component to the entity', () => {
        entity.addComponent(componentA);
        expect(entity.hasComponent(TestComponentA)).toBe(true);
        expect(entity.getComponent(TestComponentA)).toBe(componentA);
      });

      test('should throw an error when adding a component of a type that already exists', () => {
        entity.addComponent(componentA);
        const anotherComponentA = new TestComponentA();
        expect(() => entity.addComponent(anotherComponentA)).toThrow(
          `Entity ${entity.getId()} already has a component of type ${TestComponentA.name}.`
        );
      });

      test('should throw a TypeError if the argument is not an instance of Component', () => {
        expect(() => entity.addComponent({})).toThrow(TypeError);
        expect(() => entity.addComponent(null)).toThrow(TypeError);
        expect(() => entity.addComponent('string')).toThrow(TypeError);
      });
    });

    describe('getComponent', () => {
      test('should return the component instance if it exists', () => {
        entity.addComponent(componentA);
        const retrieved = entity.getComponent(TestComponentA);
        expect(retrieved).toBe(componentA);
        expect(retrieved.value).toBe('testValue');
      });

      test('should return undefined if the component does not exist', () => {
        expect(entity.getComponent(TestComponentA)).toBeUndefined();
      });
    });

    describe('hasComponent', () => {
      test('should return true if the component exists', () => {
        entity.addComponent(componentA);
        expect(entity.hasComponent(TestComponentA)).toBe(true);
      });

      test('should return false if the component does not exist', () => {
        expect(entity.hasComponent(TestComponentA)).toBe(false);
      });
    });

    describe('removeComponent', () => {
      test('should remove an existing component and return true', () => {
        entity.addComponent(componentA);
        expect(entity.hasComponent(TestComponentA)).toBe(true);

        const result = entity.removeComponent(TestComponentA);
        expect(result).toBe(true);
        expect(entity.hasComponent(TestComponentA)).toBe(false);
        expect(entity.getComponent(TestComponentA)).toBeUndefined();
      });

      test('should return false if the component to remove does not exist', () => {
        const result = entity.removeComponent(TestComponentA);
        expect(result).toBe(false);
      });
    });
  });
});