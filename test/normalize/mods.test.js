'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v1');

test('should support objects', t => {
    const decl = { name: 'block', mods: [{ name: 'mod', vals: [{ name: 'val' }] }] };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});

test('should support several items', t => {
    const decl = { name: 'block', mods: [
        { name: 'mod-1', vals: [{ name: 'val' }] },
        { name: 'mod-2', vals: [{ name: 'val' }] }
    ] };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod-1', val: 'val' } }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod-2', val: 'val' } }, tech: null }
    ]);
});

test('should support mod shortcut', t => {
    const decl = { name: 'block', mods: [{ name: 'mod' }] };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});
