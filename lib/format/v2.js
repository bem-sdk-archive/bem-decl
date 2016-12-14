'use strict';

const BemCell = require('@bem/cell');
const BemEntityName = require('@bem/entity-name');

function belongsTo(child, entity) {
    return entity && child.id.startsWith(entity.id) &&
        child.block === entity.block &&
        (!entity.elem || child.elem === entity.elem) &&
        (!entity.mod || !entity.mod.name || child.mod.name === entity.mod.name) &&
        (!entity.mod || !entity.mod.val || entity.mod.val === true || child.mod.val === entity.mod.val);
}

function isEqual(originalCell, newCell) {
    if (originalCell.tech !== newCell.tech) {
        return false;
    }

    if (!originalCell.entity.isEqual(newCell.entity)) {
        return false;
    }

    return true;
}

function getItem(entity, tech) {
    const item = {block: entity.block};

    item.includeBlock = Object.keys(entity).length === 1;

    tech && (item.tech = tech);
    entity.elem && (item.elems = [entity.elem]);
    entity.modName && (item.mods = {[entity.modName]: entity.modVal});

    return item;
}

function getState(entity, tech) {
    return {
        tech,
        block: entity.block,
        elem: entity.elem,
        mod: entity.modName,
        val: entity.modVal
    }
}

function beauty(item = {}, context) {
    const declDep = {block: item.block};

    // if only block name return block name
    if (Object.keys(item).length === 1) {
        return item.block;
    }

    // if this is block deps remove it self
    if (item.block === context) {
        delete declDep.block;
    }

    if (item.elems) {
        const elemKey = item.includeBlock ? 'elems' : 'elem';
        if (item.elems.length === 1) {
            declDep[elemKey] = item.elems[0];
        } else {
            declDep[elemKey] = item.elems;
        }
    }

    if (item.mods) {
        if (Object.keys(item.mods).length === 1 && !item.includeBlock) {
            const modName = Object.keys(item.mods)[0];
            declDep.mod = modName;
            declDep.val = item.mods[modName];
        } else {
            declDep.mods = item.mods;
        }
    }

    if (item.tech) {
        declDep.tech = item.tech;
    }


    return declDep;
}


function splitByScopes(cells) {
    const acc = [];

    while (cells.length) {

        const cell = cells.shift();
        const group = traverseCell(cell, cells);

        // acc.push(group.map(item => item.id || item.map(item2 => item2.id)));
        acc.push(group);
    }

    return acc;
}

function traverseCell(cell, list) {
    let acc = [cell];

    while (list.length) {
        const nextCell = list[0];

        if (cell.tech === nextCell.tech) {

            if (isEqual(cell, nextCell)) {
                acc.push(list.shift());
                continue;
            }

            if (belongsTo(nextCell.entity, cell.entity)) {
                // acc = [...acc, ...traverseCell(list.shift(), list)];

                const traversed = traverseCell(list.shift(), list);

                console.log('>>>>', cell.entity.id);
                console.log('>>>>', JSON.stringify(traversed.map(item=>item.id),null, 2));
                console.log('>>>>', nextCell.entity.id);

                acc.push(traversed);
                continue;
            }
        }

        break;
    }

    return acc;
}

function traverseDecl(decl = []) {
    if (!decl.length) {
        return [];
    }

    const cells = decl.map(dep => new BemCell({entity: new BemEntityName(dep.entity), tech: dep.tech}));
    const scopes = splitByScopes(cells);

    return scopes;
}


/**
 * Formats normalized declaration to v2
 *
 * @param  {Array} decl Source declaration
 * @return {Array}
 */
module.exports = function (decl = []) {
    return traverseDecl(decl);
};
