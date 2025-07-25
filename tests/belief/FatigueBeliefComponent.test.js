import { FatigueBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('FatigueBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const fatigue = new FatigueBeliefComponent();
    expect(fatigue).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const fatigue = new FatigueBeliefComponent();
    expect(fatigue.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 30;
    const fatigue = new FatigueBeliefComponent(initialValue);
    expect(fatigue.getValue()).toBe(initialValue);
  });

  it('should have the name "Fatigue"', () => {
    const fatigue = new FatigueBeliefComponent();
    expect(fatigue.getName()).toBe('Fatigue');
  });
});