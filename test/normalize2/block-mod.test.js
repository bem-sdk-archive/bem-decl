'use strict';

const test = require('ava');
const normalize = require('../../lib/normalize2');

test('should support mod', t => {
    const decl = {
        block: 'block',
        mod: 'm1',
        val: 'v1'
    }

    t.deepEqual(normalize(decl), [
        { entity: { block: 'block', modName: 'm1', modVal: true }, tech: undefined },
        { entity: { block: 'block', modName: 'm1', modVal: 'v1' }, tech: undefined }
    ]);
});

test('should support mod with tech', t => {
    const decl = {
        block: 'block',
        mod: 'm1',
        val: 'v1',
        tech: 'js'
    }

    t.deepEqual(normalize(decl), [
        { entity: { block: 'block', modName: 'm1', modVal: true }, tech: 'js' },
        { entity: { block: 'block', modName: 'm1', modVal: 'v1' }, tech: 'js' }
    ]);
});