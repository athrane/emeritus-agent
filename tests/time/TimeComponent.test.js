import { TimeComponent } from '../../src/internal.js';
import { TimeOfDay } from '../../src/internal.js';

describe('TimeComponent', () => {
  describe('constructor', () => {
    test('should create an instance with default values', () => {
      const component = new TimeComponent();
      expect(component).toBeInstanceOf(TimeComponent);
      expect(component.getTotalTime()).toBe(0);
      expect(component.getDeltaTime()).toBe(0);
      expect(component.getDay()).toBe(1);
      expect(component.getTimeOfDay()).toBe(0);
      expect(component.getTimeScale()).toBe(60); // Default timeScale
    });

    test('should create an instance with specified values', () => {
      const timeScale = 120;
      const initialTimeOfDay = 540; // 9:00 AM
      const component = new TimeComponent(timeScale, initialTimeOfDay);

      expect(component.getTimeScale()).toBe(timeScale);
      expect(component.getTimeOfDay()).toBe(initialTimeOfDay);
    });

    test('should initialize other properties to their defaults when values are specified', () => {
      const component = new TimeComponent(100, 200);
      expect(component.getTotalTime()).toBe(0);
      expect(component.getDeltaTime()).toBe(0);
      expect(component.getDay()).toBe(1);
    });

    test('should throw a TypeError if timeScale is not a number', () => {
      expect(() => new TimeComponent('invalid', 0)).toThrow(TypeError);
      expect(() => new TimeComponent(null, 0)).toThrow(TypeError);
    });

    test('should throw a TypeError if initialTimeOfDay is not a number', () => {
      expect(() => new TimeComponent(60, 'invalid')).toThrow(TypeError);
      expect(() => new TimeComponent(60, null)).toThrow(TypeError);
      expect(() => new TimeComponent(60, {})).toThrow(TypeError);
    });
  });

  describe('Getters and Setters', () => {
    let component;

    beforeEach(() => {
      component = new TimeComponent();
    });

    test('should set and get delta time', () => {
      component.setDeltaTime(16.67);
      expect(component.getDeltaTime()).toBe(16.67);
    });

    test('setDeltaTime should throw a TypeError for non-number input', () => {
      expect(() => component.setDeltaTime('invalid')).toThrow(TypeError);
      expect(() => component.setDeltaTime(null)).toThrow(TypeError);
    });

    test('should set and get total time', () => {
      component.setTotalTime(12345.6);
      expect(component.getTotalTime()).toBe(12345.6);
    });

    test('setTotalTime should throw a TypeError for non-number input', () => {
      expect(() => component.setTotalTime('invalid')).toThrow(TypeError);
      expect(() => component.setTotalTime({})).toThrow(TypeError);
    });

    test('should get the correct time scale', () => {
      const customComponent = new TimeComponent(120);
      expect(customComponent.getTimeScale()).toBe(120);
    });

    test('should set and get time of day', () => {
      component.setTimeOfDay(720); // Noon
      expect(component.getTimeOfDay()).toBe(720);
    });

    test('setTimeOfDay should throw a TypeError for non-number input', () => {
      expect(() => component.setTimeOfDay('invalid')).toThrow(TypeError);
      expect(() => component.setTimeOfDay(undefined)).toThrow(TypeError);
    });

    test('should set and get day', () => {
      component.setDay(10);
      expect(component.getDay()).toBe(10);
    });

    test('setDay should throw a TypeError for non-number input', () => {
      expect(() => component.setDay('invalid')).toThrow(TypeError);
      expect(() => component.setDay(null)).toThrow(TypeError);
    });

    test('getters should return initial values correctly', () => {
      const customComponent = new TimeComponent(100, 300);
      expect(customComponent.getDeltaTime()).toBe(0);
      expect(customComponent.getTotalTime()).toBe(0);
      expect(customComponent.getTimeScale()).toBe(100);
      expect(customComponent.getTimeOfDay()).toBe(300);
      expect(customComponent.getDay()).toBe(1);
    });

    test('should get time of day as a TimeOfDay object', () => {
      // 9:30 AM = 9 * 60 + 30 = 570 minutes
      component.setTimeOfDay(570);
      const timeOfDayObj = component.getTimeOfDayAsObject();
      expect(timeOfDayObj).toBeInstanceOf(TimeOfDay);
      expect(timeOfDayObj.getHours()).toBe(9);
      expect(timeOfDayObj.getMinutes()).toBe(30);
    });

    test('getTimeOfDayAsObject should handle midnight correctly', () => {
      component.setTimeOfDay(0);
      const timeOfDayObj = component.getTimeOfDayAsObject();
      expect(timeOfDayObj.getHours()).toBe(0);
      expect(timeOfDayObj.getMinutes()).toBe(0);
    });
  });
});