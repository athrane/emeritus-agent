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
        return new Location("NULL Location", 0, 0);
    }

}
