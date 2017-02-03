'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('should support elem as object and mod', t => {
    const decl = {
        block: 'block',
        elem: {
            elem: 'elem',
            mods: {
                mod1: 'v1'
            }
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod1', val: 'v1' } }, tech: null }
    ]);
});
test('should support elem of elem as array mods', t => {
    const decl = {
        block: 'block',
        elem: [
            {
                elem: ['elem1', 'elem2'],
                mods: {
                    m1: 'v1'
                }
            }
        ]
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

test('should support array of mod values', t => {
    const decl = {
        block: 'block',
        elem: 'elem',
        mods: ['m1', 'm2']
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm2', val: true } }, tech: null }
    ]);
});
