import { RoomManager } from '../../internal.js';

/**
 * Factory class for creating Room configurations.
 */
export class RoomFactory {

    /**
     * Create a house with predefined rooms.
     *
     * @returns {RoomManager} The created agent.
     */  
    static createHouse() {

        // create room manager
        const roomManager = new RoomManager();

        // create and register rooms
        const bedroom = roomManager.createRoom("Bedroom",0,0,1,1);
        const kitchen = roomManager.createRoom("Kitchen",1,0,1,1);
        const livingRoom = roomManager.createRoom("Living Room",2,0,1,1);
        const hall = roomManager.createRoom("Hall",3,0,1,1);
        const garden = roomManager.createRoom("Garden",4,0,1,1);

        // connect rooms
        bedroom.addAdjacentRoom(livingRoom.getName());
        livingRoom.addAdjacentRoom(bedroom.getName());
        livingRoom.addAdjacentRoom(kitchen.getName());
        kitchen.addAdjacentRoom(livingRoom.getName());
        kitchen.addAdjacentRoom(hall.getName());
        hall.addAdjacentRoom(kitchen.getName());
        hall.addAdjacentRoom(garden.getName());

        return roomManager
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