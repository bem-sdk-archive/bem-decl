'use strict';

const normalizer = {
    v1: require('./v1'),
    v2: require('./v2'),
    harmony: require('./harmony'),
    enb: require('./v2')
};

module.exports = (decl, opts) => {
    opts || (opts = {});

    const format = opts.format || 'v2';

    return normalizer[format](decl);
};
