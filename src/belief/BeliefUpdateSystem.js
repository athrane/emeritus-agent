import { System } from '../internal.js';
import { Entities } from '../internal.js';
import { TypeUtils } from '../internal.js';
import { HungerBeliefComponent } from '../internal.js';
import { HungerUpdateComponent } from '../internal.js';
import { FatigueBeliefComponent, FatigueUpdateComponent } from '../internal.js';
import { BoredomBeliefComponent, BoredomUpdateComponent } from '../internal.js';
import { DentalHygieneBeliefComponent, DentalHygieneUpdateComponent } from '../internal.js';
import { BodyHygieneBeliefComponent, BodyHygieneUpdateComponent } from '../internal.js';
import { HandHygieneBeliefComponent, HandHygieneUpdateComponent } from '../internal.js';
import { UrinationBeliefComponent, UrinationUpdateComponent } from '../internal.js';

/**
 * A system responsible for updating belief components based on their
 * corresponding update components and elapsed time.
 */
export class BeliefUpdateSystem extends System {
    /**
     * A private configuration array that maps BeliefComponent classes to their
     * corresponding BeliefUpdateComponent classes. This allows for a generic
     * update loop.
     * @private
     * @type {Array<[typeof import('../internal.js').BeliefComponent, typeof import('../internal.js').BeliefUpdateComponent]>}
     */
    #beliefConfigurations = [
        [HungerBeliefComponent, HungerUpdateComponent],
        [FatigueBeliefComponent, FatigueUpdateComponent],
        [BoredomBeliefComponent, BoredomUpdateComponent],
        [DentalHygieneBeliefComponent, DentalHygieneUpdateComponent],
        [BodyHygieneBeliefComponent, BodyHygieneUpdateComponent],
        [HandHygieneBeliefComponent, HandHygieneUpdateComponent],
        [UrinationBeliefComponent, UrinationUpdateComponent],
    ];
    /**
     * Clamps a number between a minimum and maximum value.
     * @param {number} value The number to clamp.
     * @param {number} min The minimum value.
     * @param {number} max The maximum value.
     * @returns {number} The clamped value.
     */
    static clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    /**
     * Updates belief components for all relevant entities.
     * @param {Entities} entitiesManager - The manager for all entities.
     * @param {number} deltaTime - The time elapsed since the last update, in seconds.
     */
    update(entitiesManager, deltaTime) {
        TypeUtils.ensureInstanceOf(entitiesManager, Entities);
        TypeUtils.ensureNumber(deltaTime);

        for (const [BeliefComponentClass, UpdateComponentClass] of this.#beliefConfigurations) {
            const entities = entitiesManager.filterByComponents(BeliefComponentClass, UpdateComponentClass);

            for (const entity of entities) {
                const beliefComponent = entity.getComponent(BeliefComponentClass);
                const updateComponent = entity.getComponent(UpdateComponentClass);

                const currentValue = beliefComponent.getValue();
                const rate = updateComponent.getValue();

                // Update the belief value based on the rate and elapsed time
                const newValue = currentValue + (rate * deltaTime);

                // Clamp the value between 0 and 100 and update the component
                const clampedValue = BeliefUpdateSystem.clamp(newValue, 0, 100);
                beliefComponent.setValue(clampedValue);
            }
        }
    }
}