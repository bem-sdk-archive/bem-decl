'use strict';

const test = require('ava');

const format = require('../../lib/format');

test('must return empty decl', t => {
    t.deepEqual(format([], { format: 'v1' }), []);
});

test('must group elems of one block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem1' }, tech: null },
        { entity: { block: 'block1', elem: 'elem2' }, tech: null }
    ];
    const output = [
        { name: 'block1', elems: [{ name: 'elem1' }, { name: 'elem2' }] }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
    );
});

test('must group mods of one block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: 'val1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod2', modVal: 'val2' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            mods: [
                { name: 'mod1', vals: ['val1'] },
                { name: 'mod2', vals: ['val2'] }
            ]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
    );
});

test('must group vals of mods block', t => {
    const input = [
        { entity: { block: 'block1' }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: true }, tech: null },
        { entity: { block: 'block1', modName: 'mod1', modVal: 'val1' }, tech: null }
    ];
    const output = [
        {
            name: 'block1',
            mods: [
                { name: 'mod1', vals: [true, 'val1'] }
            ]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
    );
});

test('must group elem mods of block', t => {
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
                        { name: 'mod1', vals: ['val1'] }, { name: 'mod2', vals: ['val2'] }
                    ]
                }
            ]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
    );
});

test('must group vals of elem mods', t => {
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
                        { name: 'mod1', vals: ['val1', 'val2'] }
                    ]
                }
            ]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
    );
});

test('should create full entity with mods', t => {
    t.deepEqual(
        format({ entity: { block: 'block1', modName: 'mod1', modVal: 'val1' } }, { format: 'v1' }),
        [{
            name: 'block1',
            mods: [{
                name: 'mod1',
                vals: ['val1']
            }]
        }]
    );
});

test('should not group different blocks', t => {
    t.deepEqual(
        format([
            { entity: { block: 'block1' } },
            { entity: { block: 'block2' } },
            { entity: { block: 'block3' } }
        ], { format: 'v1' }),
        [
            {
                name: 'block1'
            },
            {
                name: 'block2'
            },
            {
                name: 'block3'
            }
        ]
    );
});

test('should not group different blocks with equal elems', t => {
    const input = [
        { entity: { block: 'block1', elem: 'elem' } },
        { entity: { block: 'block2', elem: 'elem' } }
    ];
    const output = [
        {
            name: 'block1',
            elems: [{
                name: 'elem'
            }]
        },
        {
            name: 'block2',
            elems: [{
                name: 'elem'
            }]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
     );
});

test('should not group equal vals of different mods', t => {
    const input = [
        { entity: { block: 'block1', elem: 'elem', modName: 'mod1', modVal: 'val1' } },
        { entity: { block: 'block1', elem: 'elem', modName: 'mod2', modVal: 'val1' } }
    ];
    const output = [
        {
            name: 'block1',
            elems: [{
                name: 'elem',
                mods: [{
                    name: 'mod1',
                    vals: ['val1']
                }, {
                    name: 'mod2',
                    vals: ['val1']
                }]
            }]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
     );
});

test('should not group equal mods of different elems', t => {
    const input = [
        { entity: { block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val1' } },
        { entity: { block: 'block1', elem: 'elem2', modName: 'mod1', modVal: 'val1' } }
    ];
    const output = [
        {
            name: 'block1',
            elems: [{
                name: 'elem1',
                mods: [{
                    name: 'mod1',
                    vals: ['val1']
                }]
            }, {
                name: 'elem2',
                mods: [{
                    name: 'mod1',
                    vals: ['val1']
                }]
            }]
        }
    ];

    t.deepEqual(
        format(input, { format: 'v1' }),
        output
     );
});
