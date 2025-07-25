import { HungerUpdateComponent, BeliefUpdateComponent } from '../../src/internal.js';

describe('HungerUpdateComponent', () => {
  it('should be a subclass of BeliefUpdateComponent', () => {
    const hungerUpdate = new HungerUpdateComponent(1);
    expect(hungerUpdate).toBeInstanceOf(BeliefUpdateComponent);
  });

  it('should initialize with a rate value', () => {
    const rate = 2.5;
    const hungerUpdate = new HungerUpdateComponent(rate);
    expect(hungerUpdate.getValue()).toBe(rate);
  });

  it('should throw a TypeError if rate is not a number', () => {
    expect(() => new HungerUpdateComponent('2.5')).toThrow(TypeError);
  });
});