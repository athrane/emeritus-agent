/**
 * TimeOfDay class
 * Represents a time of day with hours and minutes.
 */
export class TimeOfDay {
    /**
     * @param {number} hours - The hour of the day (0-23)
     * @param {number} minutes - The minute of the hour (0-59)
     */
    constructor(hours = 0, minutes = 0) {
        this.hours = hours;
        this.minutes = minutes;
    }

    /**
     * Returns the hour of the day (0-23).
     * @returns {number} The hour of the day.
     */
    getHours() {
        return this.hours;
    }

    /**
     * Returns the minute of the hour (0-59).
     * @returns {number} The minute of the hour.
     */
    getMinutes() {
        return this.minutes;
    }
}
