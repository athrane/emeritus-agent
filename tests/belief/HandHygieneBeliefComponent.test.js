import { HandHygieneBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('HandHygieneBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const belief = new HandHygieneBeliefComponent();
    expect(belief).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const belief = new HandHygieneBeliefComponent();
    expect(belief.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 60;
    const belief = new HandHygieneBeliefComponent(initialValue);
    expect(belief.getValue()).toBe(initialValue);
  });

  it('should have the name "Hand Hygiene"', () => {
    const belief = new HandHygieneBeliefComponent();
    expect(belief.getName()).toBe('Hand Hygiene');
  });
});