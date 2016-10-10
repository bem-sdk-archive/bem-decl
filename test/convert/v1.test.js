'use strict';

const test = require('ava');

const convert = require('../../lib/convert');

test('must return empty decl', t => {
    t.deepEqual(convert([], { format: 'v1' }), []);
});

test('must split elems of one block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem2' }, tech: null }
    ];
    const output = [
        { name: 'block1', elems: [{ name: 'elem1' }, { name: 'elem2' }] }
    ];

    t.deepEqual(
        convert(input, { format: 'v1' }),
        output
    );
});

test('must split mods of one block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: 'val1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod2', modVal: 'val2' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            mods: [
                { name: 'mod1', vals: [{ name: 'val1' }] },
                { name: 'mod2', vals: [{ name: 'val2' }] }
            ]
        }
    ];

    t.deepEqual(
        convert(input, { format: 'v1' }),
        output
    );
});

test('must split vals of mods block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: true }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: 'val1' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            mods: [
                { name: 'mod1', vals: [{ name: true }, { name: 'val1' }] }
            ]
        }
    ];

    t.deepEqual(
        convert(input, { format: 'v1' }),
        output
    );
});

test('must split elem mods of block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1', modName: 'mod2', modVal: 'val2' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            elems: [
                {
                    name: 'elem1',
                    mods: [
                        { name: 'mod1', vals: [{ name: 'val1' }] }, { name: 'mod2', vals: [{ name: 'val2' }] }
                    ]
                }
            ]
        }
    ];

    t.deepEqual(
        convert(input, { format: 'v1' }),
        output
    );
});

test('must split vals of elem mods', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val2' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            elems: [
                {
                    name: 'elem1',
                    mods: [
                        { name: 'mod1', vals: [{ name: 'val1' }, { name: 'val2' }] }
                    ]
                }
            ]
        }
    ];

    t.deepEqual(
        convert(input, { format: 'v1' }),
        output
    );
});

test('should create full entity with mods', t => {
    t.deepEqual(
        convert({ entity: { block: 'block1', modName: 'mod1', modVal: 'val1' } }, { format: 'v1' }),
        [{
            name: 'block1',
            mods: [{
                name: 'mod1',
                vals: [{
                    name: 'val1'
                }]
            }]
        }]
    );
});
