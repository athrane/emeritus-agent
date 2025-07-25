import { DentalHygieneBeliefComponent, BeliefComponent } from '../../src/internal.js';

describe('DentalHygieneBeliefComponent', () => {
  it('should be a subclass of BeliefComponent', () => {
    const belief = new DentalHygieneBeliefComponent();
    expect(belief).toBeInstanceOf(BeliefComponent);
  });

  it('should initialize with a default value of 0', () => {
    const belief = new DentalHygieneBeliefComponent();
    expect(belief.getValue()).toBe(0);
  });

  it('should initialize with a specific value', () => {
    const initialValue = 70;
    const belief = new DentalHygieneBeliefComponent(initialValue);
    expect(belief.getValue()).toBe(initialValue);
  });

  it('should have the name "Dental Hygiene"', () => {
    const belief = new DentalHygieneBeliefComponent();
    expect(belief.getName()).toBe('Dental Hygiene');
  });
});