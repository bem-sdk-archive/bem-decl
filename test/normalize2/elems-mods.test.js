'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('should support elem as object and mod', t => {
    const decl = {
        block: 'block',
        elems: {
            elem: 'elem',
            mods: {
                mod1: 'v1'
            }
        }
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod1', val: 'v1' } }, tech: null }
    ]);
});

test('should support elem of elem as array mods', t => {
    const decl = {
        block: 'block',
        elems: [
            {
                elem: ['elem1', 'elem2'],
                mods: {
                    m1: 'v1'
                }
            }
        ]
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', elem: 'elem1' }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem1', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem2' }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem2', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should support mods in elems and block', t => {
    const decl = {
        block: 'block',
        mods: {
            m1: 'v1'
        },
        elems: [
            {
                elem: 'elem',
                mods: {
                    m2: 'v2'
                }
            }
        ]
    };

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block' }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null },
        { entity: { block: 'block', elem: 'elem' }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm2', val: true } }, tech: null },
        { entity: { block: 'block', elem: 'elem', mod: { name: 'm2', val: 'v2' } }, tech: null }
    ]);
});

test('should support block mods with `elems` field without block', t => {
    const decl = [
        {
            elems: ['close'],
            mods: { theme: 'protect' }
        }
    ];

    t.deepEqual(normalize(decl, { entity: { block: 'sb' } }).map(simplifyCell), [
        { entity: { block: 'sb' }, tech: null },
        { entity: { block: 'sb', mod: { name: 'theme', val: true } }, tech: null },
        { entity: { block: 'sb', mod: { name: 'theme', val: 'protect' } }, tech: null },
        { entity: { block: 'sb', elem: 'close' }, tech: null }
    ]);
})
