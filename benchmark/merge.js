'use strict';

const merge = require('../lib/index').merge;
const decls = {
    blocks: [
        [{ block: 'block-1' }],
        [{ block: 'block-2' }]
    ],
    blockMods: [
        [{ block: 'block', mod: { name: 'bool-mod', val: true } }],
        [{ block: 'block', mod: { name: 'mod', val: 'val-1' } }],
        [{ block: 'block', mod: { name: 'mod', val: 'val-2' } }]
    ],
    elems: [
        [{ block: 'block', elem: 'elem-1' }],
        [{ block: 'block', elem: 'elem-2' }]
    ],
    elemMods: [
        [{ block: 'block', elem: 'elem' , mod: { name: 'bool-mod', val: true } }],
        [{ block: 'block', elem: 'elem' , mod: { name: 'mod', val: 'val-1' } }],
        [{ block: 'block', elem: 'elem' , mod: { name: 'mod', val: 'val-2' } }]
    ]
};

decls.full = [].concat(decls.blocks, decls.blockMods, decls.elems, decls.elemMods);

suite('merge', () => {
    set('interations', 200000);

    bench('blocks', () => {
        merge.apply(null, decls.blocks);
    });

    bench('block mods', () => {
        merge.apply(null, decls.blockMods);
    });

    bench('elems', () => {
        merge.apply(null, decls.elems);
    });

    bench('elem mods', () => {
        merge.apply(null, decls.elemMods);
    });

    bench('full', () => {
        merge.apply(null, decls.full);
    });
});
