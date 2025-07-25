import { FatigueUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('FatigueUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const fatigueUpdate = new FatigueUpdateComponent(1);
    expect(fatigueUpdate).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 1.5;
    const fatigueUpdate = new FatigueUpdateComponent(rate);
    expect(fatigueUpdate.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new FatigueUpdateComponent('1.5')).toThrow(TypeError);
  });
});