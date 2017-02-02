const test = require('ava');
const BemCell = require('@bem/cell');
const BemEntityName = require('@bem/entity-name');
const JSON5 = require('json5');

const stringify = require('../../lib/stringify');

const obj = {
    format: 'enb',
    decl: [{ block: 'block', elem: 'elem', mod: 'mod', val: 'val' }]
};
const cell = new BemCell({
    entity: new BemEntityName({ block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' }),
    tech: null
});

test('should throws error if no format given', t => {
    t.throws(() => stringify(cell),
        'You must declare target format'
    );
});

test('should stringify enb declaration with commonJS', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb', exportType: 'cjs' }),
        `module.exports = ${JSON.stringify(obj, null, 4)};\n`
    );
});

test('should stringify enb declaration with es6', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb', exportType: 'es6' }),
        `export default ${JSON.stringify(obj, null, 4)};\n`
    );
});

test('should stringify enb declaration with es2105', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb', exportType: 'es2015' }),
        `export default ${JSON.stringify(obj, null, 4)};\n`
    );
});

test('should stringify enb declaration with JSON', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb', exportType: 'json' }),
        JSON.stringify(obj, null, 4)
    );
});

test('should stringify enb declaration with JSON5', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb', exportType: 'json5' }),
        JSON5.stringify(obj, null, 4)
    );
});

test('should stringify enb declaration with JSON5 if no exportType given', t => {
    t.deepEqual(
        stringify(cell, { format: 'enb' }),
        JSON5.stringify(obj, null, 4)
    );
});
