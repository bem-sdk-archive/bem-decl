'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/harmony');

test('should support elem', t => {
    const decl = { block: 'block', elem: 'elem' };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null }
    ]);
});

test('should support shortcut for bool mod of elem', t => {
    const decl = { block: 'block', elem: 'elem', modName: 'mod' };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support bool mod of elem', t => {
    const decl = { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support elem mod', t => {
    const decl = { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});

test('should support elem mods as object', t => {
    const decl = {
        block: 'block',
        elem: 'elem',
        mods: { mod: 'val' }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});

test('should support bool mods of elem as array', t => {
    const decl = {
        block: 'block',
        elem: 'elem',
        mods: ['mod-1', 'mod-2']
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod-1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod-2', val: true } }, tech: null }
    ]);
});

test('should support mod values of elem as array', t => {
    const decl = {
        block: 'block',
        elem: 'elem',
        mods: { mod: ['val-1', 'val-2'] }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val-1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val-2' } }, tech: null }
    ]);
});
