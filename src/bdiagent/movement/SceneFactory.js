
import { Scene } from '../../internal.js';

/**
 * Factory class for creating scene configurations.
 */
export class SceneFactory {

    /**
     * Create a house with predefined rooms.
     *
     * @returns {Scene} The created scene.
     */  
    static createHouse() {

        // create room manager
        const scene = new Scene();

        // create and register rooms
        const bedroom = scene.createRoom("Bedroom",0,0,1,1);
        const kitchen = scene.createRoom("Kitchen",1,0,1,1);
        const livingRoom = scene.createRoom("Living Room",2,0,1,1);
        const hall = scene.createRoom("Hall",3,0,1,1);
        const garden = scene.createRoom("Garden",4,0,1,1);

        // create and register locations
        bedroom.createLocation("Bed", 0.5, 0.2); 
        bedroom.createLocation("Wardrobe", 0.25, 0.2);        
        kitchen.createLocation("Fridge", 0.25, 0.2); 
        kitchen.createLocation("Stove", 0.5, 0.2);
        livingRoom.createLocation("Table", 0.25, 0.2);
        livingRoom.createLocation("Sofa", 0.5, 0.2);
        hall.createLocation("Coat Hanger", 0.5, 0.2);
        hall.createLocation("Front Door", 1, 0.2);
        garden.createLocation("Flower Bed", 0.5, 0.2);
        garden.createLocation("Tree", 1, 0.2);

        // connect rooms
        bedroom.addAdjacentRoom(livingRoom.getName());
        livingRoom.addAdjacentRoom(bedroom.getName());
        livingRoom.addAdjacentRoom(kitchen.getName());
        kitchen.addAdjacentRoom(livingRoom.getName());
        kitchen.addAdjacentRoom(hall.getName());
        hall.addAdjacentRoom(kitchen.getName());
        hall.addAdjacentRoom(garden.getName());
        garden.addAdjacentRoom(hall.getName());
        return scene;
    }        

    createCatLocations() {
    }

}