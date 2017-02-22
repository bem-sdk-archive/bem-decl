'use strict';

const assert = require('assert');
const JSON5 = require('json5');

const format = require('./format');

const DEFAULTS = { exportType: 'json5', space: 4 };

const generators = {
    json5: (obj, space) => JSON5.stringify(obj, null, space),
    json: (obj, space) => JSON.stringify(obj, null, space),
    commonjs: (obj, space) => `module.exports = ${JSON.stringify(obj, null, space)};\n`,
    es2015: (obj, space) => `export default ${JSON.stringify(obj, null, space)};\n`
};
// Aliases
generators.es6 = generators.es2015;

/**
 * Create string representation of declaration
 *
 * @param {BemCell[]} decl - source declaration
 * @param {Object} opts - additional options
 * @param {String} opts.format - format of declaration (v1, v2, enb)
 * @param {String} [opts.exportType=json5] - defines how to wrap result (commonjs, json5, json, es6|es2015)
 * @param {String|Number} [opts.space] - number of space characters or string to use as a white space
 * @returns {String}
 */
module.exports = function (decl, opts) {
    const options = Object.assign({}, DEFAULTS, opts);

    assert(options.format, 'You must declare target format');
    assert(generators.hasOwnProperty(options.exportType), 'Specified format isn\'t supported');

    Array.isArray(decl) || (decl = [decl]);

    const fieldByFormat = {
        v1: 'blocks',
        enb: 'decl',
        v2: 'deps'
    };
    const formatedDecl = format(decl, { format: options.format });
    const stringifiedObj = {
        format: options.format,
        [fieldByFormat[options.format]]: formatedDecl
    };

    return generators[options.exportType](stringifiedObj, options.space);
};
