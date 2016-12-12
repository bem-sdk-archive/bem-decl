'use strict';

const assert = require('assert');

const formatter = require('./format');

/**
 * Create string representation of declaration
 *
 * @param  {Array|Object} decl source declaration
 * @param  {Object} opts  additional options
 * @param  {String} opts.format format format
 * @return {String}       string representation
 */
module.exports = function (decl, opts) {
    opts || (opts = {});
    assert(opts.format, 'You must declare target format');

    const format = opts.format;

    Array.isArray(decl) || (decl = [decl]);

    const formattedDecl = formatter(decl, { format });
    const jsonStr = JSON.stringify(formattedDecl, null, 4);

    let exportsStr = '';

    if (format === 'v1') {
        exportsStr = 'exports.blocks';
    } else if (format === 'enb') {
        exportsStr = 'exports.deps';
    } else {
        exportsStr = 'module.exports';
    }

    return `${exportsStr} = ${jsonStr};\n`;
};
