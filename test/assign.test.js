'use strict';

const test = require('ava');
const simplifyCell = require('./util').simplifyCell;
const assign = require('..').assign;

test('entity block should dominate scope’s one', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' } },
        { entity: { block: 'sb' } })),
        { entity: { block: 'b' }, tech: null });
});

test('entity block should correcly assign with block-elem from scope', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'b' }, tech: null });
});

test('entity block should correcly assign with block-mod from scope', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' } },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'b' }, tech: null });
});

test('entity elem should dominate scope’s one', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', elem: 'e' } },
        { entity: { block: 'sb', elem: 'sb' } })),
        { entity: { block: 'b', elem: 'e' }, tech: null });
});

test('entity mod.name should dominate scope’s one for block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', mod: { name: 'm' } } },
        { entity: { block: 'sb', mod: { name: 'sm' } } })),
        { entity: { block: 'b', mod: { name: 'm', val: true } }, tech: null });
});

test('entity mod.val should dominate scope’s one for block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', mod: { name: 'm', val: 'v' } } },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'b', mod: { name: 'm', val: 'v' } }, tech: null });
});

test('entity elem should NOT be filled with scope elem for block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', mod: { name: 'm', val: 'v' } } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'b', mod: { name: 'm', val: 'v' } }, tech: null });
});

test('entity mod.name should dominate scope’s one for block and elem', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', elem: 'e', mod: { name: 'm' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm' } } })),
        { entity: { block: 'b', elem: 'e', mod: { name: 'm', val: true } }, tech: null });
});

test('entity mod.val should dominate scope’s one for block and elem', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', elem: 'e', mod: { name: 'm', val: 'v' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'b', elem: 'e', mod: { name: 'm', val: 'v' } }, tech: null });
});

test('entity with block should not be filled with scope\'s mod.name/modVal', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'b' }, tech: null });
});

test('entity with block and elem should not be filled with scope\'s mod.name/modVal', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b', elem: 'e' } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'b', elem: 'e' }, tech: null });
});

test('entity with elem should be filled with block only', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { elem: 'e' } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'e' }, tech: null });
});

test('entity elem should use scope’s block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { elem: 'e' } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'sb', elem: 'e' }, tech: null });
});

test('entity mod.name should use scope’s block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { name: 'm' } } },
        { entity: { block: 'sb', mod: { name: 'sm' } } })),
        { entity: { block: 'sb', mod: { name: 'm', val: true } }, tech: null });
});

test('entity mod.name should use scope’s elem', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { name: 'm' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm' } } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'm', val: true } }, tech: null });
});

test('entity mod.val should use scope’s block and mod.name', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { val: 'v' } } },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: 'v' } }, tech: null });
});

test('entity mod.val should use scope’s block, elem and mod.name', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { val: 'v' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'v' } }, tech: null });
});

test('should assign entity for mod and val for block', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { name: 'm', val: 'v' } } },
        { entity: { block: 'sb' } })),
        { entity: { block: 'sb', mod: { name: 'm', val: 'v' } }, tech: null });
});

test('should assign entity for mod and val for block and elem', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { name: 'm', val: 'v' } } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'm', val: 'v' } }, tech: null });
});

test('should cut mod.name and mod.val from scope for elem', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { elem: 'e' } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'e' }, tech: null });
});

test('should cut mod.val from scope for mod.name', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { name: 'm' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'm', val: true } }, tech: null });
});

test('should use only block from scope for elem and mod.name', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { elem: 'e', mod: { name: 'm' } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'e', mod: { name: 'm', val: true } }, tech: null });
});

// Edge cases

test('should allow 0 as mod value', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { val: 0 } } },
        { entity: { block: 'sb', mod: { name: 'sm' } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: 0 } }, tech: null });
});

test('should use block for nothing', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { } },
        { entity: { block: 'sb' } })),
        { entity: { block: 'sb' }, tech: null });
});

test('should throw on empty without scope', t => {
    t.throws(() => {
        simplifyCell(assign(
            { entity: { } },
            { entity: { } }));
    });
});

test('should use scope with block if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb' } })),
        { entity: { block: 'sb' }, tech: null });
});

test('should use scope with block and boolean modifier if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb', mod: { name: 'sm', val: true } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: true } }, tech: null });
});

test('should use scope with block and modifier if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } }, tech: null });
});

test('should use scope with elem if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'sb', elem: 'se' }, tech: null });
});

test('should use scope with elem and boolean modifier if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: true } } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: true } }, tech: null });
});

test('should use scope with elem and modifier if entity has empty fields', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: undefined, elem: undefined, mod: { name: undefined, val: undefined } } },
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', elem: 'se', mod: { name: 'sm', val: 'sv' } }, tech: null });
});

test('should use mod.val from scope if nothing given', t => {
    t.deepEqual(simplifyCell(assign(
        { },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } }, tech: null });
});

test('should not use mod.val from scope if only block given', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { val: 'sv' } } },
        { entity: { block: 'sb' } })),
        { entity: { block: 'sb' }, tech: null });
});

test('should not use mod.val from scope if only elem given', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { mod: { val: 'sv' } } },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'sb', elem: 'se' }, tech: null });
});

// Tech related specs

test('assign should support tech grabbing from scope', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' } },
        { entity: { block: 'sb' }, tech: 'js' })),
        { entity: { block: 'b' }, tech: 'js' });
});

test('entity tech should dominate the scope’s one', t => {
    t.deepEqual(simplifyCell(assign(
        { entity: { block: 'b' }, tech: 'bemhtml' },
        { entity: { block: 'sb' }, tech: 'js' })),
        { entity: { block: 'b' }, tech: 'bemhtml' });
});

test('should merge with scope if only tech given', t => {
    t.deepEqual(simplifyCell(assign(
        { tech: 'bemhtml' },
        { entity: { block: 'sb', elem: 'se' } })),
        { entity: { block: 'sb', elem: 'se' }, tech: 'bemhtml' });
});

test('should use mod.val with scope if only tech given', t => {
    t.deepEqual(simplifyCell(assign(
        { tech: 'bemhtml' },
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } } })),
        { entity: { block: 'sb', mod: { name: 'sm', val: 'sv' } }, tech: 'bemhtml' });
});

test('should use scope vals if null given', t => {
    t.deepEqual(
        simplifyCell(assign(
            { entity: { block: null, mod: { name: 'mod', val: 'val' } } },
            { entity: { block: 'block', elem: 'elem' }, tech: 'bemhtml' }
        )),
        { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } }, tech: 'bemhtml' }
    )
});

test('should use scope elem if block null', t => {
    t.deepEqual(
        simplifyCell(assign(
            { entity: { block: null }, tech: 'js' },
            { entity: { block: 'block', elem: 'elem' } }
        )),
        { entity: { block: 'block', elem: 'elem' }, tech: 'js' }
    );
});
