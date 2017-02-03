'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('should support both mod and mods', t => {
    const decl = {
        block: 'block',
        mod: 'mod',
        mods: { m1: 'v1' }
    }

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'mod', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should support both elem and elems', t => {
    const decl = {
        block: 'block',
        elem: 'elem1',
        elems: {
            elem: 'elem2'
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem1' }, tech: null },
        { entity: { block: 'block', elem: 'elem2' }, tech: null }
    ]);
});

test('should support both mod, mods, elem and elems :\'(', t => {
    const decl = {
        block: 'block',
        elem: 'elem1',
        elems: {
            elem: 'elem2'
        },
        mod: 'mod1',
        val: 'v1',
        mods: {
            mod2: 'v2'
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem1' }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'mod1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'mod1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'mod2', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'mod2', val: 'v2' } }, tech: null },
        { entity: { block: 'block', elem: 'elem2' }, tech: null }
    ]);
});
