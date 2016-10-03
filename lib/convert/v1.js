'use strict';

/**
 * Converts normalized declaration to v1 format
 *
 * @param  {Array|Object} decl Source declaration
 * @return {Array}
 */
module.exports = function (decl) {
    Array.isArray(decl) || (decl = [decl]);

    return !decl.length ? [] : decl.reduce((acc, dep) => {
        const entity = dep.entity;
        const item = { name: entity[entity.elem ? 'elem' : 'block'] };

        entity.modName && (item.mods = [{ name: entity.modName }]);
        entity.modVal && (item.mods[0].vals = [{ name: entity.modVal }]);

        acc.push(entity.elem ? { name: entity.block, elems: [item] } : item);
        return acc;
    }, []);
};
