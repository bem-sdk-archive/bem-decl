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
        entity.modVal && (item.mods[0].vals = [entity.modVal]);

        const result = entity.elem ? { name: entity.block, elems: [item] } : item;

        if (result.elems && entity.elem) {
            // If exists block with existing elems property
            const curBlock = acc.find(
                curEntity => curEntity.name === entity.block
            );
            if (curBlock) {
                if (curBlock.elems) {
                    // check if elem exists
                    const curElem = curBlock.elems.find(elem => elem.name === entity.elem);
                    curElem || curBlock.elems.push(result.elems[0]);
                } else {
                    curBlock.elems = result.elems;
                }
            } else {
                acc.push(result);
            }

            // If such element already exists and we have mod
            const modsAddition = acc.find(curEntity => {
                const curElem = curEntity.elems ?
                    curEntity.elems.find(elem => elem.name === entity.elem) : false;
                return curEntity.name === entity.block && curElem;
            });
            if (entity.modName) {
                const curElem = modsAddition.elems.find(elem => elem.name === entity.elem);
                if (curElem.mods) {
                    // have an array of mods in elem
                    // check if such mod already exists
                    const curMod = curElem.mods.find(
                        mod => mod.name === entity.modName
                    );
                    if (curMod) {
                        // check if val already exists
                        const curVal = curMod.vals.find(val =>
                            val === entity.modVal
                        );

                        curVal || curMod.vals.push(result.elems[0].mods[0].vals[0]);
                    } else {
                        // add new mod
                        curElem.mods.push(result.elems[0].mods[0]);
                    }
                }
            }
        } else if (entity.modName) {
            const curBlock = acc.find(curEntity => curEntity.name === entity.block);
            // if block with mods prop exists search for such mod
            if (curBlock) {
                if (curBlock.mods) {
                    const curMod = curBlock.mods.find(mod => mod.name === entity.modName);
                    if (curMod) {
                        // if such mod exists push new val
                        curMod.vals.push(result.mods[0].vals[0]);
                    } else {
                        // if no such mod push new mod
                        curBlock.mods.push(result.mods[0]);
                    }
                } else {
                    curBlock.mods = result.mods;
                }
            } else {
                acc.push(result);
            }
        } else {
            acc.push(result);
        }
        return acc;
    }, []);
};
