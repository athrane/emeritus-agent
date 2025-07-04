import { TimeManager} from "../../src/internal.js";
import { TimeOfDay } from "../../src/internal.js";

describe('TimeManager', () => {
    test('initializes with default values', () => {
        const tm = new TimeManager(10);
        const tod = tm.getTimeOfDay();
        expect(tod).toBeInstanceOf(TimeOfDay);
        expect(tod.getHours()).toBe(0);
        expect(tod.getMinutes()).toBe(0);
        expect(tm.getDay()).toBe(1);
    });

    test('initializes with custom stepMinutes', () => {
        const tm = new TimeManager(30);
        expect(tm.stepMinutes).toBe(30);
    });

    test('advanceStep increments timeOfDayMinutes by stepMinutes', () => {
        const tm = new TimeManager(15);
        tm.advanceStep();
        const tod = tm.getTimeOfDay();
        expect(tod.getHours()).toBe(0);
        expect(tod.getMinutes()).toBe(15);
        expect(tm.getDay()).toBe(1);
    });

    test('advanceStep rolls over to next day when exceeding MINUTES_PER_DAY', () => {
        const tm = new TimeManager(60);
        tm.timeOfDayMinutes = TimeManager.MINUTES_PER_DAY - 30;
        tm.advanceStep();
        const tod = tm.getTimeOfDay();
        expect(tod.getHours()).toBe(0);
        expect(tod.getMinutes()).toBe(30);
        expect(tm.getDay()).toBe(2);
    });

    test('advanceStep handles multiple day rollovers', () => {
        const tm = new TimeManager(TimeManager.MINUTES_PER_DAY);
        tm.advanceStep();
        let tod = tm.getTimeOfDay();
        expect(tod.getHours()).toBe(0);
        expect(tod.getMinutes()).toBe(0);
        expect(tm.getDay()).toBe(2);
        tm.advanceStep();
        expect(tm.getDay()).toBe(3);
    });

    test('getTimeOfDay returns correct hours and minutes', () => {
        const tm = new TimeManager(10);
        tm.timeOfDayMinutes = 125;
        const tod = tm.getTimeOfDay();
        expect(tod.getHours()).toBe(2);
        expect(tod.getMinutes()).toBe(5);
    });

    test('getTimeOfDayString returns formatted time string', () => {
        const tm = new TimeManager(10);
        tm.timeOfDayMinutes = 65;
        expect(tm.getTimeOfDayString()).toBe('01:05');
        tm.timeOfDayMinutes = 0;
        expect(tm.getTimeOfDayString()).toBe('00:00');
        tm.timeOfDayMinutes = 1439;
        expect(tm.getTimeOfDayString()).toBe('23:59');
    });

    test('getDay returns the current day', () => {
        const tm = new TimeManager(10);
        expect(tm.getDay()).toBe(1);
        tm.day = 5;
        expect(tm.getDay()).toBe(5);
    });

    describe('getFractionOfDayPassed', () => {
        test('should return 0.0 at the beginning of the day', () => {
            const tm = new TimeManager(10);
            tm.timeOfDayMinutes = 0;
            expect(tm.getFractionOfDayPassed()).toBe(0.0);
        });

        test('should return 0.5 at midday', () => {
            const tm = new TimeManager(10);
            tm.timeOfDayMinutes = TimeManager.MINUTES_PER_DAY / 2; // 720 minutes
            expect(tm.getFractionOfDayPassed()).toBe(0.5);
        });

        test('should return a value close to 1.0 at the end of the day', () => {
            const tm = new TimeManager(10);
            tm.timeOfDayMinutes = TimeManager.MINUTES_PER_DAY - 1;
            expect(tm.getFractionOfDayPassed()).toBeCloseTo(1.0);
            expect(tm.getFractionOfDayPassed()).not.toBe(1.0);
        });

        test('should return 0.25 at 6 AM', () => {
            const tm = new TimeManager(10);
            tm.timeOfDayMinutes = 6 * 60; // 360 minutes
            expect(tm.getFractionOfDayPassed()).toBe(0.25);
        });
    });
});
