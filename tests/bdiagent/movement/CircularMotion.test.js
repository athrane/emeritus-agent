import { CircularMotion } from "../../../src/internal.js";
import { Location } from "../../../src/internal.js";
import { Position } from "../../../src/internal.js";
import { Scene } from "../../../src/internal.js";
import { Path } from "../../../src/internal.js";
import { TimeManager } from "../../../src/internal.js";

describe('CircularMotion', () => {
    let initialLocation;
    let initialPosition;
    let timeManager;
    let scene;
    let room;

  beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        room = scene.createRoom("Test Room", 0, 0, 100, 100);
        initialLocation = room.createLocation("Start", initialPosition.getX(), initialPosition.getY());
        timeManager = new TimeManager();
  });

  test('constructor calculates radius from room size', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.radius).toBe(50); // min(100,100)/2 = 50
  });

  test('getSpeed returns speed', () => {
    const motion = new CircularMotion(initialLocation, 2, timeManager);
    expect(motion.getSpeed()).toBe(2);
  });

  test('getPosition returns initial position', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.getPosition()).toBeInstanceOf(Position);
  });

  test('getDestination returns null location', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.getDestination()).toBeInstanceOf(Location);
  });

  test('getRoom returns current room', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.getRoom()).toBe(room);
  });

  test('isWithinRoom returns true', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.isWithinRoom()).toBe(true);
  });

  test('isMoving returns true', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.isMoving()).toBe(true);
  });

  test('isTargetPositionDefined returns false', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.isTargetPositionDefined()).toBe(false);
  });

  test('canReachTargetPosition returns false', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.canReachTargetPosition()).toBe(false);
  });

  test('getTargetPosition returns null', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.getTargetPosition()).toBeNull();
  });

  test('hasReachedFinalDestination returns false', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.hasReachedFinalDestination()).toBe(false);
  });

  test('getPath returns empty path', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.getPath()).toBeInstanceOf(Path);
    expect(motion.getPath().isEmpty()).toBe(true);
  });

  test('moveTo does not throw', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(() => motion.moveTo({})).not.toThrow();
  });

  test('isWithinReasonableRange always returns true', () => {
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    expect(motion.isWithinReasonableRange({})).toBe(true);
  });

  test('update changes position based on time, 90 degrees', () => {
    timeManager.getFractionOfDayPassed = jest.fn(() => 0.25); // 90 degrees
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    motion.update();
    // Should be at (center.x, center.y + radius)
    const x = motion.radius * Math.cos(Math.PI / 2); // 90 degrees
    const y = motion.radius * Math.sin(Math.PI / 2); // 90 degrees
    // Center is at (50, 50) based on initialLocation
    expect(Math.abs(motion.getPosition().getX() - (initialPosition.getX() + x))).toBeLessThan(1e-6);
    expect(Math.abs(motion.getPosition().getY() - (initialPosition.getY() + y))).toBeLessThan(1e-6);
  });

  test('update changes position based on time, 180 degrees', () => {
    timeManager.getFractionOfDayPassed = jest.fn(() => 0.5); // 180 degrees
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    motion.update();
    // Should be at (center.x - radius, center.y)
    const x = motion.radius * Math.cos(Math.PI); // 180 degrees
    const y = motion.radius * Math.sin(Math.PI); // 180 degrees
    // Center is at (50, 50) based on initialLocation
    expect(Math.abs(motion.getPosition().getX() - (initialPosition.getX() + x))).toBeLessThan(1e-6);
    expect(Math.abs(motion.getPosition().getY() - (initialPosition.getY() + y))).toBeLessThan(1e-6);
  });

  test('update changes position based on time, 270 degrees', () => {
    timeManager.getFractionOfDayPassed = jest.fn(() => 0.75); // 270 degrees
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    motion.update();
    // Should be at (center.x, center.y - radius)
    const x = motion.radius * Math.cos(3 * Math.PI / 2); // 270 degrees
    const y = motion.radius * Math.sin(3 * Math.PI / 2); // 270 degrees
    // Center is at (50, 50) based on initialLocation
    expect(Math.abs(motion.getPosition().getX() - (initialPosition.getX() + x))).toBeLessThan(1e-6);
    expect(Math.abs(motion.getPosition().getY() - (initialPosition.getY() + y))).toBeLessThan(1e-6);
  });

  test('update changes position based on time, 360 degrees', () => {
    timeManager.getFractionOfDayPassed = jest.fn(() => 1); // 360 degrees
    const motion = new CircularMotion(initialLocation, 1, timeManager);
    motion.update();
    // Should be at (center.x + radius, center.y)
    const x = motion.radius * Math.cos(0); // 360 degrees
    const y = motion.radius * Math.sin(0); // 360 degrees
    // Center is at (50, 50) based on initialLocation
    expect(Math.abs(motion.getPosition().getX() - (initialPosition.getX() + x))).toBeLessThan(1e-6);
    expect(Math.abs(motion.getPosition().getY() - (initialPosition.getY() + y))).toBeLessThan(1e-6);
  });



  });
