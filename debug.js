const aet = require('./lib/format/aet');
const JSON5 = require('json5');

const pretty = obj => JSON5.stringify(obj, null, 2);

const input = [
    { entity: { block: 'block1' }, tech: null },
    { entity: { block: 'block2' }, tech: null },
    { entity: { block: 'block1', elem: 'elem1' }, tech: null },
    { entity: { block: 'block1', elem: 'elem1', modName: 'm1', modVal: 'v1' }, tech: null },

    { entity: { block: 'block1', elem: 'elem1', modName: 'm1', modVal: 'v2' }, tech: null },

    { entity: { block: 'block1', elem: 'elem1', modName: 'm2', modVal: 'v2' }, tech: null },
];

const tree = aet(input);
console.log(pretty(input));
console.log('===========================');
console.log(pretty(tree));
