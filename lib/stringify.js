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
 * @param {String} [opts.exportType=json5] defines how to wrap result (cjs, json5, json, es6|es2015)
 * @returns {String} string representation
 */
module.exports = function (decl, opts) {
    const defaults = { exportType: 'json5' };
    const options = Object.assign(defaults, opts);

    assert(options.format, 'You must declare target format');

    Array.isArray(decl) || (decl = [decl]);

    const declFieldName = options.format === 'v1' ? 'blocks' :
                            options.format === 'enb' ? 'decl' : 'deps';
    const stringifyObj = options.exportType === 'json5' ? JSON5.stringify : JSON.stringify;
    const formatedDecl = format(decl, { format: options.format });

    let jsonStr = stringifyObj({
        format: options.format,
        [declFieldName]: formatedDecl
    }, null, 4);

    if (options.exportType === 'cjs') {
        jsonStr = `module.exports = ${jsonStr};\n`;
    } else if (options.exportType === 'es6' || options.exportType === 'es2015') {
        jsonStr = `export default ${jsonStr};\n`;
    }

    return jsonStr;
};
