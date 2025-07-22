import { System } from '../internal.js';
import { Entities } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { TimeComponent } from './TimeComponent.js';

/**
 * A system that manages the progression of global simulation time.
 * It operates on a single entity that must have a TimeComponent.
 */
export class TimeSystem extends System {
  /**
   * The number of minutes in a day.
   */
  static MINUTES_PER_DAY = 1440;

  /**
   * Updates the global time based on the real-time delta.
   * @param {Entities} entitiesManager - The manager for all entities.
   * @param {number} realDeltaTimeMs - The real time elapsed since the last update, in milliseconds.
   */
  update(entitiesManager, realDeltaTimeMs) {
    TypeUtils.ensureInstanceOf(entitiesManager, Entities);
    TypeUtils.ensureNumber(realDeltaTimeMs);

    const timeEntities = entitiesManager.filterByComponents(TimeComponent);

    if (timeEntities.length === 0) {
      return;
    }

    if (timeEntities.length > 1) {
      console.warn('Multiple entities with TimeComponent found. TimeSystem will only update the first one.');
    }

    const timeComponent = timeEntities[0].getComponent(TimeComponent);

    const realDeltaTimeSec = realDeltaTimeMs / 1000;
    const simDeltaTimeSec = realDeltaTimeSec * timeComponent.timeScale;

    timeComponent.deltaTime = simDeltaTimeSec;
    timeComponent.totalTime += simDeltaTimeSec;

    const simDeltaTimeMin = simDeltaTimeSec / 60;
    timeComponent.timeOfDay += simDeltaTimeMin;

    if (timeComponent.timeOfDay >= TimeSystem.MINUTES_PER_DAY) {
      const daysPassed = Math.floor(timeComponent.timeOfDay / TimeSystem.MINUTES_PER_DAY);
      timeComponent.day += daysPassed;
      timeComponent.timeOfDay %= TimeSystem.MINUTES_PER_DAY;
    }
  }
}