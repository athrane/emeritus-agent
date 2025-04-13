import { AgentFactory } from "../../src/internal.js";
import { IntegerPercentageBelief } from "../../src/internal.js";
import { DesireFactory } from "../../src/internal.js";
import { IntentionFactory } from "../../src/internal.js";
import { RoomManager } from "../../src/internal.js";

describe('AgentFactory', () => {
    let roomManager;

    beforeEach(() => {
        roomManager = new RoomManager(); 
    });

    it('should create null agent', () => {
        const agent = AgentFactory.createNullAgent(roomManager);

        expect(agent).toBeDefined();
        expect(agent.name).toBe("NULL Agent");
    });

    it('should create agent with correct beliefs', () => {
        const oldMan = AgentFactory.createOldManAgent(roomManager);

        expect(oldMan).toBeDefined();
        expect(oldMan.name).toBe("Acticus");

        expect(oldMan.getBelief("hunger")).toBeDefined();
        expect(oldMan.getBelief("fatigue")).toBeDefined();
        expect(oldMan.getBelief("boredom")).toBeDefined();

        expect(oldMan.getBelief("hunger")).toBeInstanceOf(IntegerPercentageBelief);
        expect(oldMan.getBelief("fatigue")).toBeInstanceOf(IntegerPercentageBelief);
        expect(oldMan.getBelief("boredom")).toBeInstanceOf(IntegerPercentageBelief);

        expect(oldMan.getBelief("hunger").getValue()).toBe(0);
        expect(oldMan.getBelief("fatigue").getValue()).toBe(0);
        expect(oldMan.getBelief("boredom").getValue()).toBe(50);        
    });

    it('should create an old man agent with correct desires', () => {
        const oldMan = AgentFactory.createOldManAgent(roomManager);

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
        const oldMan = AgentFactory.createOldManAgent(roomManager);

        expect(oldMan).toBeDefined();

        // Check intentions
        expect(oldMan.intentionManager.intentions.length).toBe(4);
        expect(oldMan.intentionManager.intentions[0].constructor.name).toBe(IntentionFactory.createSleepIntention().constructor.name);
        expect(oldMan.intentionManager.intentions[1].constructor.name).toBe(IntentionFactory.createEatIntention().constructor.name);
        expect(oldMan.intentionManager.intentions[2].constructor.name).toBe(IntentionFactory.createEntertainIntention().constructor.name);
        expect(oldMan.intentionManager.intentions[3].constructor.name).toBe(IntentionFactory.createSitIdleIntention().constructor.name);
    });
});