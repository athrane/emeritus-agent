import {
  Entities,
  FatigueBeliefComponent,
  BoredomBeliefComponent,
  DentalHygieneBeliefComponent,
  BodyHygieneBeliefComponent,
  HandHygieneBeliefComponent,
  UrinationBeliefComponent,
  HungerBeliefComponent,
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
      let logString = `- ${name}: Position(${pos.getX()}, ${pos.getY()})`;

      const beliefStrings = [];
      const hungerBelief = entity.getComponent(HungerBeliefComponent);
      if (hungerBelief) {
        beliefStrings.push(`${hungerBelief.getName()}: ${hungerBelief.getValue().toFixed(0)}`);
      }

      const fatigueBelief = entity.getComponent(FatigueBeliefComponent);
      if (fatigueBelief) {
        beliefStrings.push(`${fatigueBelief.getName()}: ${fatigueBelief.getValue().toFixed(0)}`);
      }

      const boredomBelief = entity.getComponent(BoredomBeliefComponent);
      if (boredomBelief) {
        beliefStrings.push(`${boredomBelief.getName()}: ${boredomBelief.getValue().toFixed(0)}`);
      }

      const dentalHygieneBelief = entity.getComponent(DentalHygieneBeliefComponent);
      if (dentalHygieneBelief) {
        beliefStrings.push(`${dentalHygieneBelief.getName()}: ${dentalHygieneBelief.getValue().toFixed(0)}`);
      }

      const bodyHygieneBelief = entity.getComponent(BodyHygieneBeliefComponent);
      if (bodyHygieneBelief) {
        beliefStrings.push(`${bodyHygieneBelief.getName()}: ${bodyHygieneBelief.getValue().toFixed(0)}`);
      }

      const handHygieneBelief = entity.getComponent(HandHygieneBeliefComponent);
      if (handHygieneBelief) {
        beliefStrings.push(`${handHygieneBelief.getName()}: ${handHygieneBelief.getValue().toFixed(0)}`);
      }

      const urinationBelief = entity.getComponent(UrinationBeliefComponent);
      if (urinationBelief) {
        beliefStrings.push(`${urinationBelief.getName()}: ${urinationBelief.getValue().toFixed(0)}`);
      }

      if (beliefStrings.length > 0) {
        logString += ` | Beliefs(${beliefStrings.join(', ')})`;
      }

      console.log(logString);
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