import { DesireManager } from '../../../src/internal.js';
import { Desire } from '../../../src/internal.js'; 
import { Agent } from '../../../src/internal.js'; 
import { Scene } from '../../../src/internal.js'; 
import { Position } from '../../../src/internal.js';
import { Location } from '../../../src/internal.js';

/**
 * MockDesire class for testing purposes.
 * Extends the base Desire class to ensure type compatibility.
 */
class MockDesire extends Desire {
  /**
   * @param {string} name - The name of the desire.
   * @param {function(Agent): boolean} [condition=jest.fn(() => true)] - The condition function.
   * @param {number} [priority=1] - The priority of the desire.
   */
  constructor(name, condition = jest.fn(() => true), priority = 1) {
    super(name, condition, priority);
  }

  setConditionSatisfied(value) {
    this.condition.mockReturnValue(value);
  }
}

describe('DesireManager', () => {
  let desireManager;
  beforeEach(() => {
    desireManager = new DesireManager();
  });

  test('should be initialized with no desires', () => {
    expect(desireManager.getDesires()).toEqual([]);
  });

  test('should be initialized with no best desire', () => {
    expect(desireManager.getCurrentBestDesire()).toBeNull();
  });

  test('should be initialized with no active desires', () => {
    expect(desireManager.getActiveDesires()).toEqual([]);
  });
});

describe('addDesire', () => {
  let desireManager;

  beforeEach(() => {
    desireManager = new DesireManager();
  });

  test('should add a new desire', () => {
    const desire1 = new MockDesire('desire1', jest.fn(() => true), 5);
    desireManager.addDesire(desire1);
    expect(desireManager.getDesires()).toContain(desire1);
    expect(desireManager.getDesires().length).toBe(1);
  });

  test('should throw error if adding a non-Desire instance', () => {
    expect(() => desireManager.addDesire(null)).toThrow(TypeError);
    expect(() => desireManager.addDesire(undefined)).toThrow(TypeError);
    expect(() => desireManager.addDesire({})).toThrow(TypeError);
    expect(desireManager.getDesires()).toEqual([]);
  });

  test('should allow adding multiple different MockDesire instances', () => {
    const desire1 = new MockDesire('desire1', jest.fn(), 1);
    const desire2 = new MockDesire('desire2', jest.fn(), 2);
    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    expect(desireManager.getDesires()).toContain(desire1);
    expect(desireManager.getDesires()).toContain(desire2);
    expect(desireManager.getDesires().length).toBe(2);
  });

  test('should throw an error if adding a desire with the same name', () => {
    const desire1 = new MockDesire('desire1', jest.fn(), 1);
    desireManager.addDesire(desire1);
    const desire2 = new MockDesire('desire1', jest.fn(), 2); // Same name
    expect(() => desireManager.addDesire(desire2)).toThrow(Error);
    expect(desireManager.getDesires()).toHaveLength(1);
    expect(desireManager.getDesires()).toContain(desire1);
  });

  test('should handle adding desires with different priorities', () => {
    const desire1 = new MockDesire('desire1', jest.fn(), 1);
    const desire2 = new MockDesire('desire2', jest.fn(), 10);
    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    expect(desireManager.getDesires()).toContain(desire1);
    expect(desireManager.getDesires()).toContain(desire2);
    expect(desireManager.getDesires().length).toBe(2);
  });

});

describe('hasDesire', () => {
  let desireManager;

  beforeEach(() => {
    desireManager = new DesireManager();
  });

  test('should return true if the desire exists', () => {
    const desire1 = new MockDesire('desire1', jest.fn(), 1);
    desireManager.addDesire(desire1);
    expect(desireManager.hasDesire('desire1')).toBe(true);
  });

  test('should return false if the desire does not exist', () => {
    expect(desireManager.hasDesire('nonExistentDesire')).toBe(false);
  });

  test('should return false if no desires are present', () => {
    expect(desireManager.hasDesire('anyDesire')).toBe(false);
  });

  test('is case-sensitive when checking for desires', () => {
    const desire1 = new MockDesire('Desire1', jest.fn(), 1);
    desireManager.addDesire(desire1);
    expect(desireManager.hasDesire('Desire1')).toBe(true);
    expect(desireManager.hasDesire('desire1')).toBe(false);
    expect(desireManager.hasDesire('DESIRE1')).toBe(false);
    expect(desireManager.hasDesire('DeSiRe1')).toBe(false);
  }
  );
  test('should return false when looking up with an empty string', () => {
    expect(desireManager.hasDesire('')).toBe(false);
  });

});


