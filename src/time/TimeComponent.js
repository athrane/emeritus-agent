import { Component } from '../internal.js';
import { TypeUtils } from '../internal.js';

/**
 * A component that holds global simulation time data.
 * It should be attached to a single "world" or "global" entity.
 */
export class TimeComponent extends Component {
  
  /** Total simulation time elapsed, in seconds. */
  #totalTime = 0;

  /** Simulation time elapsed in the last frame, in seconds. */
  #deltaTime = 0;

  /** The current simulation day. */
  #day = 1;

  /** The current time of day, in minutes past midnight (0-1439). */
  #timeOfDay = 0;

  /** How fast simulation time passes relative to real-time.
   * e.g., a scale of 60 means 1 real second = 1 simulation minute.
   * @type {number}
   */
  #timeScale;

  /**
   * Creates an instance of TimeComponent.
   * @param {number} timeScale - The multiplier for simulation time progression.
   * @param {number} initialTimeOfDay - The starting time of day in minutes (0-1439).
   */
  constructor(timeScale = 60, initialTimeOfDay = 0) {
    super();
    TypeUtils.ensureNumber(timeScale);
    TypeUtils.ensureNumber(initialTimeOfDay);

    this.#timeScale = timeScale;
    this.#timeOfDay = initialTimeOfDay;
  }

    /**
   * Gets the simulation time elapsed in the last frame, in seconds.
   * @returns {number} The delta time.
   */
  getDeltaTime() {
    return this.#deltaTime;
  }

  /**
   * Sets the simulation time elapsed in the last frame, in seconds.
   * @param {number} deltaTime - The delta time to set.
   */
  setDeltaTime(deltaTime) {
    TypeUtils.ensureNumber(deltaTime);
    this.#deltaTime = deltaTime;
  }

  /**
   * Gets the total simulation time elapsed, in seconds.
   * @returns {number} The total time.
   */
  getTotalTime() {
    return this.#totalTime;
  }

  /**
   * Sets the total simulation time elapsed, in seconds.
   * @param {number} totalTime - The total time to set.
   */
  setTotalTime(totalTime) {
    TypeUtils.ensureNumber(totalTime);
    this.#totalTime = totalTime;
  }

  /**
   * Gets the time scale.
   * @returns {number} The time scale.
   */
  getTimeScale() {
    return this.#timeScale;
  }

    /**
   * Sets the time of day.
   * @param {number} timeOfDay - The time of day to set.
   */
  setTimeOfDay(timeOfDay) {
    TypeUtils.ensureNumber(timeOfDay);
    this.#timeOfDay = timeOfDay;
  }

  /**
   * Gets the current time of day, in minutes past midnight.
   * @returns {number} The time of day.
   */
  getTimeOfDay() {
    return this.#timeOfDay;
  }

  /**
   * Gets the current simulation day.
   * @returns {number} The current day.
   */
  getDay() {
    return this.#day;
  }

  /**
   * Sets the current simulation day.
   * @param {number} day - The day to set.
   */
  setDay(day) {
    TypeUtils.ensureNumber(day);
    this.#day = day;
  }
}