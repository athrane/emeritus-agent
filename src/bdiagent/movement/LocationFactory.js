import { Location } from '../../internal.js';
import { Position } from '../../internal.js';

/**
 * Factory class for creating Location instances.
 */
export class LocationFactory {

    /**
     * Creates a bedroom location.
     * 
     * @returns {Location} A Location instance representing a bedroom.
     */
    static createBedroom() {
        const position = Position.create(-1.5, -0.5);
        return Location.create("Bedroom", position);
    }

    /**
     * Creates a location for the kitchen.
     * 
     * @returns {Location} A Location instance representing the kitchen.
     */
    static createKitchen() {
        const position = Position.create(0.5, -0.5);
        return Location.create("Kitchen", position);
    }

    /**
     * Creates a location for the living room.
     * 
     * @returns {Location} A Location instance representing the living room.
     */
    static createLivingRoom() {
        const position = Position.create(-0.5, -0.5);
        return Location.create("Living Room", position);
    }

    /**
     * Creates a location for the hall.
     * 
     * @returns {Location} A Location instance representing the hall.
     */
    static createHall() {
        const position = Position.create(1.25, -0.5);
        return Location.create("Hall", position);
    }

    /**
     * Creates a location for the garden.
     * 
     * @returns {Location} A Location instance representing the garden.
     */
    static createGarden() {
        const position = Position.create(1.9, -0.5);
        return Location.create("Garden", position);
    }

}
