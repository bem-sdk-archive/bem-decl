'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('should support shortcut for bool mod of elem', t => {
    const decl = { block: 'block', elem: 'elem', mod: 'mod' };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support bool mod of elem', t => {
    const decl = { block: 'block', elem: 'elem', mod: 'mod', val: true };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } }, tech: null }
    ]);
});

test('should support elem array mod', t => {
    const decl = {
        block: 'block',
        elem: ['elem1', 'elem2'],
        mod: 'm1',
        val: 'v1'
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem1' }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem2' }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should support elem of elem as array with mod', t => {
    const decl = {
        block: 'block',
        elem: {
            elem: ['elem1', 'elem2'],
        },
        mod: 'm1',
        val: 'v1'
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem1' }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem2' }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});
