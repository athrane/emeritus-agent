import { Agent } from "../../src/internal.js";
import { Belief } from "../../src/internal.js";
import { IntentionManager } from "../../src/internal.js";
import { Location } from "../../src/internal.js";
import { Scene } from "../../src/internal.js";
import { Position } from "../../src/internal.js";
import { SceneFactory } from "../../src/internal.js";
import { AgentFactory } from "../../src/internal.js";
import { WalkMotion } from "../../src/internal.js";

describe('Agent', () => {

    describe('create', () => {
        let scene;
        let initialLocation;
        let initialPosition
        let initialRoom;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            initialRoom = scene.createRoom("Room1", 0, 0, 10, 10);
            initialPosition = Position.create(0, 0);
            initialLocation = Location.create("L1", initialPosition, initialRoom);
            const walkMotion = new WalkMotion(initialLocation, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });

        it('should create be able to create agent', () => {
            expect(agent).toBeDefined();
            expect(agent.getName()).toBe('TestAgent');
            expect(agent.motion).toBeDefined();
            expect(agent.motion.getPosition()).toBeDefined();
            expect(agent.motion.getPosition()).toBeInstanceOf(Position);
            expect(agent.motion.getPosition().getX()).toBe(initialPosition.getX());
            expect(agent.motion.getPosition().getY()).toBe(initialPosition.getY());
            expect(agent.motion.speed).toBe(5);
            expect(agent.getCurrentIntention()).toEqual(IntentionManager.NULL_INTENTION);
            expect(agent.beliefManager).toBeDefined();
            expect(agent.desireManager).toBeDefined();
        });

        it('should added belief be registered at belief manager', () => {
            const belief = new Belief('testBelief', 50);
            agent.addBelief(belief);
            expect(agent.beliefManager.beliefs.length).toBe(1);
        });

        it('should able to get belief from belief manager', () => {
            const belief = new Belief('testBelief', 50);
            agent.addBelief(belief);
            expect(agent.beliefManager.beliefs.length).toBe(1);
            expect(agent.beliefManager.getBelief('testBelief')).toEqual(belief);
        });

        it('should able to get belief from agent', () => {
            const belief = new Belief('testBelief', 50);
            agent.addBelief(belief);
            expect(agent.beliefManager.beliefs.length).toBe(1);
            expect(agent.getBelief('testBelief')).toEqual(belief);
        });
    });

    describe('run ', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            const room = scene.createRoom("Room1", 0, 0, 10, 10);
            const position = Position.create(0, 0);
            const location = Location.create("L1", position, room);
            const walkMotion = new WalkMotion(location, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });
        
        it('should create be able to run agent one turn', () => {
            agent.run();
        });    
    });

    describe('run old man agent with house scene', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = SceneFactory.createHouse();
            agent = AgentFactory.createOldManAgent(scene);
        });

        it('should create be able to run agent one turn', () => {
            agent.run();
        });

        it('should create be able to run agent two turns', () => {
            agent.run();
            agent.run();
        });

    });

    describe('getDesireManager', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            const room = scene.createRoom("Room1", 0, 0, 10, 10);
            const position = Position.create(0, 0);
            const location = Location.create("L1", position, room);
            const walkMotion = new WalkMotion(location, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });
        
        it('should create be able to get desire manager', () => {
            expect(agent.desireManager).toBeDefined();
            expect(agent.desireManager.getDesires()).toEqual([]);
        });
    });

    describe('getName', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            const room = scene.createRoom("Room1", 0, 0, 10, 10);
            const position = Position.create(0, 0);
            const location = Location.create("L1", position, room);
            const walkMotion = new WalkMotion(location, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });

        it('should return the name of the agent', () => {
            expect(agent.getName()).toBe('TestAgent');
        });
    });

    describe('getScene', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            const room = scene.createRoom("Room1", 0, 0, 10, 10);
            const position = Position.create(0, 0);
            const location = Location.create("L1", position, room);
            const walkMotion = new WalkMotion(location, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });

        it('should return the scene associated with the agent', () => {
            expect(agent.getScene()).toBe(scene);
        });
    });

    describe('getBeliefManager', () => {
        let scene;
        let agent;

        beforeEach(() => {
            scene = new Scene();
            const room = scene.createRoom("Room1", 0, 0, 10, 10);
            const position = Position.create(0, 0);
            const location = Location.create("L1", position, room);
            const walkMotion = new WalkMotion(location, 5, scene);
            agent = new Agent('TestAgent', walkMotion, scene);
        });

        it('should return the belief manager associated with the agent', () => {
            expect(agent.getBeliefManager()).toBe(agent.beliefManager);
        });
    });

});