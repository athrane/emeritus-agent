import { DentalHygieneUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('DentalHygieneUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const update = new DentalHygieneUpdateComponent(1);
    expect(update).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = -10; // e.g., brushing teeth
    const update = new DentalHygieneUpdateComponent(rate);
    expect(update.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new DentalHygieneUpdateComponent('1')).toThrow(TypeError);
  });
});