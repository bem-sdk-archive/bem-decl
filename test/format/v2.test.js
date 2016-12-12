'use strict';

const test = require('ava');

const format = require('../../lib/format');

test('must return empty decl', t => {
    t.deepEqual(format([], {format: 'v2'}), []);
});

test('must split elems of one block', t => {
    const input = [
        {entity: {block: 'block1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem2'}, tech: null}
    ];
    const output = [
        {block: 'block1', elems: ['elem1', 'elem2']}
    ];

    t.deepEqual(
        format(input, {format: 'v2'}),
        output
    );
});

test('must split mods of one block', t => {
    const input = [
        {entity: {block: 'block1'}, tech: null},
        {entity: {block: 'block1', modName: 'mod1', modVal: 'val1'}, tech: null},
        {entity: {block: 'block1', modName: 'mod2', modVal: 'val2'}, tech: null}
    ];
    const output = [
        {
            block: 'block1',
            mods: {
                'mod1': 'val1',
                'mod2': 'val2'
            }
        }
    ];

    t.deepEqual(
        format(input, {format: 'v2'}),
        output
    );
});

test('must split vals of mods block', t => {
    const input = [
        {entity: {block: 'block1'}, tech: null},
        {entity: {block: 'block1', modName: 'mod1', modVal: true}, tech: null},
        {entity: {block: 'block1', modName: 'mod1', modVal: 'val1'}, tech: null}
    ];
    const output = [
        {
            block: 'block1',
            mods: {
                mod1: [true, 'val1']
            }
        }
    ];

    t.deepEqual(
        format(input, {format: 'v2'}),
        output
    );
});

test('must split elem mods of block', t => {
    const input = [
        {entity: {block: 'block1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem1', modName: 'mod2', modVal: 'val2'}, tech: null}
    ];
    const output = [
        {
            block: 'block1',
            elems: 'elem1',
            mods: {
                mod1: 'val1',
                mod2: 'val2'
            }
        }
    ];

    t.deepEqual(
        format(input, {format: 'v2'}),
        output
    );
});

test('must split vals of elem mods', t => {
    const input = [
        {entity: {block: 'block1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val1'}, tech: null},
        {entity: {block: 'block1', elem: 'elem1', modName: 'mod1', modVal: 'val2'}, tech: null}
    ];
    const output = [
        {
            name: 'block1',
            elem: 'elem1',
            mods: {
                mod1: 'val1',

            }
            elems: [
                {
                    name: 'elem1',
                    mods: [
                        {name: 'mod1', vals: [{name: 'val1'}, {name: 'val2'}]}
                    ]
                }
            ]
        }
    ];

    t.deepEqual(
        format(input, {format: 'v2'}),
        output
    );
});

test('should create full entity with mods', t => {
    t.deepEqual(
        format({entity: {block: 'block1', modName: 'mod1', modVal: 'val1'}}, {format: 'v2'}),
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
