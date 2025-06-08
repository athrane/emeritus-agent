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
        const garden = scene.createRoom("Garden",4,0,1,1);
        const livingRoom = scene.createRoom("Living Room",2,0,1,1);
        bedroom.createLocation("Bed", 0.5, 1); 
        kitchen.createLocation("Fridge", 0.25, 1); 
        garden.createLocation("Flower Bed", 0.5, 1);
        livingRoom.createLocation("Sofa", 0.5, 1);

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
        expect(oldMan.desireManager.desires.length).toBe(5);
        expect(oldMan.desireManager.desires[0].constructor.name).toBe(DesireFactory.createSleepDesire().constructor.name);
        expect(oldMan.desireManager.desires[1].constructor.name).toBe(DesireFactory.createEatDesire().constructor.name);
        expect(oldMan.desireManager.desires[2].constructor.name).toBe(DesireFactory.createEntertainDesire().constructor.name);
        expect(oldMan.desireManager.desires[3].constructor.name).toBe(DesireFactory.createSitIdleDesire().constructor.name);
        expect(oldMan.desireManager.desires[4].constructor.name).toBe(DesireFactory.createNullDesire().constructor.name);
    });

    it('should create an old man agent with correct intentions', () => {
        const oldMan = AgentFactory.createOldManAgent(scene);

        expect(oldMan).toBeDefined();

        // Check intentions
        expect(oldMan.intentionManager.intentions.length).toBe(4);
        expect(oldMan.intentionManager.intentions[0].constructor.name).toBe(IntentionFactory.createSleepIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[1].constructor.name).toBe(IntentionFactory.createEatIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[2].constructor.name).toBe(IntentionFactory.createEntertainIntention(scene).constructor.name);
        expect(oldMan.intentionManager.intentions[3].constructor.name).toBe(IntentionFactory.createSitIdleIntention(scene).constructor.name);
    });
});