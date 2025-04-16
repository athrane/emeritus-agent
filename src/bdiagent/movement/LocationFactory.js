import { Location } from '../../internal.js';
import { Position } from '../../internal.js';

/**
 * Factory class for creating Location instances.
 */
export class LocationFactory {

    /**
     * Creates a null location at coordinates (0,0).
     * 
     * @returns {Location} A Location instance representing a null location.
     */
    static createNullLocation() {
        const position = Position.create(0, 0);
        return Location.create("NULL Location (0,0)", position);
    }

    /**
     * Creates a bedroom location.
     * 
     * @returns {Location} A Location instance representing a bedroom.
     */
    static createBedroom() {
        return new Location("Bedroom", -1.5, -0.5);
    }

    /**
     * Creates a location for the kitchen.
     * 
     * @returns {Location} A Location instance representing the kitchen.
     */
    static createKitchen() {
        return new Location("Kitchen", 0.5, -0.5);
    }

    /**
     * Creates a location for the living room.
     * 
     * @returns {Location} A Location instance representing the living room.
     */
    static createLivingRoom() {
        return new Location("Living Room", -0.5, -0.5); 
    }

    /**
     * Creates a location for the hall.
     * 
     * @returns {Location} A Location instance representing the hall.
     */
    static createHall() {
        return new Location("Hall", 1.25, -0.5);
    }

    /**
     * Creates a location for the garden.
     * 
     * @returns {Location} A Location instance representing the garden.
     */
    static createGarden() {
        return new Location("Garden", 1.90, -0.5);
    }

}
