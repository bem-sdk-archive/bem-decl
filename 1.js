const no = require('./lib/normalize');
console.log(JSON.stringify(
    {
        block: 'block',
        elems: [
            { elem: 'elem', mods: { m1:'v1' } },
            { elem: 'elem2' },
            { elem: 'elem', mods: { m2:'v2' } }
        ]
    }, null, 4
));
console.log('===========');
console.log(no([
    {
        block: 'block',
        elems: [
            { elem: 'elem', mods: { m1:'v1' } },
            { elem: 'elem2' },
            { elem: 'elem', mods: { m2:'v2' } }
        ]
    }
], { format: 'v2' }));
