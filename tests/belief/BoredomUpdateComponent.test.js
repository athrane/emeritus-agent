import { BoredomUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('BoredomUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const boredomUpdate = new BoredomUpdateComponent(1);
    expect(boredomUpdate).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 0.5;
    const boredomUpdate = new BoredomUpdateComponent(rate);
    expect(boredomUpdate.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new BoredomUpdateComponent('0.5')).toThrow(TypeError);
  });
});