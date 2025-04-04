import { Location } from '../../internal.js';

/**
 * Factory class for creating Location instances.
 */
export class LocationFactory {

    /**
     * Creates a new location with the specified parameters.
     * 
     * @param {string} name The name of the location.
     * @param {number} x The x-coordinate of the location.
     * @param {number} y The y-coordinate of the location.
     * @returns {Location} A new Location instance.
     */
    static createLocation(name, x, y) {
        return new Location(name, x, y);
    }

    /**
     * Creates a null location at coordinates (0,0).
     * 
     * @returns {Location} A Location instance representing a null location.
     */
    static createNullLocation() {
        return new Location("NULL Location (0,0)", 0, 0);
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
