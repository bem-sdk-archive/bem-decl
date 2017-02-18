'use strict';

const assert = require('assert');
const JSON5 = require('json5');

const format = require('./format');

/**
 * Create string representation of declaration
 *
 * @param {BemCell[]} decl source declaration
 * @param {Object} opts - additional options
 * @param {String} opts.format - format of declaration (v1, v2, enb)
 * @param {String} [opts.exportType=json5] - defines how to wrap result (commonjs, json5, json, es6|es2015)
 * @param {String|Number} [opts.space] - number of space characters or string to use as a white space
 * @returns {String}
 */
module.exports = function (decl, opts) {
    const defaults = { exportType: 'json5', space: 4 };
    const options = Object.assign(defaults, opts);

    assert(options.format, 'You must declare target format');

    Array.isArray(decl) || (decl = [decl]);

    const space = options.space;
    const declFieldHash = {
        v1: 'blocks',
        enb: 'decl',
        v2: 'deps'
    };
    const declFieldName = declFieldHash[options.format];
    const formatedDecl = format(decl, { format: options.format });
    const stringifiedObj = {
        format: options.format
    };
    stringifiedObj[declFieldName] = formatedDecl;

    let exportedDecl;

    switch (options.exportType) {
        case 'json5':
            exportedDecl = JSON5.stringify(stringifiedObj, null, space);
        break;
        case 'json':
            exportedDecl = JSON.stringify(stringifiedObj, null, space);
        break;
        case 'commonjs':
            exportedDecl = `module.exports = ${JSON.stringify(stringifiedObj, null, space)};\n`;
        break;
        case 'es6': case 'es2015':
            exportedDecl = `export default ${JSON.stringify(stringifiedObj, null, space)};\n`;
        break;
    }

    return exportedDecl;
};
