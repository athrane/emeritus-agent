import { Desire2 } from '../../src/internal.js';
import { Agent } from '../../src/internal.js';
import { Scene } from '../../src/internal.js';
import { NullMotion } from '../../src/internal.js';
import { Belief } from '../../src/internal.js';

describe('Desire2', () => {
  let agent;
  let name;
  let condition;
  let priorityFn;

  beforeEach(() => {
    const scene = new Scene();
    const nullMotion = new NullMotion();
    agent = new Agent('TestAgent', nullMotion, scene);
    name = 'TestDesire';
    condition = jest.fn(a => a.getBelief('test').getValue() > 50);
    priorityFn = jest.fn(a => a.getBelief('test').getValue());
    agent.addBelief(new Belief('test', 0));
  });

  it('should construct with a name, condition function, and priority function', () => {
    const desire = new Desire2(name, condition, priorityFn);
    expect(desire).toBeInstanceOf(Desire2);
    expect(desire.getName()).toBe(name);
    expect(desire.getCondition()).toBe(condition);
    expect(desire.getPriorityFunction()).toBe(priorityFn);
  });

  it('should throw TypeError for invalid constructor arguments', () => {
    expect(() => new Desire2(123, condition, priorityFn)).toThrow(TypeError);
    expect(() => new Desire2(name, 'not a function', priorityFn)).toThrow(TypeError);
    expect(() => new Desire2(name, condition, 'not a function')).toThrow(TypeError);
  });

  describe('isActive', () => {
    it('should return false when the condition is not met', () => {
      agent.getBelief('test').value = 40;
      const desire = new Desire2(name, condition, priorityFn);
      expect(desire.isActive(agent)).toBe(false);
      expect(condition).toHaveBeenCalledWith(agent);
    });

    it('should return true when the condition is met', () => {
      agent.getBelief('test').value = 60;
      const desire = new Desire2(name, condition, priorityFn);
      expect(desire.isActive(agent)).toBe(true);
      expect(condition).toHaveBeenCalledWith(agent);
    });

    it('should throw TypeError if a non-Agent is passed', () => {
      const desire = new Desire2(name, condition, priorityFn);
      expect(() => desire.isActive({})).toThrow(TypeError);
    });
  });

  describe('getPriority', () => {
    it('should calculate priority based on the agent state', () => {
      agent.getBelief('test').value = 75;
      const desire = new Desire2(name, condition, priorityFn);
      expect(desire.getPriority(agent)).toBe(75);
      expect(priorityFn).toHaveBeenCalledWith(agent);
    });

    it('should calculate a different priority when agent state changes', () => {
      agent.getBelief('test').value = 90;
      const desire = new Desire2(name, condition, priorityFn);
      expect(desire.getPriority(agent)).toBe(90);
      expect(priorityFn).toHaveBeenCalledWith(agent);
    });

    it('should round the priority to the nearest integer', () => {
        const floatPriorityFn = jest.fn(a => a.getBelief('test').getValue() + 0.7);
        agent.getBelief('test').value = 80;
        const desire = new Desire2(name, condition, floatPriorityFn);
        expect(desire.getPriority(agent)).toBe(81);
    });

    it('should throw TypeError if a non-Agent is passed', () => {
      const desire = new Desire2(name, condition, priorityFn);
      expect(() => desire.getPriority({})).toThrow(TypeError);
    });
  });
});