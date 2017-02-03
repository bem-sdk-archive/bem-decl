'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('sould support mods', t => {
    const decl = {
        block: 'block',
        mods: {
            m1: 'v1'
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should pass mods to elem', t => {
    const decl = {
        block: 'block',
        elem: 'elem',
        mods: {
            m1: 'v1'
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should support several mods', t => {
    const decl = {
        block: 'block',
        mods: {
            m1: 'v1',
            m2: 'v2'
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm2', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm2', val: 'v2' } }, tech: null }
    ]);
});

test('should support array of mod values in object', t => {
    const decl = {
        block: 'block',
        mods: {
            m1: ['v1', 'v2']
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v2' } }, tech: null }
    ]);
});

test('should support array of mod values', t => {
    const decl = {
        block: 'block',
        mods: ['m1', 'm2']
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm2', val: true } }, tech: null }
    ]);
});
