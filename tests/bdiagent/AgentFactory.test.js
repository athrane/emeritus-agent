import { AgentFactory } from "../../src/internal.js";
import { IntegerPercentageBelief } from "../../src/internal.js";
import { DesireFactory } from "../../src/internal.js";
import { IntentionFactory } from "../../src/internal.js";
import { Scene } from "../../src/internal.js";

describe('AgentFactory', () => {
    let scene;

    beforeEach(() => {
        scene = new Scene(); 
        const bedroom = scene.createRoom("Bedroom",0,0,1,1);
        const kitchen = scene.createRoom("Kitchen",1,0,1,1);
        const livingRoom = scene.createRoom("Living Room",2,0,1,1);
        const hall = scene.createRoom("Hall",3,0,1,1);
        const garden = scene.createRoom("Garden",4,0,1,1);
        const upperHall = scene.createRoom("Upper Hall",2.5,1,1,1);
        const bathroom = scene.createRoom("Bathroom",1.5,1,1,1);
        const study = scene.createRoom("Study",0.5,1,1,1);

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

    });

    it('should create null agent', () => {
        const agent = AgentFactory.createNullAgent(scene);

        expect(agent).toBeDefined();
        expect(agent.name).toBe("NULL Agent");
    });

    it('should create agent with correct beliefs', () => {
        const oldMan = AgentFactory.createOldManAgent(scene);

        expect(oldMan).toBeDefined();
        expect(oldMan.name).toBe("Acticus");

        expect(oldMan.getBelief("Hunger")).toBeDefined();
        expect(oldMan.getBelief("Fatigue")).toBeDefined();
        expect(oldMan.getBelief("Boredom")).toBeDefined();

        expect(oldMan.getBelief("Hunger")).toBeInstanceOf(IntegerPercentageBelief);
        expect(oldMan.getBelief("Fatigue")).toBeInstanceOf(IntegerPercentageBelief);
        expect(oldMan.getBelief("Boredom")).toBeInstanceOf(IntegerPercentageBelief);

        expect(oldMan.getBelief("Hunger").getValue()).toBe(0);
        expect(oldMan.getBelief("Fatigue").getValue()).toBe(0);
        expect(oldMan.getBelief("Boredom").getValue()).toBe(50);        
    });

    it('should create an old man agent with correct desires', () => {
        const oldMan = AgentFactory.createOldManAgent(scene);

        expect(oldMan).toBeDefined();

        // Check desires
        expect(oldMan.desireManager.desires.length).toBe(9);
        expect(oldMan.desireManager.desires[0].constructor.name).toBe(DesireFactory.createSleepDesire().constructor.name);
        expect(oldMan.desireManager.desires[1].constructor.name).toBe(DesireFactory.createEatDesire().constructor.name);
        expect(oldMan.desireManager.desires[2].constructor.name).toBe(DesireFactory.createEntertainDesire().constructor.name);
        expect(oldMan.desireManager.desires[3].constructor.name).toBe(DesireFactory.createSitIdleDesire().constructor.name);
        expect(oldMan.desireManager.desires[4].constructor.name).toBe(DesireFactory.createNullDesire().constructor.name);
        expect(oldMan.desireManager.desires[5].constructor.name).toBe(DesireFactory.createDentalHygieneDesire().constructor.name);
        expect(oldMan.desireManager.desires[6].constructor.name).toBe(DesireFactory.createBodyHygieneDesire().constructor.name);
        expect(oldMan.desireManager.desires[7].constructor.name).toBe(DesireFactory.createHandHygieneDesire().constructor.name);
        expect(oldMan.desireManager.desires[8].constructor.name).toBe(DesireFactory.createVesicularDistentionDesire().constructor.name);
    });

    it('should create an old man agent with correct intentions', () => {
        const oldMan = AgentFactory.createOldManAgent(scene);

        expect(oldMan).toBeDefined();

        // Check intentions
        expect(oldMan.intentionManager.intentions.length).toBe(8);
        expect(oldMan.intentionManager.intentions[0].constructor.name).toBe(IntentionFactory.createSleepIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[1].constructor.name).toBe(IntentionFactory.createEatIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[2].constructor.name).toBe(IntentionFactory.createEntertainIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[3].constructor.name).toBe(IntentionFactory.createSitIdleIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[4].constructor.name).toBe(IntentionFactory.createDentalHygieneIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[5].constructor.name).toBe(IntentionFactory.createBodyHygieneIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[6].constructor.name).toBe(IntentionFactory.createHandHygieneIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[7].constructor.name).toBe(IntentionFactory.createVesicularDistentionIntention(scene).constructor.name);
    });
});