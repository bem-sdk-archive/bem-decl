'use strict';

const BemCell = require('@bem/cell');
const BemEntityName = require('@bem/entity-name');

function belongsTo(parent, entity) {
    return entity && parent.id.startsWith(entity.id) &&
        parent.block === entity.block &&
        (!entity.elem || parent.elem === entity.elem) &&
        (!entity.mod.name || parent.mod.name === entity.mod.name) &&
        (!entity.mod.val || entity.mod.val === true || parent.mod.val === entity.mod.val);
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

        acc.push(group.map(item => item.id));
    }

    return acc;
}

function traverseCell(cell, list) {
    let acc = [cell];

    while (list.length) {
        const nextCell = list[0];

        if (isEqual(cell, nextCell)) {
            acc.push(list.shift());
            continue;
        }

        if (belongsTo(cell, nextCell)) {
            acc = [...acc, ...traverseCell(nextCell, list)];
            continue;
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
