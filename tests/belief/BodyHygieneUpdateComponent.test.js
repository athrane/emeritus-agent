import { BodyHygieneUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('BodyHygieneUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const update = new BodyHygieneUpdateComponent(1);
    expect(update).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 0.8;
    const update = new BodyHygieneUpdateComponent(rate);
    expect(update.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new BodyHygieneUpdateComponent('0.8')).toThrow(TypeError);
  });
});