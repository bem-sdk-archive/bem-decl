'use strict';

const test = require('ava');
const BemCell = require('@bem/cell');
const BemEntityName = require('@bem/entity-name');
const createCell = (cell) => new BemCell({
    entity: new BemEntityName(cell.entity),
    tech: cell.tech
});

const merge = require('../../lib/merge');

test('should merge block with its elem', t => {
    const block = [{ entity: { block: 'block' } }].map(createCell);
    const elem = [{ entity: { block: 'block', elem: 'elem' } }].map(createCell);

    t.deepEqual(merge(block, elem), [].concat(block, elem));
});

test('should merge block with its mod', t => {
    const block = [{ entity: { block: 'block' } }].map(createCell);
    const mod = [{ entity: { block: 'block', mod: { name: 'mod', val: 'val' } } }].map(createCell);

    t.deepEqual(merge(block, mod), [].concat(block, mod));
});

test('should merge block with its bool mod', t => {
    const block = [{ entity: { block: 'block' } }].map(createCell);
    const mod = [{ entity: { block: 'block', mod: { 'mod', val: true } } }].map(createCell);

    t.deepEqual(merge(block, mod), [].concat(block, mod));
});

test('should merge elems of block', t => {
    const elem1 = [{ entity: { block: 'block', elem: 'elem-1' } }].map(createCell);
    const elem2 = [{ entity: { block: 'block', elem: 'elem-2' } }].map(createCell);

    t.deepEqual(merge(elem1, elem2), [].concat(elem1, elem2));
});

test('should merge mods of block', t => {
    const mod1 = [{ entity: { block: 'block', mod: { name: 'mod-1', val: true } } }].map(createCell);
    const mod2 = [{ entity: { block: 'block', mod: { name:  'mod-2', val: true } } }].map(createCell);

    t.deepEqual(merge(mod1, mod2), [].concat(mod1, mod2));
});

test('should merge mod vals of block mod', t => {
    const val1 = [{ entity: { block: 'block', mod: { name: 'mod', val: 'val-1' } } }].map(createCell);
    const val2 = [{ entity: { block: 'block', mod: { name: 'mod', val: 'val-2' } } }].map(createCell);

    t.deepEqual(merge(val1, val2), [].concat(val1, val2));
});

test('should merge elem with its mod', t => {
    const elem = [{ entity: { block: 'block', elem: 'elem' } }].map(createCell);
    const mod = [{ entity: { block: 'block', elem: 'elem' , mod: { name: 'mod', val: 'val' } } }].map(createCell);

    t.deepEqual(merge(elem, mod), [].concat(elem, mod));
});

test('should merge elem with its bool mod', t => {
    const elem = [{ entity: { block: 'block', elem: 'elem' } }].map(createCell);
    const mod = [{ entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: true } } }].map(createCell);

    t.deepEqual(merge(elem, mod), [].concat(elem, mod));
});

test('should merge mods of elem', t => {
    const mod1 = [{ entity: { block: 'block', elem: 'elem', mod: { name: 'mod-1', val: true } } }].map(createCell);
    const mod2 = [{ entity: { block: 'block', elem: 'elem', mod: { name: 'mod-2', val: true } } }].map(createCell);

    t.deepEqual(merge(mod1, mod2), [].concat(mod1, mod2));
});

test('should merge block in different techs', t => {
    const blockJs = [{ entity: { block: 'block' }, tech: 'js' }].map(createCell);
    const blockCss = [{ entity: { block: 'block' }, tech: 'css' }].map(createCell);

    t.deepEqual(merge(blockJs, blockCss), [].concat(blockJs, blockCss));
});
