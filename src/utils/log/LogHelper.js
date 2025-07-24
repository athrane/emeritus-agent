import {
  Entities,
  NameComponent,
  PositionComponent,
  SceneComponent,
  TimeComponent,
} from '../../internal.js';

/**
 * A helper class with static methods for logging simulation details to the console.
 */
export class LogHelper {
    
  /**
   * Logs the name and position of all entities that have them.
   * @param {Entities} entitiesManager
   */
  static logEntityDetails(entitiesManager) {
    const entities = entitiesManager.filterByComponents(
      NameComponent,
      PositionComponent
    );

    if (entities.length === 0) {
      console.log('No entities with Name and Position to log.');
      return;
    }

    entities.forEach((entity) => {
      const name = entity.getComponent(NameComponent).getName();
      const pos = entity.getComponent(PositionComponent).getPosition();
      console.log(`- ${name}: Position(${pos.getX()}, ${pos.getY()})`);
    });
  }

  /**
   * Logs details about the rooms in the scene.
   * @param {Entities} entitiesManager
   */
  static logSceneDetails(entitiesManager) {
    console.log('Scene Details:');

    const sceneEntity = entitiesManager.filterByComponents(SceneComponent)[0];
    if (!sceneEntity) {
      console.log('No SceneComponent found.');
      return;
    }

    const scene = sceneEntity.getComponent(SceneComponent).getScene();

    const rooms = scene.rooms;
    if (rooms.size === 0) {
      console.log('No rooms in the scene.');
      return;
    }

    console.log('Rooms:');
    rooms.forEach((room) => {
      const name = room.getName();
      const pos = room.getPosition();
      const size = room.getSize();
      console.log(`- ${name}: Position(${pos.getX()}, ${pos.getY()}), Size(${size.getX()}, ${size.getY()})`);
    });
  }

  /**
   * Logs the current simulation time.
   * @param {Entities} entitiesManager
   */
  static logTime(entitiesManager) {
    const timeEntity = entitiesManager.filterByComponents(TimeComponent)[0];
    if (!timeEntity) return;

    const timeComp = timeEntity.getComponent(TimeComponent);
    const timeOfDayObj = timeComp.getTimeOfDayAsObject();
    const hours = timeOfDayObj.getHours();
    const minutes = timeOfDayObj.getMinutes();
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    console.log(`Day ${timeComp.getDay()}, Time: ${timeString}`);
  }
}