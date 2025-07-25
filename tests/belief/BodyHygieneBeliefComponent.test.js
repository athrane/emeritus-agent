import { BodyHygieneBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('BodyHygieneBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const belief = new BodyHygieneBeliefComponent();
    expect(belief).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const belief = new BodyHygieneBeliefComponent();
    expect(belief.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 40;
    const belief = new BodyHygieneBeliefComponent(initialValue);
    expect(belief.getValue()).toBe(initialValue);
  });

  it('should have the name "Body Hygiene"', () => {
    const belief = new BodyHygieneBeliefComponent();
    expect(belief.getName()).toBe('Body Hygiene');
  });
});