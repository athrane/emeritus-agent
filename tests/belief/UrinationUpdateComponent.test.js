import { UrinationUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('UrinationUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const update = new UrinationUpdateComponent(1);
    expect(update).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 2;
    const update = new UrinationUpdateComponent(rate);
    expect(update.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new UrinationUpdateComponent('2')).toThrow(TypeError);
  });
});