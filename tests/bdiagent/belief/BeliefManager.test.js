import { Belief } from "../../../src/internal.js";
import { BeliefUpdater } from "../../../src/internal.js";
import { BeliefManager } from "../../../src/internal.js";
import { Agent } from "../../../src/internal.js";
import { AgentFactory } from "../../../src/internal.js";

// filepath: /workspaces/emeritus-agent/tests/bdiagent/belief/BeliefManager.test.js

describe('BeliefManager', () => {
    let beliefManager;
    let agent;

    beforeEach(() => {
        agent = AgentFactory.createNullAgent();
        beliefManager = new BeliefManager();
    });

    it('should initialize beliefs and beliefUpdaters arrays', () => {
        expect(beliefManager.beliefs).toEqual([]);
        expect(beliefManager.beliefUpdaters).toEqual([]);
    });

    it('should add a belief', () => {
        const belief = new Belief("testBelief", 123);
        beliefManager.addBelief(belief);
        expect(beliefManager.beliefs).toContain(belief);
    });

    it('should get a belief by name', () => {
        const belief1 = new Belief("testBelief1", 1);
        const belief2 = new Belief("testBelief2", 2);
        beliefManager.addBelief(belief1);
        beliefManager.addBelief(belief2);
        expect(beliefManager.getBelief("testBelief2")).toBe(belief2);
    });

    it('should get a belief by name #2', () => {
        const belief1 = new Belief("fatigue", 1);
        beliefManager.addBelief(belief1);
        expect(beliefManager.getBelief("fatigue")).toBe(belief1);
    });

    it('should return undefined if belief is not found', () => {
        expect(beliefManager.getBelief("nonExistentBelief")).toBeUndefined();
    });

    it('should register a belief updater', () => {
        const beliefUpdater = new BeliefUpdater();
        beliefManager.registerBeliefUpdater(beliefUpdater);
        expect(beliefManager.beliefUpdaters).toContain(beliefUpdater);
    });

    it('should call update method of each registered BeliefUpdater', () => {
        const beliefUpdater1 = new BeliefUpdater();
        const beliefUpdater2 = new BeliefUpdater();
        const spy1 = jest.spyOn(beliefUpdater1, 'update');
        const spy2 = jest.spyOn(beliefUpdater2, 'update');

        beliefManager.registerBeliefUpdater(beliefUpdater1);
        beliefManager.registerBeliefUpdater(beliefUpdater2);

        beliefManager.update(agent);

        expect(spy1).toHaveBeenCalledWith(agent);
        expect(spy2).toHaveBeenCalledWith(agent);
    });

    it('should not throw an error if no belief updaters are registered', () => {
        expect(() => beliefManager.update(agent)).not.toThrow();
    });

    it('should handle multiple beliefs with the same name (returns the first one)', () => {
        const belief1 = new Belief("sameName", 16);
        const belief2 = new Belief("sameName", 12);
        beliefManager.addBelief(belief1);
        beliefManager.addBelief(belief2);
        expect(beliefManager.getBelief("sameName")).toBe(belief1);
    });

});