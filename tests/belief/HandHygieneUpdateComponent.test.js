import { HandHygieneUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('HandHygieneUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const update = new HandHygieneUpdateComponent(1);
    expect(update).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 1.2;
    const update = new HandHygieneUpdateComponent(rate);
    expect(update.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new HandHygieneUpdateComponent('1.2')).toThrow(TypeError);
  });
});