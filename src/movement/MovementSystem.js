import { System, TypeUtils } from '../internal.js';
import { PositionComponent, VelocityComponent } from '../internal.js';
import { Position } from '../internal.js';

/**
 * A system that handles physics-based movement for entities.
 * It operates on entities that have both a PositionComponent and a VelocityComponent.
 */
export class MovementSystem extends System {
  /**
   * Updates the position of entities based on their velocity.
   * @param {Entities} entitiesManager - The manager for all entities.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(entitiesManager, deltaTime) {
    TypeUtils.ensureInstanceOf(entitiesManager, Entities);
    TypeUtils.ensureNumber(deltaTime);

    const entities = entitiesManager.filterByComponents(
      PositionComponent,
      VelocityComponent
    );

    for (const entity of entities) {
      const positionComponent = entity.getComponent(PositionComponent);
      const velocityComponent = entity.getComponent(VelocityComponent);

      const currentPosition = positionComponent.getPosition();
      const { vx, vy } = velocityComponent.getVelocity();

      const newX = currentPosition.getX() + vx * deltaTime;
      const newY = currentPosition.getY() + vy * deltaTime;

      positionComponent.setPosition(new Position(newX, newY));
    }
  }
}