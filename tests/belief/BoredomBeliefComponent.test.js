import { BoredomBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('BoredomBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const boredom = new BoredomBeliefComponent();
    expect(boredom).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const boredom = new BoredomBeliefComponent();
    expect(boredom.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 50;
    const boredom = new BoredomBeliefComponent(initialValue);
    expect(boredom.getValue()).toBe(initialValue);
  });

  it('should have the name "Boredom"', () => {
    const boredom = new BoredomBeliefComponent();
    expect(boredom.getName()).toBe('Boredom');
  });
});