import { UrinationBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('UrinationBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const belief = new UrinationBeliefComponent();
    expect(belief).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const belief = new UrinationBeliefComponent();
    expect(belief.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 30;
    const belief = new UrinationBeliefComponent(initialValue);
    expect(belief.getValue()).toBe(initialValue);
  });

  it('should have the name "Urination"', () => {
    const belief = new UrinationBeliefComponent();
    expect(belief.getName()).toBe('Urination');
  });
});