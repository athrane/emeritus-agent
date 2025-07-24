import { SceneComponent } from '../../src/internal.js';
import { Scene } from '../../src/internal.js';

describe('SceneComponent', () => {
  let scene;
  let component;

  beforeEach(() => {
    scene = new Scene();
    component = new SceneComponent(scene);
  });

  describe('constructor', () => {
    test('should create an instance and store the scene', () => {
      expect(component).toBeInstanceOf(SceneComponent);
      expect(component.getScene()).toBe(scene);
    });

    test('should throw a TypeError if scene is not provided', () => {
      expect(() => new SceneComponent()).toThrow(TypeError);
    });

    test('should throw a TypeError if the provided scene is not a Scene instance', () => {
      expect(() => new SceneComponent({})).toThrow(TypeError);
      expect(() => new SceneComponent('not a scene')).toThrow(TypeError);
    });
  });

  describe('getScene', () => {
    test('should return the scene instance provided in the constructor', () => {
      const newScene = new Scene();
      const newComponent = new SceneComponent(newScene);
      expect(newComponent.getScene()).toBe(newScene);
    });
  });
});