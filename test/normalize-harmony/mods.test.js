'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/harmony');

test('should support shortcut for bool mod', t => {
    const decl = { block: 'block', modName: 'mod' };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support bool mod', t => {
    const decl = { block: 'block', mod: { name: 'mod', val: true } };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support mod', t => {
    const decl = { block: 'block', mod: { name: 'mod', val: 'val' } };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});

test('should support mods as objects', t => {
    const decl = {
        block: 'block',
        mods: { mod: 'val' }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});

test('should support bool mods as array', t => {
    const decl = {
        block: 'block',
        mods: ['mod-1', 'mod-2']
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod-1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod-2', val: true } }, tech: null }
    ]);
});

test('should support mod values as array', t => {
    const decl = {
        block: 'block',
        mods: { mod: ['val-1', 'val-2'] }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: 'val-1' } }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: 'val-2' } }, tech: null }
    ]);
});
