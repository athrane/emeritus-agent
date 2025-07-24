import { System } from '../internal.js';
import { Entities } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { TimeComponent } from '../internal.js';

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
   * @param {Entities} entities - The manager for all entities.
   * @param {number} realDeltaTimeMs - The real time elapsed since the last update, in milliseconds.
   */
  update(entities, realDeltaTimeMs) {
    TypeUtils.ensureInstanceOf(entities, Entities);
    TypeUtils.ensureNumber(realDeltaTimeMs);

    // get the entity with TimeComponent
    const timeEntities = entities.filterByComponents(TimeComponent);

    // exit if no entity with TimeComponent is found
    if (timeEntities.length === 0) {
      return;
    }

    if (timeEntities.length > 1) {
      console.warn('Multiple entities with TimeComponent found. TimeSystem will only update the first one.');
    }

    // get the first entity with TimeComponent
    const timeComponent = timeEntities[0].getComponent(TimeComponent);

    const realDeltaTimeSec = realDeltaTimeMs / 1000;
    const simDeltaTimeSec = realDeltaTimeSec * timeComponent.getTimeScale();

    timeComponent.setDeltaTime(simDeltaTimeSec);
    timeComponent.setTotalTime(timeComponent.getTotalTime() + simDeltaTimeSec);

    const simDeltaTimeMin = simDeltaTimeSec / 60;
    let newTimeOfDay = timeComponent.getTimeOfDay() + simDeltaTimeMin;

    // if the new time of day exceeds the minutes in a day, roll over to the next day
    if (newTimeOfDay >= TimeSystem.MINUTES_PER_DAY) {
      const daysPassed = Math.floor(newTimeOfDay / TimeSystem.MINUTES_PER_DAY);
      timeComponent.setDay(timeComponent.getDay() + daysPassed);
      newTimeOfDay %= TimeSystem.MINUTES_PER_DAY;
    }

    timeComponent.setTimeOfDay(newTimeOfDay);
  }
}