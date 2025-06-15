import { TimeOfDay } from '../internal.js';

/**
 * TimeManager class
 * Handles simulation time progression and tracking.
 */
export class TimeManager {

    /**
     * Defines the number of minutes per day.
     */
    static MINUTES_PER_DAY = 1440;
    
    /**
     * Constructor for TimeManager.
     * @param {number} stepMinutes - Number of minutes per simulation step.
     */
    constructor(stepMinutes) {
        this.stepMinutes = stepMinutes; // Minutes per simulation step
        this.timeOfDayMinutes = 0;      // Minutes since midnight (0-1439)
        this.day = 1;                   // Simulation day counter
    }

    /**
     * Advances the simulation time by one step.
     */
    advanceStep() {
        this.timeOfDayMinutes += this.stepMinutes;
        if (this.timeOfDayMinutes >= TimeManager.MINUTES_PER_DAY) {
            this.timeOfDayMinutes -= TimeManager.MINUTES_PER_DAY;
            this.day += 1;
        }
    }

    /**
     * Returns the current time of day as a TimeOfDay object.
     */
    getTimeOfDay() {
        const hours = Math.floor(this.timeOfDayMinutes / 60);
        const minutes = this.timeOfDayMinutes % 60;
        return new TimeOfDay(hours, minutes);
    }

    /**
     * Returns the current time of day as a formatted string (e.g., "14:05").
     * @returns {string} Formatted time string in "HH:MM" format.
     */
    getTimeOfDayString() {
        const { hours, minutes } = this.getTimeOfDay();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    /**
     * Returns the current simulation day number.
     * @return {number} The current day number in the simulation.
     */
    getDay() {
        return this.day;
    }

    /**
     * Returns the number of minutes per simulation step.
     * @return {number} The number of minutes per step
     */
    getStepMinutes() {
        return this.stepMinutes;
    }
}
