
import { Scene } from '../../internal.js';

/**
 * Factory class for creating scene configurations.
 */
export class SceneFactory {

    /**
     * Create a house with predefined rooms.
     *
     * @returns {Scene} The created agent.
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

        // connect rooms
        bedroom.addAdjacentRoom(livingRoom.getName());
        livingRoom.addAdjacentRoom(bedroom.getName());
        livingRoom.addAdjacentRoom(kitchen.getName());
        kitchen.addAdjacentRoom(livingRoom.getName());
        kitchen.addAdjacentRoom(hall.getName());
        hall.addAdjacentRoom(kitchen.getName());
        hall.addAdjacentRoom(garden.getName());

        return scene
    }        

    createOldManLocations() {
        //this.createLocation("Bedroom", -1.5, -0.5, bedroom.name);
        //this.createLocation("Kitchen", 0.5, -0.5, kitchen.name);
        //this.createLocation("Living Room", -0.5, -0.5, livingRoom.name);
        //this.createLocation("Hall", 1.25, -0.5, hall.name);
        //this.createLocation("Garden", 1.9, -0.5, garden.name);
    }

    createCatLocations() {
        //this.createLocation("Bedroom", -1.5, -0.5, bedroom.name);
        //this.createLocation("Kitchen", 0.5, -0.5, kitchen.name);
        //this.createLocation("Living Room", -0.5, -0.5, livingRoom.name);
        //this.createLocation("Hall", 1.25, -0.5, hall.name);
        //this.createLocation("Garden", 1.9, -0.5, garden.name);
    }

}