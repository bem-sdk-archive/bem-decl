const test = require('ava');

const stringify = require('../../lib/stringify');

test('should throws error if no format given', t => {
    t.throws(() => stringify({ entity: { block: 'block' }, tech: null }), 'You must declare target format');
});

test('should stringify v1 declaration', t => {
    const obj = [{
        name: 'block',
        elems: [{
            name: 'elem',
            mods: [{
                name: 'mod',
                vals: [{
                    name: 'val'
                }]
            }]
        }]
    }];
    t.deepEqual(
        stringify(
            { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' }, tech: null },
            { format: 'v1' }
        ),
        'exports.blocks = ' + JSON.stringify(obj, null, 4) + ';\n'
    );
});
