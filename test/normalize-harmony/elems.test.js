'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/harmony');

test('should support strings', t => {
    const decl = {
        block: 'block',
        elems: ['elem-1', 'elem-2']
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem-1' }, tech: null },
        { entity: { block: 'block',  elem: 'elem-2' }, tech: null }
    ]);
});

test('should support objects', t => {
    const decl = {
        block: 'block',
        elems: [{ elem: 'elem' }]
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null }
    ]);
});

test('should support mods for elem objects', t => {
    const decl = {
        block: 'block',
        elems: [{ elem: 'elem', mods: { mod: 'val' } }]
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } }, tech: null }
    ]);
});
