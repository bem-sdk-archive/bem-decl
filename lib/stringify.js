'use strict';

const assert = require('assert');
const JSON5 = require('json5');

const format = require('./format');

/**
 * Create string representation of declaration
 *
 * @param {BemCell[]} decl source declaration
 * @param {Object} opts additional options
 * @param {String} opts.format format of declaration (v1, v2, enb)
 * @param {String} [opts.exportType] defines how to wrap result (cjs, json5, json, es6)
 * @returns {String} string representation
 */
module.exports = function (decl, opts) {
    opts = Object.assign({ exportType: 'cjs' }, opts);
    assert(opts.format, 'You must declare target format');

    Array.isArray(decl) || (decl = [decl]);

    const declFieldName = opts.format === 'v1' ? 'blocks' :
                            opts.format === 'enb' ? 'decl' : 'deps';
    const stringifyObj = opts.exportType === 'json5' ? JSON5.stringify : JSON.stringify;
    const formatedDecl = format(decl, { format: opts.format });

    let jsonStr = stringifyObj({
        format: opts.format,
        [declFieldName]: formatedDecl
    }, null, 4);

    if (opts.exportType === 'cjs') {
        jsonStr = `module.exports = ${jsonStr};\n`;
    } else if (opts.exportType === 'es6') {
        jsonStr = `export default ${jsonStr};\n`;
    }

    return `${jsonStr}`;
};
