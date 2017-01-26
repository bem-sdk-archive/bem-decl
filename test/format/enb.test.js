'use strict';

const test = require('ava');

const formatter = require('../../lib/format');

test('should throw exception if no format given', t => {
    t.throws(() => formatter({ entity: { block: 'block' }, tech: null }), 'You must declare target format');
});

test('should format to enb format', t => {
    t.deepEqual(formatter({ entity: { block: 'block' }, tech: null }, { format: 'enb' }), [{ block: 'block' }]);
});

test('should coformatnvert with elem', t => {
    t.deepEqual(
        formatter([
            { entity: { block: 'block' }, tech: null },
            { entity: { block: 'block', elem: 'elem' }, tech: null }
        ], { format: 'enb' }),
        [
            { block: 'block' },
            { block: 'block', elem: 'elem' }
        ]
    );
});

test('should format with mod', t => {
    t.deepEqual(
        formatter([
            { entity: { block: 'block', modName: 'mod', modVal: 'val' }, tech: null }
        ], { format: 'enb' }),
        [{ block: 'block', mod: 'mod', val: 'val' }]
    )
});
