'use strict';

const test = require('ava');
const simplifyCell = require('../util').simplifyCell;
const normalize = require('../../lib/normalize/v2');

test('should support mod', t => {
    const decl = {
        block: 'block',
        mod: 'm1',
        val: 'v1'
    }

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: null },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: null }
    ]);
});

test('should support mod with tech', t => {
    const decl = {
        block: 'block',
        mod: 'm1',
        val: 'v1',
        tech: 'js'
    }

    t.deepEqual(normalize(decl).map(simplifyCell), [
        { entity: { block: 'block', mod: { name: 'm1', val: true } }, tech: 'js' },
        { entity: { block: 'block', mod: { name: 'm1', val: 'v1' } }, tech: 'js' }
    ]);
});
