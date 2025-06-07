import { DesireManager } from '../../../src/bdiagent/desire/DesireManager.js';
import { Desire } from '../../../src/bdiagent/desire/Desire.js';
import { Agent } from '../../../src/internal.js'; // Assuming Agent is needed for conditions

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

  test('should not add the same desire multiple times', () => {
    const desire1 = new MockDesire('desire1', jest.fn(), 1);
    desireManager.addDesire(desire1);
    desireManager.addDesire(desire1); // Adding the same desire again
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

  test('is case-insensitive when checking for desires', () => {
    const desire1 = new MockDesire('Desire1', jest.fn(), 1);
    desireManager.addDesire(desire1);
    expect(desireManager.hasDesire('desire1')).toBe(true);
    expect(desireManager.hasDesire('DESIRE1')).toBe(true);
    expect(desireManager.hasDesire('DeSiRe1')).toBe(true);
  }
  );
  test('should not throw an error when checking for a desire with an empty string', () => {
    expect(() => desireManager.hasDesire('')).not.toThrow();
    expect(desireManager.hasDesire('')).toBe(false);
  });

  test('should not throw an error when checking for a desire with null or undefined', () => {
    expect(() => desireManager.hasDesire(null)).not.toThrow();
    expect(desireManager.hasDesire(null)).toBe(false);
    expect(() => desireManager.hasDesire(undefined)).not.toThrow();
    expect(desireManager.hasDesire(undefined)).toBe(false);
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

describe('update', () => {
  let desireManager;
  let mockAgent;

  beforeEach(() => {
    desireManager = new DesireManager();
    mockAgent = new Agent('testAgent'); // Use a real or mock Agent
    // If your desire conditions rely on agent's beliefs, mock them:
    // mockAgent.getBelief = jest.fn((beliefName) => ({ getValue: () => 0 })); 
  });

  test('should select the highest priority satisfied desire', () => {
    const desireLowPrioritySatisfied = new MockDesire('lowSat', jest.fn(() => true), 5);
    const desireHighPrioritySatisfied = new MockDesire('highSat', jest.fn(() => true), 10);
    const desireNotSatisfied = new MockDesire('notSat', jest.fn(() => false), 15);

    desireManager.addDesire(desireLowPrioritySatisfied);
    desireManager.addDesire(desireHighPrioritySatisfied);
    desireManager.addDesire(desireNotSatisfied);

    desireManager.update(mockAgent);

    expect(desireLowPrioritySatisfied.condition).toHaveBeenCalledWith(mockAgent);
    expect(desireHighPrioritySatisfied.condition).toHaveBeenCalledWith(mockAgent);
    expect(desireNotSatisfied.condition).toHaveBeenCalledWith(mockAgent);
    expect(desireManager.getCurrentBestDesire()).toBe(desireHighPrioritySatisfied);
  });

  test('should set bestDesire to null if no desires are satisfied', () => {
    const desire1 = new MockDesire('d1', jest.fn(() => false), 5);
    const desire2 = new MockDesire('d2');
    desire2.setConditionSatisfied(false); // Using helper

    desireManager.addDesire(desire1);
    desireManager.addDesire(desire2);
    desireManager.update(mockAgent);

    expect(desire1.condition).toHaveBeenCalledWith(mockAgent);
    expect(desire2.condition).toHaveBeenCalledWith(mockAgent);
    expect(desireManager.getCurrentBestDesire()).toBeNull();
  });

  test('should handle an empty list of desires', () => {
    desireManager.update(mockAgent);
    expect(desireManager.getCurrentBestDesire()).toBeNull();
  });

  test('should correctly sort active desires by priority', () => {
    const desireP1 = new MockDesire('P1', jest.fn(() => true), 1);
    const desireP5 = new MockDesire('P5', jest.fn(() => true), 5);
    const desireP3 = new MockDesire('P3', jest.fn(() => true), 3);

    desireManager.addDesire(desireP1);
    desireManager.addDesire(desireP5);
    desireManager.addDesire(desireP3);

    desireManager.update(mockAgent);
    // The internal activeDesires array should be sorted, and bestDesire should be P5
    expect(desireManager.getCurrentBestDesire()).toBe(desireP5);
    // To check internal sorting (optional, white-box testing):
    // Accessing private `activeDesires` for testing might not be ideal.
    // Instead, ensure the `bestDesire` is correct, which implies correct sorting.
  });
});
