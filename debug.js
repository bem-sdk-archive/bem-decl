const format = require('./lib/format');

const input = [
    {entity: {block: 'block1'}, tech: null},
    {entity: {block: 'block1', elem: 'elem1'}, tech: null},
    {entity: {block: 'block1', elem: 'elem1', modName: 'm1', modVal: 'v1'}, tech: null},

    // {entity: {block: 'block1', modName: 'm1', modVal: 'v1'}, tech: null},

    {entity: {block: 'block1', elem: 'elem1', modName: 'm2', modVal: 'v2'}, tech: null},
];

const tree = format(input, {format: 'v2'});

console.log(JSON.stringify(tree, null, 2));

return tree;