describe('getDesires', () => {
  let desireManager;

  beforeEach(() => {
    desireManager = new DesireManager();
  });

  test('should return all added desires', () => {
    const desire1 = new MockDesire('desire1');
    const desire2 = new MockDesire('desire2', jest.fn(), 2);
    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    const allDesires = desireManager.getDesires();
    expect(allDesires).toHaveLength(2);
    expect(allDesires).toContainEqual(desire1);
    expect(allDesires).toContainEqual(desire2);
  });

  test('should return an empty array if no desires are present', () => {
    expect(desireManager.getDesires()).toEqual([]);
  });
});

describe('getActiveDesires', () => {
  let desireManager;
  let scene;
  let initialLocation;
  let initialPosition
  let initialRoom;
  let agent;

  beforeEach(() => {
    desireManager = new DesireManager();
    scene = new Scene();
    initialRoom = scene.createRoom("Room1", 0, 0, 10, 10);
    initialPosition = Position.create(0, 0);
    initialLocation = Location.create("L1", initialPosition, initialRoom);
    agent = new Agent('TestAgent', initialLocation, 5, scene);

  });

  test('should return an empty array if no desires are active', () => {
    expect(desireManager.getActiveDesires()).toEqual([]);
  });

  test('should return an empty array if no desires are active 2', () => {
    // Create desires that are not satisfied
    const desire1 = new MockDesire('desire1', jest.fn(() => false), 1);
    const desire2 = new MockDesire('desire2', jest.fn(() => false), 2);
    const desire3 = new MockDesire('desire3', jest.fn(() => false), 3);

    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    desireManager.addDesire(desire3);

    const activeDesires = desireManager.getActiveDesires();
    expect(activeDesires).toHaveLength(0);
  });

  test('should return only desires that are active', () => {
    const desire1 = new MockDesire('desire1', jest.fn(() => true), 1);
    const desire2 = new MockDesire('desire2', jest.fn(() => false), 2);
    const desire3 = new MockDesire('desire3', jest.fn(() => true), 3);

    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    desireManager.addDesire(desire3);

    // Simulate update to populate active desires
    desireManager.update(agent);

    const activeDesires = desireManager.getActiveDesires();
    expect(activeDesires).toHaveLength(2);
    expect(activeDesires).toContainEqual(desire1);
    expect(activeDesires).toContainEqual(desire3);
  });

});

describe('update', () => {
  let desireManager;
  let scene;
  let initialLocation;
  let initialPosition
  let initialRoom;
  let agent;

  beforeEach(() => {
    desireManager = new DesireManager();
    scene = new Scene();
    initialRoom = scene.createRoom("Room1", 0, 0, 10, 10);
    initialPosition = Position.create(0, 0);
    initialLocation = Location.create("L1", initialPosition, initialRoom);
    agent = new Agent('TestAgent', initialLocation, 5, scene);
  });

  test('should select the highest priority satisfied desire', () => {
    const desireLowPrioritySatisfied = new MockDesire('lowSat', jest.fn(() => true), 5);
    const desireHighPrioritySatisfied = new MockDesire('highSat', jest.fn(() => true), 10);
    const desireNotSatisfied = new MockDesire('notSat', jest.fn(() => false), 15);

    desireManager.addDesire(desireLowPrioritySatisfied);
    desireManager.addDesire(desireHighPrioritySatisfied);
    desireManager.addDesire(desireNotSatisfied);

    desireManager.update(agent);

    expect(desireLowPrioritySatisfied.condition).toHaveBeenCalledWith(agent);
    expect(desireHighPrioritySatisfied.condition).toHaveBeenCalledWith(agent);
    expect(desireNotSatisfied.condition).toHaveBeenCalledWith(agent);
    expect(desireManager.getCurrentBestDesire()).toBe(desireHighPrioritySatisfied);
  });

  test('should set bestDesire to null if no desires are satisfied', () => {
    const desire1 = new MockDesire('d1', jest.fn(() => false), 5);
    const desire2 = new MockDesire('d2', jest.fn(() => false), 5);

    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    desireManager.update(agent);

    expect(desire1.condition).toHaveBeenCalledWith(agent);
    expect(desire2.condition).toHaveBeenCalledWith(agent);
    expect(desireManager.getCurrentBestDesire()).toBeNull();
  });

  test('should handle an empty list of desires', () => {
    desireManager.update(agent);
    expect(desireManager.getCurrentBestDesire()).toBeNull();
  });

  test('should correctly sort active desires by priority', () => {
    const desireP1 = new MockDesire('P1', jest.fn(() => true), 1);
    const desireP5 = new MockDesire('P5', jest.fn(() => true), 5);
    const desireP3 = new MockDesire('P3', jest.fn(() => true), 3);

    desireManager.addDesire(desireP1);
    desireManager.addDesire(desireP5);
    desireManager.addDesire(desireP3);

    desireManager.update(agent);
    // The internal activeDesires array should be sorted, and bestDesire should be P5
    expect(desireManager.getCurrentBestDesire()).toBe(desireP5);
    expect(desireManager.getActiveDesires()).toEqual([desireP5, desireP3, desireP1]);
  });
});
