import { Agent } from "../../src/internal.js";
import { Belief } from "../../src/internal.js";
import { IntentionManager } from "../../src/internal.js";
import { Location } from "../../src/internal.js";
import { Scene } from "../../src/internal.js";
import { Position } from "../../src/internal.js";

describe('Agent', () => {
    let scene;   
    let initialLocation;
    let initialPosition
    let agent;

    beforeEach(() => {
        scene = new Scene();
        initialPosition = Position.create(0, 0);
        initialLocation = Location.create("L1", initialPosition);
        agent = new Agent('TestAgent', initialLocation, 5, scene);
    });

    describe('run', () => {
        it('should create be able to create agent', () => {
            expect(agent).toBeDefined();
            expect(agent.name).toBe('TestAgent');
            expect(agent.movement).toBeDefined();
            expect(agent.movement.getLocation()).toBeDefined();
            expect(agent.movement.getPosition()).toBeDefined();
            expect(agent.movement.getPosition()).toBeInstanceOf(Position);
            expect(agent.movement.getPosition().getX()).toBe(initialPosition.getX());
            expect(agent.movement.getPosition().getY()).toBe(initialPosition.getY());
            expect(agent.movement.speed).toBe(5);
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
});