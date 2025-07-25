import { HungerBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('HungerBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const hunger = new HungerBeliefComponent();
    expect(hunger).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const hunger = new HungerBeliefComponent();
    expect(hunger.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 25;
    const hunger = new HungerBeliefComponent(initialValue);
    expect(hunger.getValue()).toBe(initialValue);
  });

  it('should have the name "Hunger"', () => {
    const hunger = new HungerBeliefComponent();
    expect(hunger.getName()).toBe('Hunger');
  });
});