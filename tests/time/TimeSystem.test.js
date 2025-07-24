import {
  TimeSystem,
  TimeComponent,
  Entities,
  Entity,
} from '../../src/internal.js';

describe('TimeSystem', () => {
  let timeSystem;
  let entities;
  let timeEntity;
  let timeComponent;

  beforeEach(() => {
    timeSystem = new TimeSystem();
    entities = new Entities();
    timeEntity = entities.create(new TimeComponent());
    timeComponent = timeEntity.getComponent(TimeComponent);
  });

  describe('update', () => {
    test('should not throw an error and should return if no entity with TimeComponent exists', () => {
      const emptyEntities = new Entities();
      expect(() => timeSystem.update(emptyEntities, 1000)).not.toThrow();
    });

    test('should log a warning if multiple entities with TimeComponent exist', () => {
      // Add a second entity with TimeComponent
      entities.create(new TimeComponent());

      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      timeSystem.update(entities, 1000);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Multiple entities with TimeComponent found. TimeSystem will only update the first one.'
      );
      consoleWarnSpy.mockRestore();
    });

    test('should correctly update time properties for a given delta time', () => {
      // timeScale is 60 by default. 1 real second = 60 simulation seconds = 1 simulation minute.
      const realDeltaTimeMs = 1000; // 1 second

      timeSystem.update(entities, realDeltaTimeMs);

      // simDeltaTimeSec = (1000 / 1000) * 60 = 60
      expect(timeComponent.getDeltaTime()).toBe(60);
      expect(timeComponent.getTotalTime()).toBe(60);

      // simDeltaTimeMin = 60 / 60 = 1
      expect(timeComponent.getTimeOfDay()).toBe(1);
      expect(timeComponent.getDay()).toBe(1);
    });

    test('should handle a single day rollover correctly', () => {
      // Set time to one minute before midnight
      timeComponent.setTimeOfDay(TimeSystem.MINUTES_PER_DAY - 1); // 1439
      timeComponent.setDay(5);
      // timeScale is 60. 1 real second = 1 sim minute.
      const realDeltaTimeMs = 1000;

      timeSystem.update(entities, realDeltaTimeMs);

      expect(timeComponent.getDay()).toBe(6);
      expect(timeComponent.getTimeOfDay()).toBe(0);
      expect(timeComponent.getTotalTime()).toBe(60); // totalTime still accumulates
    });

    test('should handle multiple day rollovers correctly', () => {
      // Isolate this test by creating a fresh entities manager
      entities = new Entities();
      // 1 real second = 1 sim day
      const timeScale = 60 * TimeSystem.MINUTES_PER_DAY; // 86400
      timeComponent = new TimeComponent(timeScale);
      entities.create(timeComponent);

      // 2.5 real seconds should be 2.5 sim days
      const realDeltaTimeMs = 2500;

      timeSystem.update(entities, realDeltaTimeMs);

      expect(timeComponent.getDay()).toBe(3);
      expect(timeComponent.getTimeOfDay()).toBe(720); // Noon
      expect(timeComponent.getTotalTime()).toBe(2.5 * timeScale);
    });

    test('should update only the first entity with TimeComponent', () => {
      const secondTimeComponent = new TimeComponent(1, 0);
      entities.create(secondTimeComponent);

      timeSystem.update(entities, 1000);

      // First component should be updated
      expect(timeComponent.getTotalTime()).toBe(60);
      // Second component should NOT be updated
      expect(secondTimeComponent.getTotalTime()).toBe(0);
    });

    test('should throw TypeError for invalid arguments', () => {
      expect(() => timeSystem.update({}, 1000)).toThrow(TypeError);
      expect(() => timeSystem.update(entities, '1000')).toThrow(TypeError);
    });
  });
});