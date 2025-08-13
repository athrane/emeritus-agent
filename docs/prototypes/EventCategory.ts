/**
 * TypeScript prototype for EventCategory component
 * This file demonstrates what the EventCategory implementation might look like
 * when migrated to TypeScript as part of Issue #60 (Add weather agent to the simulation)
 */

// Supporting interfaces for weather system
export interface WeatherEffect {
  type: 'temperature' | 'humidity' | 'visibility' | 'windSpeed' | 'pressure';
  value: number;
  description: string;
}

export interface EventTransition {
  targetCategory: string;
  probability: number;
  conditions: WeatherConditions;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

/**
 * Represents a category of weather events within the simulation.
 * 
 * This class is designed to categorize different types of weather phenomena
 * (e.g., rain, snow, storms, clear skies) with their associated characteristics
 * and effects on the simulation environment.
 * 
 * EventCategory serves as a foundational component for the weather agent's
 * belief system in the BDI (Belief-Desire-Intention) architecture.
 */
export class EventCategory {
  private readonly name: string;
  private readonly severity: number;
  private readonly duration: number;
  private readonly effects: WeatherEffect[];
  private readonly transitions: EventTransition[];

  /**
   * Creates a new EventCategory instance.
   * 
   * @param name - Unique identifier for the weather event (e.g., "Light Rain", "Heavy Storm")
   * @param severity - Intensity level from 0-100 (0 = minimal impact, 100 = extreme impact)
   * @param duration - Expected duration in simulation ticks
   * @param effects - Array of environmental effects this weather event produces
   * @param transitions - Possible transitions to other weather categories
   * 
   * @throws {TypeError} If any parameter is of incorrect type
   * @throws {RangeError} If severity is not between 0-100
   */
  constructor(
    name: string,
    severity: number,
    duration: number,
    effects: WeatherEffect[],
    transitions: EventTransition[]
  ) {
    this.validateParameters(name, severity, duration, effects, transitions);
    
    this.name = name;
    this.severity = severity;
    this.duration = duration;
    this.effects = [...effects]; // Defensive copy
    this.transitions = [...transitions]; // Defensive copy
  }

  /**
   * Gets the name of this weather event category.
   * @returns The category name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the severity level of this weather event.
   * @returns Severity value between 0-100
   */
  getSeverity(): number {
    return this.severity;
  }

  /**
   * Gets the expected duration of this weather event.
   * @returns Duration in simulation ticks
   */
  getDuration(): number {
    return this.duration;
  }

  /**
   * Gets the environmental effects of this weather event.
   * @returns Array of weather effects (defensive copy)
   */
  getEffects(): WeatherEffect[] {
    return [...this.effects];
  }

  /**
   * Gets possible transitions from this weather category.
   * @returns Array of possible event transitions (defensive copy)
   */
  getTransitions(): EventTransition[] {
    return [...this.transitions];
  }

  /**
   * Checks if this weather category can transition to another category.
   * 
   * @param category - Target weather category to check
   * @returns True if transition is possible
   */
  canTransitionTo(category: EventCategory): boolean {
    return this.transitions.some(
      transition => transition.targetCategory === category.getName()
    );
  }

  /**
   * Calculates the probability of this weather event occurring
   * given current weather conditions.
   * 
   * @param currentConditions - Current environmental conditions
   * @returns Probability value between 0.0 and 1.0
   */
  calculateProbability(currentConditions: WeatherConditions): number {
    // Simplified probability calculation based on conditions
    // In a real implementation, this would use more sophisticated weather modeling
    
    let baseProbability = 0.1; // Base 10% chance
    
    // Adjust based on severity and conditions
    const severityFactor = this.severity / 100;
    const seasonalFactor = this.getSeasonalFactor(currentConditions.season);
    const temperatureFactor = this.getTemperatureFactor(currentConditions.temperature);
    
    return Math.min(1.0, baseProbability * severityFactor * seasonalFactor * temperatureFactor);
  }

  /**
   * Creates a common weather category factory method.
   * This demonstrates the factory pattern for creating predefined weather types.
   */
  static createLightRain(): EventCategory {
    return new EventCategory(
      "Light Rain",
      25,
      120, // 2 hours in simulation ticks (assuming 1 tick = 1 minute)
      [
        { type: 'humidity', value: 85, description: 'Increased humidity from light precipitation' },
        { type: 'visibility', value: 75, description: 'Slightly reduced visibility' },
        { type: 'temperature', value: -2, description: 'Slight cooling effect' }
      ],
      [
        { 
          targetCategory: "Clear Sky", 
          probability: 0.3, 
          conditions: { temperature: 20, humidity: 60, pressure: 1013, windSpeed: 5, timeOfDay: 'afternoon', season: 'summer' }
        },
        { 
          targetCategory: "Heavy Rain", 
          probability: 0.2, 
          conditions: { temperature: 15, humidity: 90, pressure: 1005, windSpeed: 10, timeOfDay: 'evening', season: 'autumn' }
        }
      ]
    );
  }

  static createHeavyStorm(): EventCategory {
    return new EventCategory(
      "Heavy Storm",
      85,
      60, // 1 hour duration
      [
        { type: 'windSpeed', value: 50, description: 'High wind speeds' },
        { type: 'visibility', value: 30, description: 'Severely reduced visibility' },
        { type: 'pressure', value: -15, description: 'Low atmospheric pressure' },
        { type: 'temperature', value: -5, description: 'Cooling from storm system' }
      ],
      [
        { 
          targetCategory: "Light Rain", 
          probability: 0.6, 
          conditions: { temperature: 18, humidity: 80, pressure: 1010, windSpeed: 15, timeOfDay: 'morning', season: 'spring' }
        },
        { 
          targetCategory: "Clear Sky", 
          probability: 0.3, 
          conditions: { temperature: 22, humidity: 65, pressure: 1015, windSpeed: 8, timeOfDay: 'afternoon', season: 'summer' }
        }
      ]
    );
  }

  /**
   * Validates constructor parameters for type safety and business rules.
   */
  private validateParameters(
    name: string,
    severity: number,
    duration: number,
    effects: WeatherEffect[],
    transitions: EventTransition[]
  ): void {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new TypeError('Name must be a non-empty string');
    }

    if (typeof severity !== 'number' || severity < 0 || severity > 100) {
      throw new RangeError('Severity must be a number between 0 and 100');
    }

    if (typeof duration !== 'number' || duration < 0) {
      throw new RangeError('Duration must be a non-negative number');
    }

    if (!Array.isArray(effects)) {
      throw new TypeError('Effects must be an array');
    }

    if (!Array.isArray(transitions)) {
      throw new TypeError('Transitions must be an array');
    }
  }

  /**
   * Helper method to calculate seasonal factors for probability calculations.
   */
  private getSeasonalFactor(season: WeatherConditions['season']): number {
    // Simple seasonal adjustments - would be more sophisticated in real implementation
    const seasonFactors = {
      spring: 1.2,
      summer: 0.8,
      autumn: 1.3,
      winter: 1.1
    };
    
    return seasonFactors[season] || 1.0;
  }

  /**
   * Helper method to calculate temperature factors for probability calculations.
   */
  private getTemperatureFactor(temperature: number): number {
    // Simplified temperature-based probability adjustment
    if (temperature < 0) return 1.2; // More likely in cold weather
    if (temperature > 30) return 0.7; // Less likely in very hot weather
    return 1.0;
  }
}

export default EventCategory;