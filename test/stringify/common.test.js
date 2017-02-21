const test = require('ava');

const stringify = require('../../lib/stringify');

test('should throws error if no format given', t => {
    t.throws(() => stringify({ entity: { block: 'block' }, tech: null }), 'You must declare target format');
});
