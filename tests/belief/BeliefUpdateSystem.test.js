import {
  BeliefUpdateSystem,
  Entities,
  Entity,
  HungerBeliefComponent,
  HungerUpdateComponent,
  FatigueBeliefComponent,
  FatigueUpdateComponent,
  BoredomBeliefComponent,
  BoredomUpdateComponent,
  DentalHygieneBeliefComponent,
  DentalHygieneUpdateComponent,
  BodyHygieneBeliefComponent,
  BodyHygieneUpdateComponent,
  HandHygieneBeliefComponent,
  HandHygieneUpdateComponent,
  UrinationBeliefComponent,
  UrinationUpdateComponent,
  System
} from '../../src/internal.js';

describe('BeliefUpdateSystem', () => {
  let system;
  let entitiesManager;

  beforeEach(() => {
    system = new BeliefUpdateSystem();
    entitiesManager = new Entities();
  });

  it('should be a subclass of System', () => {
    expect(system).toBeInstanceOf(System);
  });

  describe('static clamp', () => {
    it('should not change a value within the range', () => {
      expect(BeliefUpdateSystem.clamp(50, 0, 100)).toBe(50);
    });

    it('should clamp a value greater than the max', () => {
      expect(BeliefUpdateSystem.clamp(120, 0, 100)).toBe(100);
    });

    it('should clamp a value less than the min', () => {
      expect(BeliefUpdateSystem.clamp(-10, 0, 100)).toBe(0);
    });
  });

  describe('update', () => {
    it('should increase hunger based on the update rate and delta time', () => {
      const hungryEntity = entitiesManager.create(
        new HungerBeliefComponent(10),
        new HungerUpdateComponent(2) // increases by 2 per second
      );

      system.update(entitiesManager, 5); // 5 seconds passed

      const hungerBelief = hungryEntity.getComponent(HungerBeliefComponent);
      // Expected: 10 + (2 * 5) = 20
      expect(hungerBelief.getValue()).toBe(20);
    });

    it('should clamp the hunger value at 100', () => {
      const hungryEntity = entitiesManager.create(
        new HungerBeliefComponent(95),
        new HungerUpdateComponent(5)
      );

      system.update(entitiesManager, 2);

      const hungerBelief = hungryEntity.getComponent(HungerBeliefComponent);
      // Expected: 95 + (5 * 2) = 105, which clamps to 100
      expect(hungerBelief.getValue()).toBe(100);
    });

    it('should clamp the hunger value at 0', () => {
      // A negative update rate could represent eating
      const eatingEntity = entitiesManager.create(
        new HungerBeliefComponent(8),
        new HungerUpdateComponent(-3)
      );

      system.update(entitiesManager, 4);

      const hungerBelief = eatingEntity.getComponent(HungerBeliefComponent);
      // Expected: 8 + (-3 * 4) = -4, which clamps to 0
      expect(hungerBelief.getValue()).toBe(0);
    });

    it('should not update entities that only have a HungerBeliefComponent', () => {
      const entity = entitiesManager.create(new HungerBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(HungerBeliefComponent).getValue()).toBe(50);
    });

    it('should not throw an error for entities that only have a HungerUpdateComponent', () => {
      entitiesManager.create(new HungerUpdateComponent(5));
      expect(() => system.update(entitiesManager, 10)).not.toThrow();
    });

    it('should throw a TypeError if the entitiesManager is not an instance of Entities', () => {
      const invalidManager = {};
      expect(() => system.update(invalidManager, 0)).toThrow(TypeError);
    });

    // --- Fatigue Tests ---
    it('should increase fatigue based on the update rate and delta time', () => {
      const tiredEntity = entitiesManager.create(
        new FatigueBeliefComponent(30),
        new FatigueUpdateComponent(1.5) // increases by 1.5 per second
      );

      system.update(entitiesManager, 10); // 10 seconds passed

      const fatigueBelief = tiredEntity.getComponent(FatigueBeliefComponent);
      // Expected: 30 + (1.5 * 10) = 45
      expect(fatigueBelief.getValue()).toBe(45);
    });

    it('should clamp the fatigue value at 100', () => {
      const tiredEntity = entitiesManager.create(
        new FatigueBeliefComponent(98),
        new FatigueUpdateComponent(2)
      );

      system.update(entitiesManager, 3);

      const fatigueBelief = tiredEntity.getComponent(FatigueBeliefComponent);
      // Expected: 98 + (2 * 3) = 104, which clamps to 100
      expect(fatigueBelief.getValue()).toBe(100);
    });

    it('should not update entities that only have a FatigueBeliefComponent', () => {
      const entity = entitiesManager.create(new FatigueBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(FatigueBeliefComponent).getValue()).toBe(50);
    });

    // --- Boredom Tests ---
    it('should increase boredom based on the update rate and delta time', () => {
      const boredEntity = entitiesManager.create(
        new BoredomBeliefComponent(10),
        new BoredomUpdateComponent(3) // increases by 3 per second
      );

      system.update(entitiesManager, 5); // 5 seconds passed

      const boredomBelief = boredEntity.getComponent(BoredomBeliefComponent);
      // Expected: 10 + (3 * 5) = 25
      expect(boredomBelief.getValue()).toBe(25);
    });

    it('should clamp the boredom value at 100', () => {
      const boredEntity = entitiesManager.create(
        new BoredomBeliefComponent(99),
        new BoredomUpdateComponent(4)
      );

      system.update(entitiesManager, 1);

      const boredomBelief = boredEntity.getComponent(BoredomBeliefComponent);
      // Expected: 99 + (4 * 1) = 103, which clamps to 100
      expect(boredomBelief.getValue()).toBe(100);
    });

    it('should not update entities that only have a BoredomBeliefComponent', () => {
      const entity = entitiesManager.create(new BoredomBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(BoredomBeliefComponent).getValue()).toBe(50);
    });

    // --- Dental Hygiene Tests ---
    it('should update dental hygiene based on the update rate and delta time', () => {
      const entity = entitiesManager.create(
        new DentalHygieneBeliefComponent(80),
        new DentalHygieneUpdateComponent(1) // hygiene worsens over time
      );

      system.update(entitiesManager, 10); // 10 seconds passed

      const belief = entity.getComponent(DentalHygieneBeliefComponent);
      // Expected: 80 + (1 * 10) = 90
      expect(belief.getValue()).toBe(90);
    });

    it('should clamp the dental hygiene value at 0', () => {
      const entity = entitiesManager.create(
        new DentalHygieneBeliefComponent(10),
        new DentalHygieneUpdateComponent(-5) // brushing teeth
      );

      system.update(entitiesManager, 3);

      const belief = entity.getComponent(DentalHygieneBeliefComponent);
      // Expected: 10 + (-5 * 3) = -5, which clamps to 0
      expect(belief.getValue()).toBe(0);
    });

    it('should not update entities that only have a DentalHygieneBeliefComponent', () => {
      const entity = entitiesManager.create(new DentalHygieneBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(DentalHygieneBeliefComponent).getValue()).toBe(50);
    });

    // --- Body Hygiene Tests ---
    it('should update body hygiene based on the update rate and delta time', () => {
      const entity = entitiesManager.create(
        new BodyHygieneBeliefComponent(20),
        new BodyHygieneUpdateComponent(1.5) // hygiene worsens over time
      );

      system.update(entitiesManager, 10); // 10 seconds passed

      const belief = entity.getComponent(BodyHygieneBeliefComponent);
      // Expected: 20 + (1.5 * 10) = 35
      expect(belief.getValue()).toBe(35);
    });

    it('should clamp the body hygiene value at 100', () => {
      const entity = entitiesManager.create(
        new BodyHygieneBeliefComponent(90),
        new BodyHygieneUpdateComponent(5)
      );

      system.update(entitiesManager, 4);

      const belief = entity.getComponent(BodyHygieneBeliefComponent);
      // Expected: 90 + (5 * 4) = 110, which clamps to 100
      expect(belief.getValue()).toBe(100);
    });

    it('should not update entities that only have a BodyHygieneBeliefComponent', () => {
      const entity = entitiesManager.create(new BodyHygieneBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(BodyHygieneBeliefComponent).getValue()).toBe(50);
    });

    // --- Hand Hygiene Tests ---
    it('should update hand hygiene based on the update rate and delta time', () => {
      const entity = entitiesManager.create(
        new HandHygieneBeliefComponent(10),
        new HandHygieneUpdateComponent(2.5) // hygiene worsens over time
      );

      system.update(entitiesManager, 4); // 4 seconds passed

      const belief = entity.getComponent(HandHygieneBeliefComponent);
      // Expected: 10 + (2.5 * 4) = 20
      expect(belief.getValue()).toBe(20);
    });

    it('should clamp the hand hygiene value at 0', () => {
      const entity = entitiesManager.create(
        new HandHygieneBeliefComponent(20),
        new HandHygieneUpdateComponent(-10) // washing hands
      );

      system.update(entitiesManager, 3);

      const belief = entity.getComponent(HandHygieneBeliefComponent);
      // Expected: 20 + (-10 * 3) = -10, which clamps to 0
      expect(belief.getValue()).toBe(0);
    });

    it('should not update entities that only have a HandHygieneBeliefComponent', () => {
      const entity = entitiesManager.create(new HandHygieneBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(HandHygieneBeliefComponent).getValue()).toBe(50);
    });

    // --- Urination Tests ---
    it('should update urination need based on the update rate and delta time', () => {
      const entity = entitiesManager.create(
        new UrinationBeliefComponent(40),
        new UrinationUpdateComponent(2) // need increases over time
      );

      system.update(entitiesManager, 15); // 15 seconds passed

      const belief = entity.getComponent(UrinationBeliefComponent);
      // Expected: 40 + (2 * 15) = 70
      expect(belief.getValue()).toBe(70);
    });

    it('should clamp the urination value at 100', () => {
      const entity = entitiesManager.create(
        new UrinationBeliefComponent(95),
        new UrinationUpdateComponent(3)
      );

      system.update(entitiesManager, 5);

      const belief = entity.getComponent(UrinationBeliefComponent);
      // Expected: 95 + (3 * 5) = 110, which clamps to 100
      expect(belief.getValue()).toBe(100);
    });

    it('should not update entities that only have a UrinationBeliefComponent', () => {
      const entity = entitiesManager.create(new UrinationBeliefComponent(50));

      system.update(entitiesManager, 10);

      expect(entity.getComponent(UrinationBeliefComponent).getValue()).toBe(50);
    });
  });
});