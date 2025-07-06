
import { Scene } from '../../internal.js';

/**
 * Factory class for creating scene configurations.
 */
export class SceneFactory {

    /**
     * Register two rooms as adjacent to each other.
     * @param {room1} room1 The first room.
     * @param {room2} room2 The second room.
     */
    static registerAdjacentRooms(room1, room2) {
        room1.addAdjacentRoom(room2.getName());
        room2.addAdjacentRoom(room1.getName());
    }

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
        const upperHall = scene.createRoom("Upper Hall",2.5,1,1,1);
        const bathroom = scene.createRoom("Bathroom",1.5,1,1,1);
        const study = scene.createRoom("Study",0.5,1,1,1);
        const celestialSphere = scene.createRoom("Celestial Sphere", 0, 0, 5, 5);

        // connect rooms
        SceneFactory.registerAdjacentRooms(bedroom, kitchen);
        SceneFactory.registerAdjacentRooms(kitchen, livingRoom);
        SceneFactory.registerAdjacentRooms(livingRoom, hall);
        SceneFactory.registerAdjacentRooms(hall, garden);
        SceneFactory.registerAdjacentRooms(hall, upperHall);
        SceneFactory.registerAdjacentRooms(upperHall, bathroom);
        SceneFactory.registerAdjacentRooms(bathroom, study);
        
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
        bathroom.createLocation("Bathroom Sink", 0.5, 0.2);
        bathroom.createLocation("Toilet", 0.25, 0.2);
        bathroom.createLocation("Shower", 0.75, 0.2);
        study.createLocation("Desk", 0.5, 0.2);
        study.createLocation("Chair", 0.25, 0.2);
        study.createLocation("Bookshelf", 0.75, 0.2);
        celestialSphere.createLocation("Celestial Center", 2.5, 2.5);

        return scene;
    }        

    createCatLocations() {
    }

}