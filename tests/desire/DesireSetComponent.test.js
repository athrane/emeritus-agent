import { DesireSetComponent, Desire2, Component } from '../../src/internal.js';

describe('DesireSetComponent', () => {
    let desire1;
    let desire2;
    let desire3;

    beforeEach(() => {
        desire1 = new Desire2(
            'desire1',
            () => true,
            () => 10
        );
        desire2 = new Desire2(
            'desire2',
            () => false,
            () => 20
        );
        desire3 = new Desire2(
            'desire3',
            () => true,
            () => 30
        );
    });

    it('should be an instance of Component', () => {
        const desireSet = new DesireSetComponent();
        expect(desireSet).toBeInstanceOf(DesireSetComponent);
        expect(desireSet).toBeInstanceOf(Component);
    });

    describe('constructor', () => {
        it('should initialize with no desires', () => {
            const desireSet = new DesireSetComponent();
            expect(desireSet.getAllDesires()).toEqual([]);
        });

        it('should initialize with a list of desires', () => {
            const desireSet = new DesireSetComponent(desire1, desire2);
            expect(desireSet.getAllDesires()).toHaveLength(2);
            expect(desireSet.hasDesire('desire1')).toBe(true);
            expect(desireSet.hasDesire('desire2')).toBe(true);
        });

        it('should throw an error if initialized with duplicate desire names', () => {
            const duplicateDesire = new Desire2('desire1', () => false, () => 5);
            expect(() => new DesireSetComponent(desire1, duplicateDesire)).toThrow(
                'Desire with name "desire1" already exists in the set.'
            );
        });

        it('should throw a TypeError if initialized with non-Desire2 objects', () => {
            expect(() => new DesireSetComponent({})).toThrow('Argument must be an instance of Desire2.');
            expect(() => new DesireSetComponent(desire1, 'not a desire')).toThrow('Argument must be an instance of Desire2.');
        });
    });

    describe('addDesire', () => {
        let desireSet;
        beforeEach(() => {
            desireSet = new DesireSetComponent();
        });

        it('should add a Desire2 instance', () => {
            desireSet.addDesire(desire1);
            expect(desireSet.hasDesire('desire1')).toBe(true);
            expect(desireSet.getAllDesires()).toHaveLength(1);
            expect(desireSet.getAllDesires()).toContain(desire1);
        });

        it('should throw an error if adding a desire with the same name', () => {
            desireSet.addDesire(desire1);
            const duplicateDesire = new Desire2('desire1', () => true, () => 5);
            expect(() => desireSet.addDesire(duplicateDesire)).toThrow(
                'Desire with name "desire1" already exists in the set.'
            );
        });

        it('should throw a TypeError if adding a non-Desire2 object', () => {
            expect(() => desireSet.addDesire({})).toThrow('Argument must be an instance of Desire2.');
            expect(() => desireSet.addDesire('not a desire')).toThrow('Argument must be an instance of Desire2.');
            expect(() => desireSet.addDesire(null)).toThrow('Argument must be an instance of Desire2.');
            expect(() => desireSet.addDesire(undefined)).toThrow('Argument must be an instance of Desire2.');
        });
    });

    describe('getDesire', () => {
        let desireSet;
        beforeEach(() => {
            desireSet = new DesireSetComponent(desire1, desire2);
        });

        it('should retrieve a desire by its name', () => {
            expect(desireSet.getDesire('desire1')).toBe(desire1);
            expect(desireSet.getDesire('desire2')).toBe(desire2);
        });

        it('should return undefined for a non-existent desire', () => {
            expect(desireSet.getDesire('non_existent_desire')).toBeUndefined();
        });

        it('should throw a TypeError if name is not a string', () => {
            expect(() => desireSet.getDesire(123)).toThrow(TypeError);
        });
    });

    describe('hasDesire', () => {
        let desireSet;
        beforeEach(() => {
            desireSet = new DesireSetComponent(desire1);
        });

        it('should return true if the desire exists', () => {
            expect(desireSet.hasDesire('desire1')).toBe(true);
        });

        it('should return false if the desire does not exist', () => {
            expect(desireSet.hasDesire('non_existent_desire')).toBe(false);
        });

        it('should be case-sensitive', () => {
            expect(desireSet.hasDesire('Desire1')).toBe(false);
        });

        it('should throw a TypeError if name is not a string', () => {
            expect(() => desireSet.hasDesire(123)).toThrow(TypeError);
        });
    });

    describe('getAllDesires', () => {
        it('should return an array of all desires', () => {
            const desireSet = new DesireSetComponent(desire1, desire2, desire3);
            const allDesires = desireSet.getAllDesires();
            expect(allDesires).toBeInstanceOf(Array);
            expect(allDesires).toHaveLength(3);
            expect(allDesires).toContain(desire1);
            expect(allDesires).toContain(desire2);
            expect(allDesires).toContain(desire3);
        });

        it('should return an empty array if no desires are present', () => {
            const desireSet = new DesireSetComponent();
            expect(desireSet.getAllDesires()).toEqual([]);
        });
    });
});

